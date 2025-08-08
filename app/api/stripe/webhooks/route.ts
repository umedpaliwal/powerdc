import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceRoleClient } from '@/lib/supabase/server'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
}) : null

export async function POST(request: NextRequest) {
  console.log('Webhook received at:', new Date().toISOString())
  console.log('Stripe configured:', !!stripe)
  console.log('Webhook secret exists:', !!process.env.STRIPE_WEBHOOK_SECRET)
  
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Missing configuration:', {
      stripe: !!stripe,
      webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET
    })
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 })
  }
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  console.log('Signature header present:', !!sig)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    console.log('Webhook signature verified successfully for event:', event.type)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    console.error('Error details:', err)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  const supabase = createServiceRoleClient()
  console.log('Supabase client created')

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Processing checkout.session.completed for session:', session.id)
        
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string
          const customerId = session.customer as string
          const userId = session.metadata?.user_id
          console.log('Subscription details:', { subscriptionId, customerId, userId })

          if (userId && subscriptionId) {
            // Get subscription details
            console.log('Retrieving subscription from Stripe:', subscriptionId)
            const subscriptionData = await stripe.subscriptions.retrieve(subscriptionId)
            console.log('Subscription retrieved, status:', subscriptionData.status)
            
            // Determine plan type based on price
            const priceId = subscriptionData.items.data[0]?.price.id
            const planType = 'professional' // default
            console.log('Plan details:', { priceId, planType })
            
            // Update user subscription in database
            console.log('Upserting subscription to database for user:', userId)
            
            // Get period dates from the first subscription item
            const subscriptionItem = subscriptionData.items.data[0]
            const periodStart = subscriptionItem?.current_period_start 
              ? new Date(subscriptionItem.current_period_start * 1000).toISOString()
              : new Date(subscriptionData.start_date * 1000).toISOString()
            const periodEnd = subscriptionItem?.current_period_end
              ? new Date(subscriptionItem.current_period_end * 1000).toISOString()
              : new Date(subscriptionData.billing_cycle_anchor * 1000 + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from anchor
            
            const { error: upsertError } = await supabase.from('subscriptions').upsert({
              user_id: userId,
              stripe_subscription_id: subscriptionId,
              stripe_customer_id: customerId,
              status: subscriptionData.status,
              plan_type: planType,
              current_period_start: periodStart,
              current_period_end: periodEnd,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            
            if (upsertError) {
              console.error('Failed to upsert subscription:', upsertError)
              console.error('Upsert error details:', JSON.stringify(upsertError, null, 2))
              throw upsertError
            }

            console.log(`Subscription successfully created for user ${userId}:`, subscriptionId)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const previousAttributes = (event.data as any).previous_attributes || {}
        
        // Find user by customer ID
        const { data: userSub, error: findError } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', subscription.customer)
          .single()

        if (findError) {
          console.error('Failed to find subscription:', findError)
        }

        if (userSub) {
          // Get period dates from the first subscription item
          const subscriptionItem = (subscription as any).items?.data?.[0]
          const periodStart = subscriptionItem?.current_period_start 
            ? new Date(subscriptionItem.current_period_start * 1000).toISOString()
            : new Date((subscription as any).start_date * 1000).toISOString()
          const periodEnd = subscriptionItem?.current_period_end
            ? new Date(subscriptionItem.current_period_end * 1000).toISOString()
            : new Date((subscription as any).billing_cycle_anchor * 1000 + 30 * 24 * 60 * 60 * 1000).toISOString()
          
          // Update database with ALL fields including cancellation fields
          const updateData: any = {
            status: subscription.status,
            current_period_start: periodStart,
            current_period_end: periodEnd,
            cancel_at_period_end: subscription.cancel_at_period_end || false,
            updated_at: new Date().toISOString(),
          }

          // Add cancellation fields if they exist
          if (subscription.canceled_at) {
            updateData.canceled_at = new Date(subscription.canceled_at * 1000).toISOString()
          }
          if (subscription.cancel_at) {
            updateData.cancel_at = new Date(subscription.cancel_at * 1000).toISOString()
          }
          if (subscription.cancellation_details) {
            updateData.cancellation_details = subscription.cancellation_details
          }

          // Log cancellation/reactivation events
          if (!previousAttributes.cancel_at_period_end && subscription.cancel_at_period_end) {
            console.log(`Subscription ${subscription.id} scheduled for cancellation via Stripe Portal`)
          } else if (previousAttributes.cancel_at_period_end && !subscription.cancel_at_period_end) {
            console.log(`Subscription ${subscription.id} reactivated via Stripe Portal`)
            // Clear cancellation fields on reactivation
            updateData.canceled_at = null
            updateData.cancel_at = null
            updateData.cancellation_details = null
          }
          
          const { error: updateError } = await supabase
            .from('subscriptions')
            .update(updateData)
            .eq('stripe_subscription_id', subscription.id)
          
          if (updateError) {
            console.error('Failed to update subscription:', updateError)
            throw updateError
          }

          console.log(`Subscription updated for user ${userSub.user_id}:`, subscription.id)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Update subscription status to canceled
        const { error: cancelError } = await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)
        
        if (cancelError) {
          console.error('Failed to cancel subscription:', cancelError)
          throw cancelError
        }

        console.log(`Subscription canceled:`, subscription.id)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any
        const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id
        
        if (subscriptionId) {
          // Update subscription status to active
          const { error: activeError } = await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId)
          
          if (activeError) {
            console.error('Failed to activate subscription:', activeError)
          }

          console.log(`Payment succeeded for subscription:`, subscriptionId)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any
        const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id
        
        if (subscriptionId) {
          // Update subscription status to past_due
          const { error: pastDueError } = await supabase
            .from('subscriptions')
            .update({
              status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId)
          
          if (pastDueError) {
            console.error('Failed to update subscription to past_due:', pastDueError)
          }

          console.log(`Payment failed for subscription:`, subscriptionId)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    console.log('Webhook processed successfully')
    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    console.error('Full error details:', JSON.stringify(error, null, 2))
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    )
  }
}