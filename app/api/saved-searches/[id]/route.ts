import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Search ID is required' },
        { status: 400 }
      )
    }

    // Fetch specific saved search
    const { data: savedSearch, error: searchError } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (searchError) {
      if (searchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Saved search not found', code: 'SEARCH_NOT_FOUND' },
          { status: 404 }
        )
      }
      
      console.error('Saved search fetch error:', searchError)
      return NextResponse.json(
        { error: 'Failed to fetch saved search', details: searchError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ saved_search: savedSearch })
    
  } catch (error) {
    console.error('Unexpected error in saved-search GET:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Search ID is required' },
        { status: 400 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, filters, saved_sites } = body

    // Build update object with only provided fields
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          { error: 'Search name must be a non-empty string' },
          { status: 400 }
        )
      }
      
      // Check if new name conflicts with existing searches (excluding current one)
      const { data: existingSearch } = await supabase
        .from('saved_searches')
        .select('id')
        .eq('user_id', user.id)
        .eq('name', name.trim())
        .neq('id', id)
        .single()

      if (existingSearch) {
        return NextResponse.json(
          { error: 'A saved search with this name already exists', code: 'DUPLICATE_NAME' },
          { status: 409 }
        )
      }
      
      updateData.name = name.trim()
    }

    if (filters !== undefined) {
      if (filters && (typeof filters !== 'object' || Array.isArray(filters))) {
        return NextResponse.json(
          { error: 'Filters must be a valid JSON object' },
          { status: 400 }
        )
      }
      updateData.filters = filters || {}
    }

    if (saved_sites !== undefined) {
      if (saved_sites && !Array.isArray(saved_sites)) {
        return NextResponse.json(
          { error: 'Saved sites must be an array' },
          { status: 400 }
        )
      }
      updateData.saved_sites = saved_sites || []
    }

    // Update saved search
    const { data: savedSearch, error: searchError } = await supabase
      .from('saved_searches')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (searchError) {
      if (searchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Saved search not found', code: 'SEARCH_NOT_FOUND' },
          { status: 404 }
        )
      }
      
      console.error('Saved search update error:', searchError)
      return NextResponse.json(
        { error: 'Failed to update saved search', details: searchError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      saved_search: savedSearch,
      message: 'Saved search updated successfully' 
    })
    
  } catch (error) {
    console.error('Unexpected error in saved-search PUT:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Search ID is required' },
        { status: 400 }
      )
    }

    // Delete saved search
    const { data: deletedSearch, error: deleteError } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (deleteError) {
      if (deleteError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Saved search not found', code: 'SEARCH_NOT_FOUND' },
          { status: 404 }
        )
      }
      
      console.error('Saved search delete error:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete saved search', details: deleteError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      deleted_search: deletedSearch,
      message: 'Saved search deleted successfully' 
    })
    
  } catch (error) {
    console.error('Unexpected error in saved-search DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}