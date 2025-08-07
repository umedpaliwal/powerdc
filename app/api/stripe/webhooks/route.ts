import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceRoleClient } from '@/lib/supabase/server'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
}) : null

export async function POST(request: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 })
  }
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  const supabase = createServiceRoleClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string
          const customerId = session.customer as string
          const userId = session.metadata?.user_id

          if (userId && subscriptionId) {
            // Get subscription details
            const subscriptionData = await stripe.subscriptions.retrieve(subscriptionId)
            
            // Determine plan type based on price
            const priceId = subscriptionData.items.data[0]?.price.id
            const planType = 'professional' // default
            
            // Update user subscription in database
            const { error: upsertError } = await supabase.from('subscriptions').upsert({
              user_id: userId,
              stripe_subscription_id: subscriptionId,
              stripe_customer_id: customerId,
              status: subscriptionData.status,
              plan_type: planType,
              current_period_start: new Date((subscriptionData as any).current_period_start * 1000).toISOString(),
              current_period_end: new Date((subscriptionData as any).current_period_end * 1000).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            
            if (upsertError) {
              console.error('Failed to upsert subscription:', upsertError)
              throw upsertError
            }

            console.log(`Subscription created for user ${userId}:`, subscriptionId)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
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
          const { error: updateError } = await supabase
            .from('subscriptions')
            .update({
              status: subscription.status,
              current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
              current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
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

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}