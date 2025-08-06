import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

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

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '50')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    // Fetch saved searches
    const { data: savedSearches, error: searchError } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (searchError) {
      console.error('Saved searches fetch error:', searchError)
      return NextResponse.json(
        { error: 'Failed to fetch saved searches', details: searchError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      saved_searches: savedSearches || [],
      pagination: {
        limit,
        offset,
        count: savedSearches?.length || 0
      }
    })
    
  } catch (error) {
    console.error('Unexpected error in saved-searches GET:', error)
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
    const { name, filters, saved_sites } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search name is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    // Validate filters format if provided
    if (filters && (typeof filters !== 'object' || Array.isArray(filters))) {
      return NextResponse.json(
        { error: 'Filters must be a valid JSON object' },
        { status: 400 }
      )
    }

    // Validate saved_sites format if provided
    if (saved_sites && !Array.isArray(saved_sites)) {
      return NextResponse.json(
        { error: 'Saved sites must be an array' },
        { status: 400 }
      )
    }

    // Check if name already exists for this user
    const { data: existingSearch } = await supabase
      .from('saved_searches')
      .select('id')
      .eq('user_id', user.id)
      .eq('name', name.trim())
      .single()

    if (existingSearch) {
      return NextResponse.json(
        { error: 'A saved search with this name already exists', code: 'DUPLICATE_NAME' },
        { status: 409 }
      )
    }

    // Create saved search
    const { data: savedSearch, error: searchError } = await supabase
      .from('saved_searches')
      .insert({
        user_id: user.id,
        name: name.trim(),
        filters: filters || {},
        saved_sites: saved_sites || [],
      })
      .select()
      .single()

    if (searchError) {
      console.error('Saved search creation error:', searchError)
      return NextResponse.json(
        { error: 'Failed to create saved search', details: searchError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      saved_search: savedSearch,
      message: 'Saved search created successfully' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Unexpected error in saved-searches POST:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}