import { createHash, randomBytes } from 'crypto'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const CSRF_SECRET = process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production'
const CSRF_COOKIE_NAME = '__Host-csrf-token'
const CSRF_HEADER_NAME = 'x-csrf-token'
const TOKEN_LENGTH = 32

export function generateCSRFToken(): string {
  return randomBytes(TOKEN_LENGTH).toString('hex')
}

export function hashToken(token: string): string {
  return createHash('sha256')
    .update(`${token}${CSRF_SECRET}`)
    .digest('hex')
}

export async function setCSRFToken(): Promise<string> {
  const token = generateCSRFToken()
  const hashedToken = hashToken(token)
  
  const cookieStore = await cookies()
  
  cookieStore.set(CSRF_COOKIE_NAME, hashedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  })
  
  return token
}

export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const hashedToken = cookieStore.get(CSRF_COOKIE_NAME)?.value
  
  if (!hashedToken) {
    return null
  }
  
  return hashedToken
}

export async function validateCSRFToken(request: NextRequest): Promise<boolean> {
  // Skip CSRF validation for GET and HEAD requests
  if (request.method === 'GET' || request.method === 'HEAD') {
    return true
  }
  
  // Get token from cookie
  const cookieStore = await cookies()
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value
  
  if (!cookieToken) {
    return false
  }
  
  // Get token from header or body
  let requestToken = request.headers.get(CSRF_HEADER_NAME)
  
  if (!requestToken) {
    try {
      const body = await request.clone().json()
      requestToken = body.csrfToken
    } catch {
      // Body is not JSON or doesn't contain csrfToken
    }
  }
  
  if (!requestToken) {
    return false
  }
  
  // Validate the token
  const hashedRequestToken = hashToken(requestToken)
  return cookieToken === hashedRequestToken
}

export function createCSRFMiddleware() {
  return async function csrfMiddleware(request: NextRequest) {
    const isValid = await validateCSRFToken(request)
    
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid CSRF token' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    
    return null // Continue to the route handler
  }
}

// Helper to get CSRF token for client-side use
export async function getClientCSRFToken(): Promise<string> {
  const response = await fetch('/api/csrf', {
    method: 'GET',
    credentials: 'same-origin'
  })
  
  if (!response.ok) {
    throw new Error('Failed to get CSRF token')
  }
  
  const data = await response.json()
  return data.token
}