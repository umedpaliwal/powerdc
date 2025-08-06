'use client'

import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

export type PlanType = 'explorer' | 'professional' | 'enterprise'

interface Plan {
  id: PlanType
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
}

interface PlanSelectorProps {
  selectedPlan: PlanType
  onPlanSelect: (plan: PlanType) => void
}

const plans: Plan[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    price: 'Free',
    description: 'Perfect for getting started with PowerDC',
    features: [
      'Access to basic reports',
      'Limited data exports',
      'Community support',
      'Basic analytics'
    ],
    buttonText: 'Start Free'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$99/month',
    description: 'For growing businesses and power developers',
    features: [
      'Unlimited reports',
      'Advanced analytics',
      'Data exports & API access',
      'Email support',
      'Custom dashboards',
      'Historical data access'
    ],
    popular: true,
    buttonText: 'Choose Professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security features',
      'SLA guarantees',
      'On-premise deployment options'
    ],
    buttonText: 'Contact Sales'
  }
]

export function PlanSelector({ selectedPlan, onPlanSelect }: PlanSelectorProps) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Choose Your Plan
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        You can upgrade or downgrade at any time
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
        {plans.map((plan) => (
          <Card
            key={plan.id}
            sx={{
              flex: 1,
              minWidth: 280,
              cursor: 'pointer',
              border: selectedPlan === plan.id ? 2 : 1,
              borderColor: selectedPlan === plan.id ? 'primary.main' : 'divider',
              position: 'relative',
              '&:hover': {
                borderColor: 'primary.main',
                transform: 'translateY(-2px)',
                boxShadow: 2
              },
              transition: 'all 0.2s ease-in-out'
            }}
            onClick={() => onPlanSelect(plan.id)}
          >
            {plan.popular && (
              <Chip
                label="Most Popular"
                color="primary"
                size="small"
                sx={{
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
            )}
            
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  {plan.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {plan.description}
                </Typography>
              </Box>

              <List dense sx={{ mb: 2 }}>
                {plan.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                fullWidth
                variant={selectedPlan === plan.id ? 'contained' : 'outlined'}
                color="primary"
                size="large"
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}