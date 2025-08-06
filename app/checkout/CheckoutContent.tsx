'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material'
import {
  Check,
  Lock,
  ArrowBack,
  Info,
} from '@mui/icons-material'
import { useAuth } from '@/hooks/useAuth'
import { getStripe } from '@/lib/stripe/client'
import { postData } from '@/lib/stripe/utils'

interface PlanDetails {
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  priceId: string
}

// Mock price IDs - in production, these would come from your Stripe Dashboard
const PRICE_IDS = {
  monthly: 'price_monthly_professional', // Replace with actual Stripe price ID
  annual: 'price_annual_professional',   // Replace with actual Stripe price ID
}

export default function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [error, setError] = useState('')

  const plan = searchParams?.get('plan') || 'professional'
  
  const planDetails: PlanDetails = {
    name: 'Professional',
    price: billingPeriod === 'monthly' ? 99 : 990,
    interval: billingPeriod === 'monthly' ? 'month' : 'year',
    priceId: PRICE_IDS[billingPeriod],
    features: [
      'Access to 1,000+ sites',
      'Real-time capacity data',
      'Detailed site analytics',
      'API access (1000 calls/month)',
      'Export data (CSV/JSON)',
      'Monthly market reports',
      'Email support',
    ]
  }

  const annualSavings = (99 * 12) - 990

  useEffect(() => {
    if (!user) {
      router.push('/signin?redirectTo=/checkout')
    }
  }, [user, router])

  const handleCheckout = async () => {
    if (!user) {
      setError('You must be logged in to subscribe')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { sessionId } = await postData({
        url: '/api/stripe/create-checkout-session',
        data: {
          priceId: planDetails.priceId,
          successUrl: `${window.location.origin}/account?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout?canceled=true`,
        },
      })

      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      setError(error.message || 'An error occurred during checkout')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Left side - Payment Form */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Complete your purchase
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Test Mode:</strong> You'll be redirected to Stripe's secure checkout page.
              </Typography>
            </Alert>

            {/* Billing Period Toggle */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="500">
                Billing Period
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Card 
                  sx={{ 
                    flex: 1, 
                    cursor: 'pointer',
                    border: billingPeriod === 'monthly' ? '2px solid' : '1px solid',
                    borderColor: billingPeriod === 'monthly' ? 'primary.main' : 'divider'
                  }}
                  onClick={() => setBillingPeriod('monthly')}
                >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Monthly
                    </Typography>
                    <Typography variant="h6">
                      $99/month
                    </Typography>
                  </CardContent>
                </Card>
                <Card 
                  sx={{ 
                    flex: 1, 
                    cursor: 'pointer',
                    border: billingPeriod === 'annual' ? '2px solid' : '1px solid',
                    borderColor: billingPeriod === 'annual' ? 'primary.main' : 'divider',
                    position: 'relative'
                  }}
                  onClick={() => setBillingPeriod('annual')}
                >
                  {billingPeriod === 'annual' && (
                    <Chip 
                      label={`Save $${annualSavings}`}
                      color="success"
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Annual
                    </Typography>
                    <Typography variant="h6">
                      $990/year
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Button
              onClick={handleCheckout}
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ 
                py: 1.5,
                background: 'linear-gradient(45deg, #00E5FF 30%, #0090EA 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00B8D4 30%, #0078C8 90%)',
                }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Processing...
                </>
              ) : (
                `Subscribe for $${planDetails.price}/${planDetails.interval}`
              )}
            </Button>

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                Secured by Stripe. Your payment information is encrypted and secure.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right side - Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 4, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">
                  PowerDC Professional
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  ${planDetails.price}/{planDetails.interval}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {billingPeriod === 'annual' ? 'Billed annually' : 'Billed monthly'}
              </Typography>
              
              {billingPeriod === 'annual' && (
                <Chip 
                  label={`You save $${annualSavings} per year`}
                  color="success"
                  size="small"
                  sx={{ mt: 1 }}
                />
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" gutterBottom fontWeight="500">
              Included Features:
            </Typography>
            
            <List dense>
              {planDetails.features.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Check sx={{ fontSize: 18, color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={feature}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                Subtotal
              </Typography>
              <Typography variant="body2">
                ${planDetails.price}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2">
                Tax
              </Typography>
              <Typography variant="body2">
                Calculated at checkout
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">
                Total due today
              </Typography>
              <Typography variant="h6" color="primary">
                ${planDetails.price}
              </Typography>
            </Box>

            <Alert severity="info" icon={<Info />}>
              <Typography variant="caption">
                You can cancel your subscription at any time from your account settings.
              </Typography>
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}