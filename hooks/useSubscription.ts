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

    const fetchSubscriptionData = async () => {
      setLoading(true)
      setError(null)

      try {
        const supabase = createClient()

        // Try to fetch subscription - handle table not existing gracefully
        try {
          const { data: subData, error: subError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .single()

          if (subError && subError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            // Only log error, don't throw - table might not exist
            console.log('Subscription fetch error (table may not exist):', subError)
          } else {
            setSubscription(subData)
          }
        } catch (subErr) {
          // Table doesn't exist - use default
          console.log('Subscriptions table not found, using defaults')
        }

        // Try to fetch current month usage - handle table not existing gracefully
        try {
          const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
          const { data: usageData, error: usageError } = await supabase
            .from('usage_tracking')
            .select('*')
            .eq('user_id', user.id)
            .eq('month', currentMonth)
            .single()

          if (usageError && usageError.code !== 'PGRST116') {
            // Only log error, don't throw - table might not exist
            console.log('Usage fetch error (table may not exist):', usageError)
          } else {
            setUsage(usageData)
          }
        } catch (usageErr) {
          // Table doesn't exist - use default
          console.log('Usage tracking table not found, using defaults')
        }
      } catch (err) {
        console.error('Error fetching subscription data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
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