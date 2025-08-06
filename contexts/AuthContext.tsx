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
    // Check active sessions and sets the user
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        }
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    // Set a timeout to ensure loading eventually becomes false
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false)
      }
    }, 3000) // 3 second timeout

    getSession()

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (!error && data) {
        setProfile(data)
      } else {
        // Profile table might not exist or no profile yet - that's ok
        console.log('Profile fetch skipped:', error?.message || 'No profile found')
      }
    } catch (err) {
      // Don't let profile errors block auth
      console.log('Profile fetch error:', err)
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
    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: data.user.id,
          company_name: metadata?.company_name,
          industry_type: metadata?.industry_type,
          phone: metadata?.phone,
        })
      
      if (profileError) console.error('Profile creation error:', profileError)
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