'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { hasPermission, FeatureKey } from '@/lib/auth/permissions'

interface ProtectedRouteProps {
  children: ReactNode
  requiresAuth?: boolean
  requiredFeature?: FeatureKey
  fallbackRoute?: string
  loadingComponent?: ReactNode
  errorComponent?: ReactNode
}

export default function ProtectedRoute({
  children,
  requiresAuth = true,
  requiredFeature,
  fallbackRoute = '/signin',
  loadingComponent,
  errorComponent,
}: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth()
  const { subscription, loading: subscriptionLoading } = useSubscription()
  const router = useRouter()

  const isLoading = authLoading || (requiresAuth && subscriptionLoading)

  useEffect(() => {
    if (!authLoading && requiresAuth && !user) {
      const currentPath = window.location.pathname
      const redirectUrl = `${fallbackRoute}?redirectTo=${encodeURIComponent(currentPath)}`
      router.push(redirectUrl)
    }
  }, [user, authLoading, requiresAuth, fallbackRoute, router])

  // Show loading state
  if (isLoading) {
    return (
      loadingComponent || (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Box>
      )
    )
  }

  // Check authentication requirement
  if (requiresAuth && !user) {
    return null // Will redirect via useEffect
  }

  // Check feature permission requirement
  if (requiredFeature) {
    const planTier = subscription?.plan_type
    const hasRequiredPermission = hasPermission(planTier, requiredFeature)

    if (!hasRequiredPermission) {
      const upgradeRoute = `/account?upgrade=true&feature=${requiredFeature}&redirectTo=${encodeURIComponent(window.location.pathname)}`
      
      return (
        errorComponent || (
          <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Premium Feature Required
              </Typography>
              <Typography>
                This feature requires a higher plan tier. 
                Your current plan: {planTier || 'Explorer'}
              </Typography>
            </Alert>
            <Box display="flex" gap={2} justifyContent="center">
              <Button 
                variant="outlined" 
                onClick={() => router.push('/dashboard')}
              >
                Back to Dashboard
              </Button>
              <Button 
                variant="contained" 
                onClick={() => router.push(upgradeRoute)}
              >
                Upgrade Plan
              </Button>
            </Box>
          </Box>
        )
      )
    }
  }

  // All checks passed, render children
  return <>{children}</>
}

// Convenience wrapper components
export function AuthenticatedRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiresAuth={true}>
      {children}
    </ProtectedRoute>
  )
}

export function ProfessionalRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiresAuth={true} requiredFeature="canAccessApiDocs">
      {children}
    </ProtectedRoute>
  )
}

export function ExportRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiresAuth={true} requiredFeature="canExportData">
      {children}
    </ProtectedRoute>
  )
}