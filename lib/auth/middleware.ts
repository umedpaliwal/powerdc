import { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { Subscription } from '@/types/auth'

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/account',
  '/thermal/dashboard',
  '/re/dashboard',
] as const

// Routes that require professional+ subscription
const PROFESSIONAL_ROUTES = [
  '/api-docs',
  '/export',
] as const

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
  '/thermal',
  '/re',
] as const

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => {
    // Handle exact matches and nested paths
    return pathname === route || pathname.startsWith(`${route}/`)
  })
}

export function requiresProfessional(pathname: string): boolean {
  return PROFESSIONAL_ROUTES.some(route => {
    return pathname === route || pathname.startsWith(`${route}/`)
  })
}

export function isPublicRoute(pathname: string): boolean {
  // Check exact matches for public routes
  if (PUBLIC_ROUTES.some(route => pathname === route)) {
    return true
  }
  
  // Check for public asset paths
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|json)$/)
  ) {
    return true
  }

  return false
}

export async function getUserPlan(request: NextRequest): Promise<string | null> {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // Cannot set cookies in middleware, but this method is required
          },
          remove(name: string, options: CookieOptions) {
            // Cannot remove cookies in middleware, but this method is required
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return null
    }

    // Try to fetch subscription, but if it fails or doesn't exist, default to 'explorer'
    try {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan_type')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()

      return subscription?.plan_type || 'explorer'
    } catch (subscriptionError) {
      // If subscription table doesn't exist or query fails, default to explorer
      return 'explorer'
    }
  } catch (error) {
    console.error('Error fetching user plan:', error)
    return null
  }
}

export function getRedirectUrl(request: NextRequest, targetPath: string = '/signin'): string {
  const searchParams = new URLSearchParams()
  
  // Add the current path as redirect parameter if it's not already signin/signup
  if (!request.nextUrl.pathname.startsWith('/signin') && 
      !request.nextUrl.pathname.startsWith('/signup') &&
      !request.nextUrl.pathname.startsWith('/auth/')) {
    searchParams.set('redirectTo', request.nextUrl.pathname)
  }

  return `${targetPath}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
}

export function shouldBypassAuth(pathname: string): boolean {
  // Check for API routes that should bypass auth
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/protected/')) {
    return true
  }

  // Check for auth callback routes
  if (pathname.startsWith('/auth/callback')) {
    return true
  }

  return false
}