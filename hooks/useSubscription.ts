'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { createClient } from '@/lib/supabase/client'
import { Subscription, UsageTracking } from '@/types/auth'

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

    const fetchSubscriptionData = async (retryCount = 0) => {
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
        if (subscriptionResponse.ok) {
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
        if (usageResponse.ok) {
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
        
        if (retryCount < 2) {
          console.log('Subscription data fetch network error, retrying...', errorMessage)
          const delay = Math.pow(2, retryCount) * 1000
          setTimeout(() => fetchSubscriptionData(retryCount + 1), delay)
        } else {
          setError(errorMessage)
        }
      } finally {
        clearTimeout(timeout)
        setLoading(false)
      }
    }

    fetchSubscriptionData()
  }, [user])

  // Calculate feature access based on subscription plan
  const featureAccess: FeatureAccess = subscription?.plan_type 
    ? PLAN_FEATURES[subscription.plan_type] || DEFAULT_FEATURE_ACCESS
    : DEFAULT_FEATURE_ACCESS

  return {
    subscription,
    usage,
    featureAccess,
    loading,
    error,
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