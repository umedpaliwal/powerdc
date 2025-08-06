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
  Chip,
  Container,
  Paper,
  Avatar
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription, useUsageLimit } from '@/hooks/useSubscription'
import { useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ApiIcon from '@mui/icons-material/Api'
import DownloadIcon from '@mui/icons-material/Download'
import SubscriptionManager from '@/components/SubscriptionManager'

export default function AccountContent() {
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

  // Only show loading for auth, not subscription (subscription might fail if tables don't exist)
  if (authLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" }}
      >
        <Typography color="white">Loading...</Typography>
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
    <Card sx={{ 
      height: '100%',
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="white">{title}</Typography>
        {usage.unlimited ? (
          <Typography sx={{ color: '#00E5FF' }}>Unlimited</Typography>
        ) : (
          <>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {usage.current} of {usage.limit} used
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(usage.current / usage.limit) * 100}
              sx={{ 
                mt: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#00E5FF'
                }
              }}
            />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
              {usage.remaining} remaining
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
      pt: 10,
      pb: 5
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: 'white',
            fontWeight: 700,
            mb: 4,
            background: "linear-gradient(45deg, #ffffff 30%, #00E5FF 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
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
            <Paper
              elevation={0}
              sx={{ 
                p: 4,
                height: '100%',
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: '#00E5FF', mr: 2 }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography variant="h5" component="h2" color="white">
                  Account Information
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 0.5 }}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: '#00E5FF', fontWeight: 500 }}>
                  {user.email}
                </Typography>
              </Box>
              
              {profile && (
                <>
                  {profile.company_name && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 0.5 }}>
                        Company
                      </Typography>
                      <Typography variant="body1" color="white">
                        {profile.company_name}
                      </Typography>
                    </Box>
                  )}
                  {profile.industry_type && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 0.5 }}>
                        Industry
                      </Typography>
                      <Typography variant="body1" color="white">
                        {profile.industry_type}
                      </Typography>
                    </Box>
                  )}
                  {profile.phone && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 0.5 }}>
                        Phone
                      </Typography>
                      <Typography variant="body1" color="white">
                        {profile.phone}
                      </Typography>
                    </Box>
                  )}
                </>
              )}
              
              <Button 
                variant="outlined" 
                startIcon={<LogoutIcon />}
                onClick={handleSignOut} 
                sx={{ 
                  mt: 2,
                  color: '#FF5252',
                  borderColor: '#FF5252',
                  '&:hover': {
                    borderColor: '#FF8A80',
                    backgroundColor: 'rgba(255, 82, 82, 0.1)'
                  }
                }}
              >
                Sign Out
              </Button>
            </Paper>
          </Grid>

          {/* Subscription Information */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              '& .MuiCard-root': {
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                height: '100%',
              },
              '& .MuiCardContent-root': {
                color: 'white',
              },
              '& .MuiTypography-h6': {
                color: 'white',
              },
              '& .MuiButton-contained': {
                background: 'linear-gradient(45deg, #00E5FF 30%, #0090EA 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00B8D4 30%, #0078C8 90%)',
                }
              }
            }}>
              <SubscriptionManager />
            </Box>
          </Grid>

          {/* Usage Statistics */}
          <Grid item xs={12}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 3, mb: 2, color: '#00E5FF' }}
            >
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
            <Paper
              elevation={0}
              sx={{ 
                p: 4,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom color="white">
                Quick Actions
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button 
                  variant="outlined"
                  startIcon={<DashboardIcon />}
                  onClick={() => router.push('/dashboard')}
                  sx={{
                    color: '#00E5FF',
                    borderColor: 'rgba(0, 229, 255, 0.5)',
                    '&:hover': {
                      borderColor: '#00E5FF',
                      backgroundColor: 'rgba(0, 229, 255, 0.1)'
                    }
                  }}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outlined"
                  startIcon={<ApiIcon />}
                  onClick={() => router.push('/api-docs')}
                  disabled={!featureAccess.canAccessApiDocs}
                  sx={{
                    color: featureAccess.canAccessApiDocs ? '#00E5FF' : 'rgba(255,255,255,0.3)',
                    borderColor: featureAccess.canAccessApiDocs ? 'rgba(0, 229, 255, 0.5)' : 'rgba(255,255,255,0.1)',
                    '&:hover': featureAccess.canAccessApiDocs ? {
                      borderColor: '#00E5FF',
                      backgroundColor: 'rgba(0, 229, 255, 0.1)'
                    } : {}
                  }}
                >
                  API Documentation {!featureAccess.canAccessApiDocs && '(Pro)'}
                </Button>
                <Button 
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => router.push('/export')}
                  disabled={!featureAccess.canExportData}
                  sx={{
                    color: featureAccess.canExportData ? '#00E5FF' : 'rgba(255,255,255,0.3)',
                    borderColor: featureAccess.canExportData ? 'rgba(0, 229, 255, 0.5)' : 'rgba(255,255,255,0.1)',
                    '&:hover': featureAccess.canExportData ? {
                      borderColor: '#00E5FF',
                      backgroundColor: 'rgba(0, 229, 255, 0.1)'
                    } : {}
                  }}
                >
                  Export Data {!featureAccess.canExportData && '(Pro)'}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}