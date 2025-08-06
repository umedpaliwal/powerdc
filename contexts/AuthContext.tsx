'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { UserProfile } from '@/types/auth'

type AuthContextType = {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, metadata?: any) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithMicrosoft: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    let mounted = true
    
    // Check active sessions and sets the user
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (mounted) {
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await fetchUserProfile(session.user.id)
          }
        }
      } catch (error) {
        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    // Set a timeout to ensure loading eventually becomes false
    const timeout = setTimeout(() => {
      if (loading && mounted) {
        setLoading(false)
      }
    }, 3000) // 3 second timeout

    getSession()

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setProfile(null)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [supabase.auth])

  const fetchUserProfile = async (userId: string, retryCount = 0) => {
    try {
      // Use API route instead of direct database call
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const { profile } = await response.json()
        setProfile(profile)
      } else {
        const errorData = await response.json().catch(() => ({}))
        
        // Handle specific error cases
        if (response.status === 404 && errorData.code === 'PROFILE_NOT_FOUND') {
          console.log('User profile not found - this is normal for new users')
          setProfile(null)
        } else if (response.status >= 500 && retryCount < 2) {
          // Retry server errors up to 2 times with exponential backoff
          const delay = Math.pow(2, retryCount) * 1000
          console.log(`Profile fetch failed, retrying in ${delay}ms...`)
          setTimeout(() => fetchUserProfile(userId, retryCount + 1), delay)
          return
        } else {
          console.log('Profile fetch failed:', errorData.error || 'Unknown error')
        }
      }
    } catch (err) {
      // Don't let profile errors block auth
      if (retryCount < 2) {
        console.log('Profile fetch network error, retrying...', err)
        const delay = Math.pow(2, retryCount) * 1000
        setTimeout(() => fetchUserProfile(userId, retryCount + 1), delay)
      } else {
        console.log('Profile fetch failed after retries:', err)
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    // Use NEXT_PUBLIC_SITE_URL in production, fallback to window.location.origin
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${redirectUrl}/auth/callback`,
      },
    })
    
    if (error) throw error
    
    // Create user profile after signup
    if (data.user && metadata?.company_name) {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: metadata.company_name,
            industry_type: metadata.industry_type,
            phone: metadata.phone,
          }),
        })
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('Profile creation error:', errorData.error || 'Unknown error')
        }
      } catch (profileErr) {
        console.error('Profile creation network error:', profileErr)
      }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    // Use NEXT_PUBLIC_SITE_URL in production, fallback to window.location.origin
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${redirectUrl}/auth/callback`,
      },
    })
    
    if (error) throw error
  }

  const signInWithMicrosoft = async () => {
    // Use NEXT_PUBLIC_SITE_URL in production, fallback to window.location.origin
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${redirectUrl}/auth/callback`,
      },
    })
    
    if (error) throw error
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithMicrosoft,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}