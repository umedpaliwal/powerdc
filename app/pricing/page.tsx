"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Switch,
  FormControlLabel,
  Divider,
  Paper,
  Alert,
  Fade
} from "@mui/material";
import {
  Check,
  Close
} from "@mui/icons-material";

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
    tooltip?: string;
  }>;
  highlighted?: boolean;
  buttonText: string;
  buttonVariant: "contained" | "outlined";
  tag?: string;
}

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  
  // Determine current plan
  const currentPlan = subscription?.plan_type || (user ? 'explorer' : null);

  const plans: PricingPlan[] = [
    {
      name: "Explorer",
      price: 0,
      period: "forever",
      description: "Perfect for researching surplus interconnection opportunities",
      features: [
        { text: "Access to 1 demo site", included: true },
        { text: "Basic interconnection data", included: true },
        { text: "Educational resources", included: true },
        { text: "Community forum access", included: true },
        { text: "Monthly newsletter", included: true },
        { text: "Full site database access", included: false },
        { text: "API access", included: false },
        { text: "Custom reports", included: false },
        { text: "Priority support", included: false },
        { text: "White-label options", included: false }
      ],
      buttonText: currentPlan === 'explorer' ? "Current Plan" : (user ? "Downgrade" : "Start Free"),
      buttonVariant: "outlined",
      tag: currentPlan === 'explorer' ? "Current Plan" : undefined
    },
    {
      name: "Professional",
      price: billingPeriod === 'monthly' ? 99 : 990,
      period: billingPeriod === 'monthly' ? "/month" : "/year",
      description: "For data centers and developers ready to deploy",
      features: [
        { text: "Access to 1,000+ sites", included: true },
        { text: "Real-time capacity data", included: true },
        { text: "Detailed site analytics", included: true },
        { text: "API access (1000 calls/month)", included: true },
        { text: "Export data (CSV/JSON)", included: true },
        { text: "Monthly market reports", included: true },
        { text: "Email support", included: true },
        { text: "Custom integrations", included: false },
        { text: "Dedicated account manager", included: false },
        { text: "White-label options", included: false }
      ],
      highlighted: currentPlan === 'explorer' || !currentPlan,
      buttonText: currentPlan === 'professional' ? "Current Plan" : 
                  currentPlan === 'enterprise' ? "Downgrade" : "Upgrade to Pro",
      buttonVariant: "contained",
      tag: currentPlan === 'professional' ? "Current Plan" : 
           currentPlan === 'explorer' ? "Upgrade to Pro" : "Most Popular"
    },
    {
      name: "Enterprise",
      price: 0,
      period: "Custom",
      description: "Tailored solutions for large-scale deployments",
      features: [
        { text: "Unlimited site access", included: true },
        { text: "Real-time capacity data", included: true },
        { text: "Advanced analytics & AI insights", included: true },
        { text: "Unlimited API access", included: true },
        { text: "Custom data exports", included: true },
        { text: "Custom reports & dashboards", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Custom integrations", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "White-label options", included: true }
      ],
      buttonText: currentPlan === 'enterprise' ? "Current Plan" : "Contact Sales",
      buttonVariant: "outlined",
      tag: currentPlan === 'enterprise' ? "Current Plan" : undefined
    }
  ];

  const handlePlanSelect = (planName: string) => {
    // If user is on this plan already, do nothing
    if (currentPlan === planName.toLowerCase()) {
      return;
    }
    
    // If user is logged in, redirect to checkout or account page
    if (user) {
      if (planName === "Professional") {
        router.push("/checkout?plan=professional");
      } else if (planName === "Enterprise") {
        router.push("/contact?plan=enterprise");
      } else if (planName === "Explorer") {
        router.push("/account?downgrade=true&plan=explorer");
      }
    } else {
      // Not logged in - redirect to signup
      if (planName === "Explorer") {
        router.push("/signup");
      } else if (planName === "Professional") {
        router.push("/signup");
      } else {
        router.push("/contact");
      }
    }
  };

  const annualSavings = (99 * 12) - 990;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom color="white">
          {currentPlan ? 'Upgrade Your Plan' : 'Choose Your Plan'}
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
          Access the largest database of surplus interconnection opportunities
        </Typography>
        {currentPlan && (
          <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
            You're currently on the <strong>{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</strong> plan.
            {currentPlan === 'explorer' && ' Upgrade to Professional to unlock advanced features!'}
          </Alert>
        )}

        {/* Billing Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          <Typography variant="body1" sx={{ mr: 2, color: 'white' }}>
            Monthly
          </Typography>
          <FormControlLabel
            control={
              <Switch 
                checked={billingPeriod === 'annual'}
                onChange={(e) => setBillingPeriod(e.target.checked ? 'annual' : 'monthly')}
                color="primary"
              />
            }
            label=""
          />
          <Typography variant="body1" sx={{ ml: 1, color: 'white' }}>
            Annual
          </Typography>
          {billingPeriod === 'annual' && (
            <Chip 
              label={`Save $${annualSavings}/year`}
              color="success"
              size="small"
              sx={{ ml: 2 }}
            />
          )}
        </Box>
      </Box>

      {/* Pricing Cards */}
      <Grid container spacing={4} alignItems="stretch" sx={{ mt: 2 }}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card 
              sx={{ 
                minHeight: '480px',
                maxHeight: '560px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.highlighted ? '2px solid' : '1px solid',
                borderColor: plan.highlighted ? 'primary.main' : 'divider',
                transform: plan.highlighted ? 'scale(1.05)' : 'none',
                boxShadow: plan.highlighted ? 8 : 1
              }}
            >
              {plan.tag && (
                <Chip
                  label={plan.tag}
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    fontWeight: 'bold',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(58, 134, 255, 0.15)',
                    color: '#3a86ff'
                  }}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1, pt: plan.tag ? 4 : 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
                  {plan.name}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  {plan.price === 0 && plan.period === "Custom" ? (
                    <Typography variant="h3" fontWeight="bold" color="white">
                      Custom
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="h3" component="span" fontWeight="bold" color="white">
                        ${plan.price}
                      </Typography>
                      <Typography variant="h6" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {plan.period}
                      </Typography>
                    </>
                  )}
                </Box>

                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                  {plan.description}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <List dense>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {feature.included ? (
                          <Check sx={{ color: 'success.main', fontSize: 20 }} />
                        ) : (
                          <Close sx={{ color: 'text.disabled', fontSize: 20 }} />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature.text}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: feature.included ? 'white' : 'rgba(255, 255, 255, 0.5)'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button 
                  fullWidth
                  variant={plan.buttonVariant}
                  size="large"
                  onClick={() => handlePlanSelect(plan.name)}
                  disabled={currentPlan === plan.name.toLowerCase()}
                  sx={{
                    py: 1.5,
                    fontWeight: 'bold',
                    ...(plan.buttonText === "Upgrade to Pro" ? {
                      backgroundColor: 'rgba(58, 134, 255, 0.2)',
                      color: 'white',
                      borderColor: 'rgba(58, 134, 255, 0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(58, 134, 255, 0.3)',
                        borderColor: 'rgba(58, 134, 255, 0.7)',
                      }
                    } : {}),
                    ...(currentPlan === plan.name.toLowerCase() && {
                      backgroundColor: 'rgba(58, 134, 255, 0.1)',
                      color: '#3a86ff',
                      borderColor: 'primary.main',
                      '&.Mui-disabled': {
                        backgroundColor: 'rgba(58, 134, 255, 0.1)',
                        color: '#3a86ff',
                        borderColor: 'primary.main',
                      }
                    })
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>



      {/* FAQ Alert */}
      <Alert 
        severity="info" 
        sx={{ 
          mt: 4,
          backgroundColor: 'rgba(58, 134, 255, 0.1)',
          border: '1px solid rgba(58, 134, 255, 0.3)',
          '& .MuiAlert-icon': {
            color: '#3a86ff'
          }
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <strong>Questions?</strong> Check out our FAQ or contact our sales team at sales@wattcanvas.com
        </Typography>
      </Alert>
    </Container>
  );
}