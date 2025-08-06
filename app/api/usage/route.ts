import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { UsageTracking } from '@/types/auth'

export async function GET(request: Request) {
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

    // Parse query parameters
    const url = new URL(request.url)
    const monthParam = url.searchParams.get('month')
    const currentMonth = monthParam || new Date().toISOString().slice(0, 7) // YYYY-MM format

    // Fetch current month usage
    const { data: usage, error: usageError } = await supabase
      .from('usage_tracking')
      .select('*')
      .eq('user_id', user.id)
      .eq('month', currentMonth)
      .single()

    if (usageError) {
      // Handle case where usage doesn't exist
      if (usageError.code === 'PGRST116') {
        // Return default usage for new users
        const defaultUsage: Partial<UsageTracking> = {
          user_id: user.id,
          month: currentMonth,
          reports_generated: 0,
          api_calls: 0,
          data_exports: 0,
        }
        
        return NextResponse.json({ 
          usage: defaultUsage,
          isDefault: true,
          message: 'No usage data found, using defaults'
        })
      }
      
      console.error('Usage fetch error:', usageError)
      return NextResponse.json(
        { error: 'Failed to fetch usage data', details: usageError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ usage })
    
  } catch (error) {
    console.error('Unexpected error in usage GET:', error)
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
    const { usage_type, increment = 1 } = body

    // Validate usage type
    const validUsageTypes = ['reports', 'api', 'exports']
    if (!usage_type || !validUsageTypes.includes(usage_type)) {
      return NextResponse.json(
        { error: 'Invalid usage type', validTypes: validUsageTypes },
        { status: 400 }
      )
    }

    // Validate increment
    if (typeof increment !== 'number' || increment < 0) {
      return NextResponse.json(
        { error: 'Increment must be a non-negative number' },
        { status: 400 }
      )
    }

    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
    const now = new Date().toISOString()

    // Build increment object based on usage type
    const incrementData: any = {
      last_access: now,
    }

    switch (usage_type) {
      case 'reports':
        incrementData.reports_generated = increment
        break
      case 'api':
        incrementData.api_calls = increment
        break
      case 'exports':
        incrementData.data_exports = increment
        break
    }

    // Use upsert to create or update usage tracking
    const { data: usage, error: usageError } = await supabase
      .from('usage_tracking')
      .upsert({
        user_id: user.id,
        month: currentMonth,
        reports_generated: usage_type === 'reports' ? increment : 0,
        api_calls: usage_type === 'api' ? increment : 0,
        data_exports: usage_type === 'exports' ? increment : 0,
        last_access: now,
      }, {
        onConflict: 'user_id,month',
        ignoreDuplicates: false,
      })
      .select()
      .single()

    if (usageError) {
      // If upsert failed, try to increment existing record
      const { data: currentUsage } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('month', currentMonth)
        .single()

      if (currentUsage) {
        // Update existing record with incremented values
        const updateData: any = {
          last_access: now,
          updated_at: now,
        }

        switch (usage_type) {
          case 'reports':
            updateData.reports_generated = currentUsage.reports_generated + increment
            break
          case 'api':
            updateData.api_calls = currentUsage.api_calls + increment
            break
          case 'exports':
            updateData.data_exports = currentUsage.data_exports + increment
            break
        }

        const { data: updatedUsage, error: updateError } = await supabase
          .from('usage_tracking')
          .update(updateData)
          .eq('user_id', user.id)
          .eq('month', currentMonth)
          .select()
          .single()

        if (updateError) {
          console.error('Usage update error:', updateError)
          return NextResponse.json(
            { error: 'Failed to update usage', details: updateError.message },
            { status: 500 }
          )
        }

        return NextResponse.json({ 
          usage: updatedUsage,
          message: `${usage_type} usage incremented by ${increment}` 
        })
      } else {
        console.error('Usage creation error:', usageError)
        return NextResponse.json(
          { error: 'Failed to create usage record', details: usageError.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ 
      usage,
      message: `${usage_type} usage tracked successfully` 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Unexpected error in usage POST:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET all usage history for a user
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

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '12')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    // Fetch usage history
    const { data: usageHistory, error: usageError } = await supabase
      .from('usage_tracking')
      .select('*')
      .eq('user_id', user.id)
      .order('month', { ascending: false })
      .range(offset, offset + limit - 1)

    if (usageError) {
      console.error('Usage history fetch error:', usageError)
      return NextResponse.json(
        { error: 'Failed to fetch usage history', details: usageError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      usage_history: usageHistory || [],
      pagination: {
        limit,
        offset,
        count: usageHistory?.length || 0
      }
    })
    
  } catch (error) {
    console.error('Unexpected error in usage history PUT:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}