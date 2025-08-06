'use client'

import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid,
  LinearProgress,
  Alert,
  Chip
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription, useUsageLimit } from '@/hooks/useSubscription'
import { useEffect } from 'react'

export default function AccountPage() {
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const { subscription, usage, featureAccess, loading: subLoading } = useSubscription()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const reportsUsage = useUsageLimit('reports')
  const apiUsage = useUsageLimit('api')
  const exportsUsage = useUsageLimit('exports')

  const showUpgrade = searchParams?.get('upgrade') === 'true'
  const requiredFeature = searchParams?.get('feature')
  const redirectTo = searchParams?.get('redirectTo')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin')
    }
  }, [user, authLoading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (authLoading || subLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!user) {
    return null
  }

  const UsageCard = ({ 
    title, 
    usage, 
    color = 'primary' 
  }: { 
    title: string
    usage: ReturnType<typeof useUsageLimit>
    color?: 'primary' | 'secondary' | 'error' | 'warning'
  }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        {usage.unlimited ? (
          <Typography color="success.main">Unlimited</Typography>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              {usage.current} of {usage.limit} used
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(usage.current / usage.limit) * 100}
              color={color}
              sx={{ mt: 1 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {usage.remaining} remaining
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Account Settings
      </Typography>
      
      {showUpgrade && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          This feature requires a {requiredFeature} plan or higher. 
          {redirectTo && ` You'll be redirected to ${redirectTo} after upgrading.`}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Account Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Account Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user.email}
              </Typography>
              {profile && (
                <>
                  {profile.company_name && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Company:</strong> {profile.company_name}
                    </Typography>
                  )}
                  {profile.industry_type && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Industry:</strong> {profile.industry_type}
                    </Typography>
                  )}
                  {profile.phone && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Phone:</strong> {profile.phone}
                    </Typography>
                  )}
                </>
              )}
              <Button variant="outlined" color="error" onClick={handleSignOut} sx={{ mt: 2 }}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Subscription Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Subscription Plan
              </Typography>
              <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <Chip 
                  label={subscription?.plan_type || 'Explorer'} 
                  color={subscription?.plan_type === 'enterprise' ? 'error' : 
                         subscription?.plan_type === 'professional' ? 'warning' : 'default'}
                  variant="outlined"
                />
                {subscription?.status && (
                  <Chip 
                    label={subscription.status} 
                    size="small"
                    color={subscription.status === 'active' ? 'success' : 'default'}
                  />
                )}
              </Box>
              
              {subscription?.trial_ends_at && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Trial ends: {new Date(subscription.trial_ends_at).toLocaleDateString()}
                </Typography>
              )}
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Features included:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Dashboard access</li>
                {featureAccess.canExportData && <li>Data export</li>}
                {featureAccess.canAccessApiDocs && <li>API documentation</li>}
                {featureAccess.hasApiAccess && <li>API access</li>}
              </Box>
              
              {(!subscription || subscription.plan_type === 'explorer') && (
                <Button variant="contained" sx={{ mt: 2 }}>
                  Upgrade Plan
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Usage Statistics */}
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
            Usage This Month
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <UsageCard title="Reports Generated" usage={reportsUsage} />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <UsageCard 
            title="API Calls" 
            usage={apiUsage}
            color={apiUsage.current > apiUsage.limit * 0.8 ? 'warning' : 'primary'}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <UsageCard 
            title="Data Exports" 
            usage={exportsUsage}
            color={exportsUsage.current > exportsUsage.limit * 0.8 ? 'warning' : 'primary'}
          />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button 
                  variant="outlined" 
                  onClick={() => router.push('/dashboard')}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => router.push('/api-docs')}
                  disabled={!featureAccess.canAccessApiDocs}
                >
                  API Documentation {!featureAccess.canAccessApiDocs && '(Pro)'}
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => router.push('/export')}
                  disabled={!featureAccess.canExportData}
                >
                  Export Data {!featureAccess.canExportData && '(Pro)'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}