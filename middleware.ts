import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { 
  isProtectedRoute, 
  requiresProfessional, 
  isPublicRoute, 
  getUserPlan, 
  getRedirectUrl,
  shouldBypassAuth 
} from '@/lib/auth/middleware'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // CRITICAL: Skip middleware entirely for Stripe webhooks
  if (pathname === '/api/stripe/webhooks') {
    return NextResponse.next()
  }

  // Remove the temporary bypass - dashboard and account now require authentication
  // Only keeping thermal/dashboard bypass if needed for specific demo
  // if (pathname.includes('/thermal/dashboard')) {
  //   return NextResponse.next()
  // }

  // Skip auth check for public routes and assets
  if (isPublicRoute(pathname) || shouldBypassAuth(pathname)) {
    return NextResponse.next()
  }

  // Create Supabase client for middleware
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Check authentication for protected routes
  if (isProtectedRoute(pathname)) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      // Redirect to signin if not authenticated
      const redirectUrl = getRedirectUrl(request)
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }

    // Check if route requires professional plan
    if (requiresProfessional(pathname)) {
      const userPlan = await getUserPlan(request)
      
      if (!userPlan || (userPlan !== 'professional' && userPlan !== 'enterprise')) {
        // Redirect to upgrade page or show access denied
        const upgradeUrl = new URL('/account?upgrade=true', request.url)
        upgradeUrl.searchParams.set('feature', 'professional')
        upgradeUrl.searchParams.set('redirectTo', pathname)
        return NextResponse.redirect(upgradeUrl)
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/stripe/webhooks (Stripe webhook endpoint)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api/stripe/webhooks|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
