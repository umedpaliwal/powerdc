import { useState, useEffect } from 'react'

export function useCSRF() {
  const [csrfToken, setCSRFToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/api/csrf', {
          method: 'GET',
          credentials: 'same-origin'
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token')
        }
        
        const data = await response.json()
        setCSRFToken(data.token)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching CSRF token:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCSRFToken()
  }, [])

  const getHeaders = () => {
    if (!csrfToken) {
      return {}
    }
    
    return {
      'x-csrf-token': csrfToken
    }
  }

  const addToBody = (body: any) => {
    if (!csrfToken) {
      return body
    }
    
    return {
      ...body,
      csrfToken
    }
  }

  return {
    csrfToken,
    loading,
    error,
    getHeaders,
    addToBody
  }
}