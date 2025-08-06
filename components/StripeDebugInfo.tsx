'use client'

import { useState } from 'react'
import { 
  Box, 
  Button, 
  Typography, 
  Alert, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Collapse
} from '@mui/material'
import { ExpandMore, ExpandLess, BugReport } from '@mui/icons-material'

interface StripeDebugInfoProps {
  show?: boolean
}

export default function StripeDebugInfo({ show = false }: StripeDebugInfoProps) {
  const [expanded, setExpanded] = useState(show)

  const envVars = {
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY': process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    'NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID': process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    'NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID': process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
    'NEXT_PUBLIC_APP_URL': process.env.NEXT_PUBLIC_APP_URL,
  }

  const hasAllVars = Object.values(envVars).every(val => val && !val.startsWith('your_') && !val.includes('placeholder'))
  const hasPriceIds = envVars.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID && 
                     envVars.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID &&
                     !envVars.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID.startsWith('price_monthly_professional') &&
                     !envVars.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID.startsWith('price_annual_professional')

  if (!expanded) {
    return (
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<BugReport />}
          onClick={() => setExpanded(true)}
          size="small"
          color="info"
        >
          Show Stripe Debug Info
        </Button>
      </Box>
    )
  }

  return (
    <Paper sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'warning.main' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="warning.main">
          Stripe Configuration Debug
        </Typography>
        <Button
          endIcon={<ExpandLess />}
          onClick={() => setExpanded(false)}
          size="small"
        >
          Hide
        </Button>
      </Box>

      {!hasAllVars && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Missing Stripe Configuration
          </Typography>
          <Typography variant="body2">
            The checkout is failing because some Stripe environment variables are not configured properly.
          </Typography>
        </Alert>
      )}

      {!hasPriceIds && envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Using Mock Price IDs
          </Typography>
          <Typography variant="body2">
            You need to create actual Stripe products and update the price IDs. Run: <code>npm run setup:stripe</code>
          </Typography>
        </Alert>
      )}

      <Typography variant="subtitle2" gutterBottom>
        Environment Variables:
      </Typography>
      
      <List dense>
        {Object.entries(envVars).map(([key, value]) => (
          <ListItem key={key} sx={{ px: 0 }}>
            <ListItemText
              primary={key}
              secondary={
                value ? (
                  <>
                    {value.startsWith('pk_') || value.startsWith('price_') 
                      ? `${value.substring(0, 20)}...` 
                      : value
                    }
                    <Chip
                      label={
                        !value ? 'Missing' :
                        value.startsWith('your_') ? 'Placeholder' :
                        value.includes('placeholder') ? 'Placeholder' :
                        value.startsWith('price_monthly_professional') ? 'Mock' :
                        value.startsWith('price_annual_professional') ? 'Mock' :
                        'Configured'
                      }
                      size="small"
                      color={
                        !value ? 'error' :
                        value.startsWith('your_') || value.includes('placeholder') || value.startsWith('price_monthly_professional') || value.startsWith('price_annual_professional') ? 'warning' :
                        'success'
                      }
                      sx={{ ml: 1 }}
                    />
                  </>
                ) : (
                  <>
                    Not set
                    <Chip label="Missing" size="small" color="error" sx={{ ml: 1 }} />
                  </>
                )
              }
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Setup Instructions:
        </Typography>
        <Typography variant="body2" component="div">
          1. Set up your Stripe account and get your API keys<br/>
          2. Add environment variables to <code>.env.local</code><br/>
          3. Run <code>npm run setup:stripe</code> to create test products<br/>
          4. Update the price IDs in your environment variables<br/>
          5. Restart your development server
        </Typography>
      </Box>
    </Paper>
  )
}