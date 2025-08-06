/**
 * Utility functions for tracking usage via API routes
 */

export type UsageType = 'reports' | 'api' | 'exports'

/**
 * Increment usage for the current user
 */
export async function incrementUsage(usageType: UsageType, increment: number = 1): Promise<boolean> {
  try {
    const response = await fetch('/api/usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usage_type: usageType,
        increment,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Usage increment failed:', errorData.error || 'Unknown error')
      return false
    }

    const result = await response.json()
    console.log(`Usage incremented: ${result.message}`)
    return true
  } catch (error) {
    console.error('Usage increment network error:', error)
    return false
  }
}

/**
 * Get current usage data for the user
 */
export async function getCurrentUsage(): Promise<any | null> {
  try {
    const response = await fetch('/api/usage', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Usage fetch failed:', errorData.error || 'Unknown error')
      return null
    }

    const result = await response.json()
    return result.usage
  } catch (error) {
    console.error('Usage fetch network error:', error)
    return null
  }
}

/**
 * Get usage history for the user
 */
export async function getUsageHistory(limit: number = 12, offset: number = 0): Promise<any[] | null> {
  try {
    const response = await fetch(`/api/usage?limit=${limit}&offset=${offset}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Usage history fetch failed:', errorData.error || 'Unknown error')
      return null
    }

    const result = await response.json()
    return result.usage_history
  } catch (error) {
    console.error('Usage history fetch network error:', error)
    return null
  }
}

/**
 * Check if user has reached a usage limit
 */
export function checkUsageLimit(
  current: number,
  limit: number,
  threshold: number = 0.9
): {
  exceeded: boolean
  nearLimit: boolean
  remaining: number
  percentUsed: number
} {
  if (limit === -1) {
    // Unlimited
    return {
      exceeded: false,
      nearLimit: false,
      remaining: Infinity,
      percentUsed: 0,
    }
  }

  const remaining = Math.max(0, limit - current)
  const percentUsed = limit > 0 ? current / limit : 0
  const exceeded = current >= limit
  const nearLimit = percentUsed >= threshold

  return {
    exceeded,
    nearLimit,
    remaining,
    percentUsed,
  }
}