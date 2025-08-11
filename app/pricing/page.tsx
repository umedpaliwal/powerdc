"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import DemoModal from '../components/demo/DemoModal';
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
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  
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
        { text: "API access", included: false },
        { text: "Priority support", included: false }
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
        { text: "API access (1000 calls/month)", included: true },
        { text: "Export data (CSV/JSON)", included: true },
        { text: "Email support", included: true },
        { text: "Custom integrations", included: false }
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
        { text: "Advanced analytics & AI", included: true },
        { text: "Unlimited API access", included: true },
        { text: "Custom reports & exports", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Dedicated account manager", included: true }
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
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
      py: 8
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ 
            color: 'white',
            textShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
            mb: 3
          }}>
            {currentPlan ? 'Upgrade Your Plan' : 'Choose Your Plan'}
          </Typography>
        {currentPlan && (
          <Alert severity="info" sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            mt: 2,
            backgroundColor: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: '#00E5FF'
            }
          }}>
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
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#00E5FF',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#00E5FF',
                  },
                }}
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
              size="small"
              sx={{ 
                ml: 2,
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                color: '#4caf50',
                border: '1px solid rgba(76, 175, 80, 0.4)'
              }}
            />
          )}
        </Box>
      </Box>

      {/* Pricing Cards */}
      <Grid container spacing={4} alignItems="stretch" sx={{ mt: 1 }}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card 
              sx={{ 
                minHeight: '460px',
                maxHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                bgcolor: 'rgba(0, 30, 50, 0.9)',
                backdropFilter: 'blur(10px)',
                border: plan.highlighted ? '2px solid' : '1px solid',
                borderColor: plan.highlighted ? '#00E5FF' : 'rgba(0, 229, 255, 0.2)',
                transform: plan.highlighted ? 'scale(1.05)' : 'none',
                boxShadow: plan.highlighted ? '0 20px 40px rgba(0, 229, 255, 0.3)' : '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: plan.highlighted ? 'scale(1.05)' : 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0, 229, 255, 0.2)'
                }
              }}
            >
              {plan.tag && (
                <Chip
                  label={plan.tag}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    fontWeight: 'bold',
                    border: '1px solid',
                    borderColor: '#00E5FF',
                    backgroundColor: 'rgba(0, 229, 255, 0.15)',
                    color: '#00E5FF'
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

                <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                <List dense>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {feature.included ? (
                          <Check sx={{ color: '#4caf50', fontSize: 20 }} />
                        ) : (
                          <Close sx={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 20 }} />
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
                    ...(plan.buttonVariant === 'contained' ? {
                      background: 'linear-gradient(45deg, #00E5FF 30%, #0090EA 90%) !important',
                      color: '#0a0a0a !important',
                      border: 'none',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00FFE5 30%, #00B8FF 90%) !important',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 229, 255, 0.5)',
                      }
                    } : {
                      color: '#00E5FF',
                      borderColor: '#00E5FF',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 229, 255, 0.1)',
                        borderColor: '#00FFE5',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 229, 255, 0.4)'
                      }
                    }),
                    ...(currentPlan === plan.name.toLowerCase() && {
                      backgroundColor: 'rgba(0, 229, 255, 0.1) !important',
                      background: 'rgba(0, 229, 255, 0.1) !important',
                      color: '#00E5FF',
                      borderColor: '#00E5FF',
                      '&.Mui-disabled': {
                        backgroundColor: 'rgba(0, 229, 255, 0.1) !important',
                        background: 'rgba(0, 229, 255, 0.1) !important',
                        color: '#00E5FF',
                        borderColor: '#00E5FF',
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



      {/* CTA Section */}
      <Box sx={{ 
        textAlign: "center", 
        mt: 8,
        p: 5,
        borderRadius: 3,
        background: "rgba(0, 229, 255, 0.05)",
        border: "1px solid rgba(0, 229, 255, 0.2)"
      }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "white", mb: 4 }}>
          Not Sure Which Plan Works for You?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setDemoModalOpen(true)}
            sx={{
              background: "linear-gradient(45deg, #00E5FF 30%, #0090EA 90%) !important",
              color: "#0a0a0a !important",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#00B8D4",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0, 229, 255, 0.3)"
              }
            }}
          >
            Schedule a Demo
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="/support"
            sx={{
              borderColor: "white",
              color: "white",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                borderColor: "#00E5FF",
                backgroundColor: "rgba(255,255,255,0.1)"
              }
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
      </Container>
      <DemoModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </Box>
  );
}