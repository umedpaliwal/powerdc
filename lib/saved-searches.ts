/**
 * Utility functions for managing saved searches via API routes
 */

export interface SavedSearch {
  id: string
  user_id: string
  name: string
  filters: Record<string, any>
  saved_sites: string[]
  created_at: string
  updated_at: string
}

export interface CreateSearchParams {
  name: string
  filters?: Record<string, any>
  saved_sites?: string[]
}

export interface UpdateSearchParams {
  name?: string
  filters?: Record<string, any>
  saved_sites?: string[]
}

/**
 * Get all saved searches for the current user
 */
export async function getSavedSearches(limit: number = 50, offset: number = 0): Promise<SavedSearch[] | null> {
  try {
    const response = await fetch(`/api/saved-searches?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Saved searches fetch failed:', errorData.error || 'Unknown error')
      return null
    }

    const result = await response.json()
    return result.saved_searches
  } catch (error) {
    console.error('Saved searches fetch network error:', error)
    return null
  }
}

/**
 * Get a specific saved search by ID
 */
export async function getSavedSearch(searchId: string): Promise<SavedSearch | null> {
  try {
    const response = await fetch(`/api/saved-searches/${searchId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 404) {
        return null // Search not found
      }
      console.error('Saved search fetch failed:', errorData.error || 'Unknown error')
      return null
    }

    const result = await response.json()
    return result.saved_search
  } catch (error) {
    console.error('Saved search fetch network error:', error)
    return null
  }
}

/**
 * Create a new saved search
 */
export async function createSavedSearch(params: CreateSearchParams): Promise<SavedSearch | null> {
  try {
    const response = await fetch('/api/saved-searches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 409 && errorData.code === 'DUPLICATE_NAME') {
        throw new Error('A saved search with this name already exists')
      }
      console.error('Saved search creation failed:', errorData.error || 'Unknown error')
      throw new Error(errorData.error || 'Failed to create saved search')
    }

    const result = await response.json()
    return result.saved_search
  } catch (error) {
    console.error('Saved search creation error:', error)
    throw error
  }
}

/**
 * Update an existing saved search
 */
export async function updateSavedSearch(searchId: string, params: UpdateSearchParams): Promise<SavedSearch | null> {
  try {
    const response = await fetch(`/api/saved-searches/${searchId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 404) {
        throw new Error('Saved search not found')
      }
      if (response.status === 409 && errorData.code === 'DUPLICATE_NAME') {
        throw new Error('A saved search with this name already exists')
      }
      console.error('Saved search update failed:', errorData.error || 'Unknown error')
      throw new Error(errorData.error || 'Failed to update saved search')
    }

    const result = await response.json()
    return result.saved_search
  } catch (error) {
    console.error('Saved search update error:', error)
    throw error
  }
}

/**
 * Delete a saved search
 */
export async function deleteSavedSearch(searchId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/saved-searches/${searchId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 404) {
        return false // Already deleted or doesn't exist
      }
      console.error('Saved search deletion failed:', errorData.error || 'Unknown error')
      return false
    }

    return true
  } catch (error) {
    console.error('Saved search deletion error:', error)
    return false
  }
}

/**
 * Check if a search name already exists for the current user
 */
export async function searchNameExists(name: string, excludeId?: string): Promise<boolean> {
  try {
    const searches = await getSavedSearches()
    if (!searches) return false

    return searches.some(search => 
      search.name.toLowerCase() === name.toLowerCase() && 
      search.id !== excludeId
    )
  } catch (error) {
    console.error('Search name check error:', error)
    return false
  }
}