'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from '@mui/material'
import {
  Check,
  Lock,
  CreditCard,
  ArrowBack,
  Info,
} from '@mui/icons-material'
import { useAuth } from '@/hooks/useAuth'

interface PlanDetails {
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
}

export default function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: '',
    country: 'United States',
    postalCode: '',
  })

  const plan = searchParams?.get('plan') || 'professional'
  
  const planDetails: PlanDetails = {
    name: 'Professional',
    price: billingPeriod === 'monthly' ? 99 : 990,
    interval: billingPeriod === 'monthly' ? 'month' : 'year',
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

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts: string[] = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '')
    }
    return v
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    if (field === 'cardNumber') {
      value = formatCardNumber(value)
      if (value.replace(/\s/g, '').length > 16) return
    } else if (field === 'expiryDate') {
      value = formatExpiryDate(value)
      if (value.replace('/', '').length > 4) return
    } else if (field === 'cvc') {
      value = value.replace(/[^0-9]/gi, '')
      if (value.length > 4) return
    }

    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate payment processing
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push('/account?upgraded=true')
      }, 2000)
    }, 2000)
  }

  if (!user) {
    return null
  }

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <Check sx={{ fontSize: 60, color: 'success.main' }} />
          </Box>
          <Typography variant="h4" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Your subscription has been upgraded to Professional.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Redirecting to your account...
          </Typography>
        </Paper>
      </Container>
    )
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
                <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242 with any future date and CVC.
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

            {/* Payment Form */}
            <form onSubmit={handleSubmit}>
              <Typography variant="subtitle1" gutterBottom fontWeight="500">
                Payment Information
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange('cardNumber')}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCard />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleInputChange('cardName')}
                    required
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange('expiryDate')}
                    required
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVC"
                    placeholder="123"
                    value={formData.cvc}
                    onChange={handleInputChange('cvc')}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Lock fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle1" gutterBottom fontWeight="500">
                Billing Address
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={formData.country}
                    onChange={handleInputChange('country')}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    placeholder="12345"
                    value={formData.postalCode}
                    onChange={handleInputChange('postalCode')}
                    required
                  />
                </Grid>
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
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
            </form>
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