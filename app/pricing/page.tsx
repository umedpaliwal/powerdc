"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Close,
  Star,
  TrendingUp,
  Speed,
  Api,
  Support,
  CloudDownload,
  Analytics,
  Security,
  Groups,
  Timer
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
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

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
      buttonText: "Start Free",
      buttonVariant: "outlined"
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
      highlighted: true,
      buttonText: "Start 14-Day Trial",
      buttonVariant: "contained",
      tag: "Most Popular"
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
      buttonText: "Contact Sales",
      buttonVariant: "outlined"
    }
  ];

  const handlePlanSelect = (planName: string) => {
    if (planName === "Explorer") {
      router.push("/signup");
    } else if (planName === "Professional") {
      router.push("/signup?plan=professional");
    } else {
      router.push("/contact");
    }
  };

  const annualSavings = (99 * 12) - 990;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Access the largest database of surplus interconnection opportunities
        </Typography>

        {/* Billing Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
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
          <Typography variant="body1" sx={{ ml: 1 }}>
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
      <Grid container spacing={4} alignItems="stretch">
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card 
              sx={{ 
                height: '100%',
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
                    top: -12,
                    right: 24,
                    fontWeight: 'bold'
                  }}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1, pt: plan.tag ? 4 : 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {plan.name}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  {plan.price === 0 && plan.period === "Custom" ? (
                    <Typography variant="h3" fontWeight="bold">
                      Custom
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="h3" component="span" fontWeight="bold">
                        ${plan.price}
                      </Typography>
                      <Typography variant="h6" component="span" color="text.secondary">
                        {plan.period}
                      </Typography>
                    </>
                  )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {plan.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

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
                          color: feature.included ? 'text.primary' : 'text.disabled'
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
                  sx={{
                    py: 1.5,
                    fontWeight: 'bold'
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Features Comparison */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Why Choose PowerDC?
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Speed sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                18 Month Deployment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Skip the 5-6 year interconnection queue with our surplus interconnection approach
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1,000+ GW Capacity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access the largest database of available surplus interconnection capacity
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Analytics sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Real-Time Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Make data-driven decisions with our comprehensive site analysis tools
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Trust Signals */}
      <Box sx={{ mt: 6, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                500+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sites Analyzed
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                50+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Data Centers Served
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                95%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clean Energy Mix
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                24/7
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Support Available
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* FAQ Alert */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="body2">
          <strong>Questions?</strong> Check out our FAQ or contact our sales team at sales@wattcanvas.com
        </Typography>
      </Alert>
    </Container>
  );
}