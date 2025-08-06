import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
}) : null

export async function POST(request: NextRequest) {
  if (!stripe) {
    console.error('Stripe not configured - missing STRIPE_SECRET_KEY')
    return NextResponse.json({ error: 'Stripe is not configured. Please contact support.' }, { status: 500 })
  }
  try {
    const supabase = createServerComponentClient({ cookies })
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.error('Authentication error:', authError)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { priceId, successUrl, cancelUrl } = await request.json()

    console.log('Checkout session request:', { priceId, userId: user.id, email: user.email })

    if (!priceId) {
      console.error('Missing priceId in request')
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    // Validate that the price exists in Stripe
    try {
      await stripe.prices.retrieve(priceId)
    } catch (priceError: any) {
      console.error('Price validation failed:', priceError)
      return NextResponse.json({ 
        error: 'Invalid price ID. Please contact support.',
        details: priceError.message 
      }, { status: 400 })
    }

    // Get or create Stripe customer
    let customerId: string | undefined

    // Check if user already has a Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (profile?.stripe_customer_id) {
      customerId = profile.stripe_customer_id
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          supabase_user_id: user.id,
        },
      })

      customerId = customer.id

      // Save customer ID to profile
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString(),
        })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/account?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
      metadata: {
        user_id: user.id,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
    })

    console.log('Checkout session created successfully:', { 
      sessionId: session.id, 
      customerId, 
      priceId,
      userId: user.id 
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout session creation failed:', {
      error: error.message,
      stack: error.stack,
      code: error.code,
      type: error.type,
      priceId,
      userId: user?.id
    })
    
    let errorMessage = 'Failed to create checkout session'
    if (error.code === 'resource_missing') {
      errorMessage = 'The selected plan is not available. Please contact support.'
    } else if (error.type === 'invalid_request_error') {
      errorMessage = `Invalid request: ${error.message}`
    }
    
    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    )
  }
}