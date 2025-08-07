import { NextResponse } from 'next/server'
import { setCSRFToken } from '@/lib/csrf'

export async function GET() {
  try {
    const token = await setCSRFToken()
    
    return NextResponse.json({ 
      token,
      message: 'CSRF token generated successfully'
    })
  } catch (error) {
    console.error('Failed to generate CSRF token:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}