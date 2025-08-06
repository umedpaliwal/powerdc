import { Subscription, UsageTracking } from '@/types/auth'

// Define plan tiers and their permissions
export type PlanTier = 'explorer' | 'professional' | 'enterprise'

export type FeaturePermissions = {
  // Dashboard access
  canAccessDashboard: boolean
  canAccessThermalDashboard: boolean
  canAccessRenewableDashboard: boolean
  
  // Professional features
  canExportData: boolean
  canAccessApiDocs: boolean
  canUseApi: boolean
  
  // Usage limits
  monthlyReportLimit: number
  monthlyApiCallLimit: number
  monthlyExportLimit: number
  
  // Advanced features
  canAccessAdvancedAnalytics: boolean
  canScheduleReports: boolean
  canIntegrateWithThirdParty: boolean
}

// Permission matrix for different plan tiers
export const PLAN_PERMISSIONS: Record<PlanTier, FeaturePermissions> = {
  explorer: {
    canAccessDashboard: true,
    canAccessThermalDashboard: true,
    canAccessRenewableDashboard: true,
    canExportData: false,
    canAccessApiDocs: false,
    canUseApi: false,
    monthlyReportLimit: 5,
    monthlyApiCallLimit: 0,
    monthlyExportLimit: 0,
    canAccessAdvancedAnalytics: false,
    canScheduleReports: false,
    canIntegrateWithThirdParty: false,
  },
  professional: {
    canAccessDashboard: true,
    canAccessThermalDashboard: true,
    canAccessRenewableDashboard: true,
    canExportData: true,
    canAccessApiDocs: true,
    canUseApi: true,
    monthlyReportLimit: 50,
    monthlyApiCallLimit: 1000,
    monthlyExportLimit: 20,
    canAccessAdvancedAnalytics: true,
    canScheduleReports: true,
    canIntegrateWithThirdParty: false,
  },
  enterprise: {
    canAccessDashboard: true,
    canAccessThermalDashboard: true,
    canAccessRenewableDashboard: true,
    canExportData: true,
    canAccessApiDocs: true,
    canUseApi: true,
    monthlyReportLimit: -1, // unlimited
    monthlyApiCallLimit: -1, // unlimited
    monthlyExportLimit: -1, // unlimited
    canAccessAdvancedAnalytics: true,
    canScheduleReports: true,
    canIntegrateWithThirdParty: true,
  },
}

// Feature groups for easier permission checking
export const PROFESSIONAL_FEATURES = [
  'canExportData',
  'canAccessApiDocs',
  'canUseApi',
  'canAccessAdvancedAnalytics',
  'canScheduleReports',
] as const

export const ENTERPRISE_FEATURES = [
  'canIntegrateWithThirdParty',
] as const

export type FeatureKey = keyof FeaturePermissions
export type ProfessionalFeature = typeof PROFESSIONAL_FEATURES[number]
export type EnterpriseFeature = typeof ENTERPRISE_FEATURES[number]

/**
 * Get permissions for a given plan tier
 */
export function getPermissionsForPlan(planTier: PlanTier): FeaturePermissions {
  return PLAN_PERMISSIONS[planTier]
}

/**
 * Check if a user has permission for a specific feature
 */
export function hasPermission(
  planTier: PlanTier | null | undefined,
  feature: FeatureKey
): boolean {
  if (!planTier) {
    planTier = 'explorer' // default to explorer if no plan
  }
  
  const permissions = PLAN_PERMISSIONS[planTier]
  return permissions[feature] as boolean
}

/**
 * Check if a user has reached their usage limit for a specific feature
 */
export function hasReachedUsageLimit(
  planTier: PlanTier | null | undefined,
  usage: UsageTracking | null,
  limitType: 'reports' | 'api' | 'exports'
): boolean {
  if (!planTier) {
    planTier = 'explorer'
  }

  const permissions = PLAN_PERMISSIONS[planTier]
  
  let limit: number
  let currentUsage: number

  switch (limitType) {
    case 'reports':
      limit = permissions.monthlyReportLimit
      currentUsage = usage?.reports_generated || 0
      break
    case 'api':
      limit = permissions.monthlyApiCallLimit
      currentUsage = usage?.api_calls || 0
      break
    case 'exports':
      limit = permissions.monthlyExportLimit
      currentUsage = usage?.data_exports || 0
      break
    default:
      return false
  }

  // -1 means unlimited
  if (limit === -1) {
    return false
  }

  return currentUsage >= limit
}

/**
 * Check if a feature requires a professional plan or higher
 */
export function requiresProfessionalPlan(feature: FeatureKey): boolean {
  return PROFESSIONAL_FEATURES.includes(feature as ProfessionalFeature) ||
         ENTERPRISE_FEATURES.includes(feature as EnterpriseFeature)
}

/**
 * Check if a feature requires an enterprise plan
 */
export function requiresEnterprisePlan(feature: FeatureKey): boolean {
  return ENTERPRISE_FEATURES.includes(feature as EnterpriseFeature)
}

/**
 * Get the minimum plan tier required for a feature
 */
export function getMinimumPlanForFeature(feature: FeatureKey): PlanTier {
  if (requiresEnterprisePlan(feature)) {
    return 'enterprise'
  }
  if (requiresProfessionalPlan(feature)) {
    return 'professional'
  }
  return 'explorer'
}

/**
 * Check if user can perform an action based on their plan and current usage
 */
export function canPerformAction(
  planTier: PlanTier | null | undefined,
  usage: UsageTracking | null,
  action: {
    feature: FeatureKey
    usageType?: 'reports' | 'api' | 'exports'
  }
): {
  allowed: boolean
  reason?: string
  upgradeRequired?: PlanTier
} {
  if (!hasPermission(planTier, action.feature)) {
    return {
      allowed: false,
      reason: 'Feature not available in your current plan',
      upgradeRequired: getMinimumPlanForFeature(action.feature),
    }
  }

  if (action.usageType && hasReachedUsageLimit(planTier, usage, action.usageType)) {
    return {
      allowed: false,
      reason: 'Monthly usage limit exceeded',
      upgradeRequired: planTier === 'explorer' ? 'professional' : 'enterprise',
    }
  }

  return { allowed: true }
}

/**
 * Get usage information for display
 */
export function getUsageInfo(
  planTier: PlanTier | null | undefined,
  usage: UsageTracking | null,
  type: 'reports' | 'api' | 'exports'
): {
  current: number
  limit: number
  remaining: number
  unlimited: boolean
  percentage: number
} {
  if (!planTier) {
    planTier = 'explorer'
  }

  const permissions = PLAN_PERMISSIONS[planTier]
  
  let limit: number
  let current: number

  switch (type) {
    case 'reports':
      limit = permissions.monthlyReportLimit
      current = usage?.reports_generated || 0
      break
    case 'api':
      limit = permissions.monthlyApiCallLimit
      current = usage?.api_calls || 0
      break
    case 'exports':
      limit = permissions.monthlyExportLimit
      current = usage?.data_exports || 0
      break
    default:
      return {
        current: 0,
        limit: 0,
        remaining: 0,
        unlimited: false,
        percentage: 0,
      }
  }

  const unlimited = limit === -1
  const remaining = unlimited ? Infinity : Math.max(0, limit - current)
  const percentage = unlimited ? 0 : Math.min(100, (current / limit) * 100)

  return {
    current,
    limit,
    remaining,
    unlimited,
    percentage,
  }
}