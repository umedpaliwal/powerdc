'use client'

import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const { subscription, loading: subLoading } = useSubscription()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin')
    }
  }, [user, authLoading, router])

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Welcome back, {user.email}!
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Thermal Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Explore thermal power plant data and generate insights.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => router.push('/thermal/dashboard')}
              >
                Go to Thermal Dashboard
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Renewable Energy Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Analyze renewable energy projects and opportunities.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => router.push('/re/dashboard')}
              >
                Go to RE Dashboard
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Account Information
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Current Plan: {subscription?.plan_type || 'Explorer'} 
                {subscription?.status && ` (${subscription.status})`}
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => router.push('/account')}
              >
                Manage Account
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}