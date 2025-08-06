'use client'

import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Alert,
  Button,
  Divider
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { useEffect } from 'react'

export default function ApiDocsPage() {
  const { user, loading: authLoading } = useAuth()
  const { subscription, featureAccess, loading: subLoading } = useSubscription()
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

  if (!featureAccess.canAccessApiDocs) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          API Documentation is available for Professional and Enterprise plans only.
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => router.push('/account?upgrade=true&feature=professional')}
        >
          Upgrade to Professional
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        API Documentation
      </Typography>
      
      <Alert severity="success" sx={{ mb: 3 }}>
        Welcome to the PowerDC API! Your {subscription?.plan_type} plan includes full API access.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Getting Started
          </Typography>
          <Typography paragraph>
            The PowerDC API provides programmatic access to thermal and renewable energy data. 
            Use our RESTful endpoints to integrate power generation data into your applications.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Authentication
          </Typography>
          <Typography paragraph>
            All API requests require authentication using your API key. Include it in the header:
          </Typography>
          <Box component="pre" sx={{ 
            backgroundColor: 'grey.100', 
            p: 2, 
            borderRadius: 1,
            overflow: 'auto'
          }}>
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Endpoints
          </Typography>
          
          <Typography variant="h6" gutterBottom color="primary">
            GET /api/v1/thermal-plants
          </Typography>
          <Typography paragraph>
            Retrieve thermal power plant data with optional filtering and pagination.
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom color="primary">
            GET /api/v1/renewable-plants  
          </Typography>
          <Typography paragraph>
            Get renewable energy facility data including solar, wind, and other clean energy sources.
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom color="primary">
            POST /api/v1/analysis
          </Typography>
          <Typography paragraph>
            Submit analysis requests for custom energy generation reports and insights.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Rate Limits
          </Typography>
          <Typography paragraph>
            Your {subscription?.plan_type} plan includes:
          </Typography>
          <Box component="ul">
            <li>
              API Calls: {featureAccess.monthlyApiLimit === -1 ? 'Unlimited' : `${featureAccess.monthlyApiLimit} per month`}
            </li>
            <li>
              Data Exports: {featureAccess.monthlyExportLimit === -1 ? 'Unlimited' : `${featureAccess.monthlyExportLimit} per month`}
            </li>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            SDKs and Examples
          </Typography>
          <Typography paragraph>
            We provide SDKs and code examples for popular programming languages:
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button variant="outlined">Python SDK</Button>
            <Button variant="outlined">JavaScript SDK</Button>
            <Button variant="outlined">R Package</Button>
            <Button variant="outlined">cURL Examples</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}