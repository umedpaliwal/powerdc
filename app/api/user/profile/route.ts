import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { UserProfile } from '@/types/auth'

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

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      // Handle case where profile doesn't exist yet
      if (profileError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Profile not found', code: 'PROFILE_NOT_FOUND' },
          { status: 404 }
        )
      }
      
      console.error('Profile fetch error:', profileError)
      return NextResponse.json(
        { error: 'Failed to fetch profile', details: profileError.message },
        { status: 500 }
      )
    }

    // Add email from auth user to profile data
    const profileWithEmail: UserProfile = {
      ...profile,
      email: user.email,
    }

    return NextResponse.json({ profile: profileWithEmail })
    
  } catch (error) {
    console.error('Unexpected error in profile GET:', error)
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
    const { company_name, industry_type, phone } = body

    // Validate industry type if provided
    const validIndustryTypes = ['datacenter', 'utility', 'developer', 'other']
    if (industry_type && !validIndustryTypes.includes(industry_type)) {
      return NextResponse.json(
        { error: 'Invalid industry type', validTypes: validIndustryTypes },
        { status: 400 }
      )
    }

    // Update or create user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        company_name,
        industry_type,
        phone,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'id'
      })
      .select()
      .single()

    if (profileError) {
      console.error('Profile update error:', profileError)
      return NextResponse.json(
        { error: 'Failed to update profile', details: profileError.message },
        { status: 500 }
      )
    }

    // Add email from auth user to profile data
    const profileWithEmail: UserProfile = {
      ...profile,
      email: user.email,
    }

    return NextResponse.json({ 
      profile: profileWithEmail,
      message: 'Profile updated successfully' 
    })
    
  } catch (error) {
    console.error('Unexpected error in profile PUT:', error)
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
    const { company_name, industry_type, phone } = body

    // Validate required fields
    if (!company_name) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }

    // Validate industry type if provided
    const validIndustryTypes = ['datacenter', 'utility', 'developer', 'other']
    if (industry_type && !validIndustryTypes.includes(industry_type)) {
      return NextResponse.json(
        { error: 'Invalid industry type', validTypes: validIndustryTypes },
        { status: 400 }
      )
    }

    // Create user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        company_name,
        industry_type,
        phone,
      })
      .select()
      .single()

    if (profileError) {
      // Handle duplicate key error
      if (profileError.code === '23505') {
        return NextResponse.json(
          { error: 'Profile already exists', code: 'PROFILE_EXISTS' },
          { status: 409 }
        )
      }
      
      console.error('Profile creation error:', profileError)
      return NextResponse.json(
        { error: 'Failed to create profile', details: profileError.message },
        { status: 500 }
      )
    }

    // Add email from auth user to profile data
    const profileWithEmail: UserProfile = {
      ...profile,
      email: user.email,
    }

    return NextResponse.json({ 
      profile: profileWithEmail,
      message: 'Profile created successfully' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Unexpected error in profile POST:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}