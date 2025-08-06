'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { createClient } from '@/lib/supabase/client'
import { Subscription, UsageTracking } from '@/types/auth'
import { postData } from '@/lib/stripe/utils'

type FeatureAccess = {
  canExportData: boolean
  canAccessApiDocs: boolean
  canGenerateReports: boolean
  hasApiAccess: boolean
  monthlyReportLimit: number
  monthlyApiLimit: number
  monthlyExportLimit: number
}

type SubscriptionData = {
  subscription: Subscription | null
  usage: UsageTracking | null
  featureAccess: FeatureAccess
  loading: boolean
  error: string | null
  manageSubscription: () => Promise<void>
  cancelSubscription: () => Promise<void>
  reactivateSubscription: () => Promise<void>
}

const DEFAULT_FEATURE_ACCESS: FeatureAccess = {
  canExportData: false,
  canAccessApiDocs: false,
  canGenerateReports: true,
  hasApiAccess: false,
  monthlyReportLimit: 5,
  monthlyApiLimit: 0,
  monthlyExportLimit: 0,
}

const PLAN_FEATURES: Record<string, FeatureAccess> = {
  explorer: {
    canExportData: false,
    canAccessApiDocs: false,
    canGenerateReports: true,
    hasApiAccess: false,
    monthlyReportLimit: 5,
    monthlyApiLimit: 0,
    monthlyExportLimit: 0,
  },
  professional: {
    canExportData: true,
    canAccessApiDocs: true,
    canGenerateReports: true,
    hasApiAccess: true,
    monthlyReportLimit: 50,
    monthlyApiLimit: 1000,
    monthlyExportLimit: 20,
  },
  enterprise: {
    canExportData: true,
    canAccessApiDocs: true,
    canGenerateReports: true,
    hasApiAccess: true,
    monthlyReportLimit: -1, // unlimited
    monthlyApiLimit: -1,    // unlimited
    monthlyExportLimit: -1, // unlimited
  },
}

export function useSubscription(): SubscriptionData {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usage, setUsage] = useState<UsageTracking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setSubscription(null)
      setUsage(null)
      setLoading(false)
      return
    }

    let mounted = true
    const fetchSubscriptionData = async (retryCount = 0) => {
      if (!mounted) return
      setLoading(true)
      setError(null)

      // Set a timeout to ensure loading completes
      const timeout = setTimeout(() => {
        if (loading) {
          setLoading(false)
        }
      }, 5000) // 5 second timeout

      try {
        // Fetch subscription data using API route
        const subscriptionPromise = fetch('/api/subscriptions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // Fetch usage data using API route
        const usagePromise = fetch('/api/usage', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // Wait for both requests to complete
        const [subscriptionResponse, usageResponse] = await Promise.all([
          subscriptionPromise,
          usagePromise,
        ])

        // Handle subscription response
        if (mounted && subscriptionResponse.ok) {
          const subscriptionResult = await subscriptionResponse.json()
          setSubscription(subscriptionResult.subscription || null)
        } else {
          const subError = await subscriptionResponse.json().catch(() => ({}))
          if (subscriptionResponse.status >= 500 && retryCount < 2) {
            console.log('Subscription fetch failed, will retry...', subError.error)
          } else {
            console.log('Subscription fetch error (non-critical):', subError.error || 'Unknown error')
          }
        }

        // Handle usage response
        if (mounted && usageResponse.ok) {
          const usageResult = await usageResponse.json()
          setUsage(usageResult.usage || null)
        } else {
          const usageError = await usageResponse.json().catch(() => ({}))
          if (usageResponse.status >= 500 && retryCount < 2) {
            console.log('Usage fetch failed, will retry...', usageError.error)
          } else {
            console.log('Usage fetch error (non-critical):', usageError.error || 'Unknown error')
          }
        }

        // If we got server errors and haven't retried too much, retry
        if (
          ((subscriptionResponse.status >= 500) || (usageResponse.status >= 500)) &&
          retryCount < 2
        ) {
          const delay = Math.pow(2, retryCount) * 1000
          console.log(`Retrying subscription data fetch in ${delay}ms...`)
          setTimeout(() => fetchSubscriptionData(retryCount + 1), delay)
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Network error occurred'
        
        if (retryCount < 2 && mounted) {
          console.log('Subscription data fetch network error, retrying...', errorMessage)
          const delay = Math.pow(2, retryCount) * 1000
          setTimeout(() => fetchSubscriptionData(retryCount + 1), delay)
        } else if (mounted) {
          setError(errorMessage)
        }
      } finally {
        clearTimeout(timeout)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchSubscriptionData()
    
    return () => {
      mounted = false
    }
  }, [user?.id])

  // Calculate feature access based on subscription plan
  const featureAccess: FeatureAccess = subscription?.plan_type 
    ? PLAN_FEATURES[subscription.plan_type] || DEFAULT_FEATURE_ACCESS
    : DEFAULT_FEATURE_ACCESS

  // Subscription management functions
  const manageSubscription = async () => {
    if (!user) {
      throw new Error('User not authenticated')
    }
    
    // If user doesn't have a paid subscription, redirect to pricing
    if (!subscription?.stripe_customer_id || !subscription?.stripe_subscription_id) {
      window.location.href = '/pricing'
      return
    }

    try {
      const { url } = await postData({
        url: '/api/stripe/create-portal-session',
        data: {
          returnUrl: `${window.location.origin}/account`,
        },
      })

      window.location.href = url
    } catch (error: any) {
      console.error('Failed to open customer portal:', error)
      throw error
    }
  }

  const cancelSubscription = async () => {
    if (!subscription?.stripe_subscription_id) {
      throw new Error('No active subscription found')
    }

    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripe_subscription_id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to cancel subscription')
      }

      // Refresh subscription data
      setSubscription(prev => prev ? { ...prev, status: 'canceled' } : null)
    } catch (error: any) {
      console.error('Failed to cancel subscription:', error)
      throw error
    }
  }

  const reactivateSubscription = async () => {
    if (!subscription?.stripe_subscription_id) {
      throw new Error('No subscription found')
    }

    try {
      const response = await fetch('/api/stripe/reactivate-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripe_subscription_id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to reactivate subscription')
      }

      // Refresh subscription data
      setSubscription(prev => prev ? { ...prev, status: 'active' } : null)
    } catch (error: any) {
      console.error('Failed to reactivate subscription:', error)
      throw error
    }
  }

  return {
    subscription,
    usage,
    featureAccess,
    loading,
    error,
    manageSubscription,
    cancelSubscription,
    reactivateSubscription,
  }
}

export function useFeatureAccess(feature: keyof FeatureAccess): boolean {
  const { featureAccess } = useSubscription()
  return featureAccess[feature] as boolean
}

export function useUsageLimit(type: 'reports' | 'api' | 'exports'): {
  current: number
  limit: number
  remaining: number
  unlimited: boolean
} {
  const { usage, featureAccess } = useSubscription()

  const limitMap = {
    reports: featureAccess.monthlyReportLimit,
    api: featureAccess.monthlyApiLimit,
    exports: featureAccess.monthlyExportLimit,
  }

  const currentMap = {
    reports: usage?.reports_generated || 0,
    api: usage?.api_calls || 0,
    exports: usage?.data_exports || 0,
  }

  const limit = limitMap[type]
  const current = currentMap[type]
  const unlimited = limit === -1

  return {
    current,
    limit,
    remaining: unlimited ? Infinity : Math.max(0, limit - current),
    unlimited,
  }
}