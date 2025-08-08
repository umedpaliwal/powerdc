import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Subscription } from '@/types/auth'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Authentication failed', details: authError.message },
        { status: 401 }
      )
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      )
    }

    // Fetch subscription (including those pending cancellation)
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing', 'past_due'])
      .single()

    if (subscriptionError) {
      // Handle case where subscription doesn't exist
      if (subscriptionError.code === 'PGRST116') {
        // Return default subscription for new users
        const defaultSubscription: Partial<Subscription> = {
          user_id: user.id,
          plan_type: 'explorer',
          status: 'active',
        }
        
        return NextResponse.json({ 
          subscription: defaultSubscription,
          isDefault: true,
          message: 'No subscription found, using default Explorer plan'
        })
      }
      
      console.error('Subscription fetch error:', subscriptionError)
      return NextResponse.json(
        { error: 'Failed to fetch subscription', details: subscriptionError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ subscription })
    
  } catch (error) {
    console.error('Unexpected error in subscriptions GET:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Authentication failed', details: authError.message },
        { status: 401 }
      )
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { plan_type, status, stripe_customer_id, stripe_subscription_id, trial_ends_at } = body

    // Validate plan type
    const validPlanTypes = ['explorer', 'professional', 'enterprise']
    if (!plan_type || !validPlanTypes.includes(plan_type)) {
      return NextResponse.json(
        { error: 'Invalid plan type', validTypes: validPlanTypes },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ['active', 'trialing', 'canceled', 'past_due']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status', validStatuses: validStatuses },
        { status: 400 }
      )
    }

    // Calculate current period dates
    const now = new Date()
    const currentPeriodStart = now.toISOString()
    const currentPeriodEnd = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toISOString()

    // Create or update subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        plan_type,
        status,
        trial_ends_at,
        current_period_start: currentPeriodStart,
        current_period_end: currentPeriodEnd,
        stripe_customer_id,
        stripe_subscription_id,
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single()

    if (subscriptionError) {
      console.error('Subscription creation/update error:', subscriptionError)
      return NextResponse.json(
        { error: 'Failed to create/update subscription', details: subscriptionError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      subscription,
      message: 'Subscription created/updated successfully' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Unexpected error in subscriptions POST:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Authentication failed', details: authError.message },
        { status: 401 }
      )
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { plan_type, status, stripe_customer_id, stripe_subscription_id, trial_ends_at } = body

    // Validate plan type if provided
    if (plan_type) {
      const validPlanTypes = ['explorer', 'professional', 'enterprise']
      if (!validPlanTypes.includes(plan_type)) {
        return NextResponse.json(
          { error: 'Invalid plan type', validTypes: validPlanTypes },
          { status: 400 }
        )
      }
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['active', 'trialing', 'canceled', 'past_due']
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status', validStatuses: validStatuses },
          { status: 400 }
        )
      }
    }

    // Build update object with only provided fields
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (plan_type) updateData.plan_type = plan_type
    if (status) updateData.status = status
    if (stripe_customer_id) updateData.stripe_customer_id = stripe_customer_id
    if (stripe_subscription_id) updateData.stripe_subscription_id = stripe_subscription_id
    if (trial_ends_at) updateData.trial_ends_at = trial_ends_at

    // Update subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .update(updateData)
      .eq('user_id', user.id)
      .select()
      .single()

    if (subscriptionError) {
      // Handle case where subscription doesn't exist
      if (subscriptionError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Subscription not found', code: 'SUBSCRIPTION_NOT_FOUND' },
          { status: 404 }
        )
      }
      
      console.error('Subscription update error:', subscriptionError)
      return NextResponse.json(
        { error: 'Failed to update subscription', details: subscriptionError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      subscription,
      message: 'Subscription updated successfully' 
    })
    
  } catch (error) {
    console.error('Unexpected error in subscriptions PUT:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}