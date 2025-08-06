import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  
  // Use NEXT_PUBLIC_SITE_URL in production, fallback to request origin
  const origin = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Handle different redirect scenarios
  if (type === 'recovery') {
    // Redirect to password reset page
    return NextResponse.redirect(`${origin}/reset-password`)
  }

  // Default redirect after sign in/sign up to dashboard
  return NextResponse.redirect(`${origin}/dashboard`)
}