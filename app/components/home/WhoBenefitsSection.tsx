"use client";

import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { 
  DataUsage, 
  SolarPower, 
  TrendingUp, 
  AccountBalance,
  Check
} from "@mui/icons-material";

export default function WhoBenefitsSection() {
  const personas = [
    {
      icon: <DataUsage sx={{ fontSize: 48 }} />,
      title: "Data Center Operators",
      headline: "Deploy 3-4 Years Faster",
      color: "#00E5FF",
      benefits: [
        "18-month deployment vs 5+ years",
        "95% renewable energy for ESG goals",
        "99.99% uptime guaranteed",
        "Direct cost savings on infrastructure"
      ]
    },
    {
      icon: <SolarPower sx={{ fontSize: 48 }} />,
      title: "Renewable Developers",
      headline: "Secure Offtakers Instantly",
      color: "#764ba2",
      benefits: [
        "Find data center customers immediately",
        "No new grid studies needed",
        "Utilize existing interconnections",
        "Accelerated project ROI"
      ]
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: "Infrastructure Investors",
      headline: "New Asset Class Opportunity",
      color: "#4CAF50",
      benefits: [
        "Integrated energy-compute projects",
        "Reduced interconnection risk",
        "Faster returns (18 months to revenue)",
        "$90B+ market opportunity"
      ]
    },
    {
      icon: <AccountBalance sx={{ fontSize: 48 }} />,
      title: "Public Stakeholders",
      headline: "Economic Growth & Grid Reliability",
      color: "#FFC107",
      benefits: [
        "Repurpose underutilized infrastructure",
        "Create local jobs",
        "Improve grid stability",
        "FERC Order 845 compliant"
      ]
    }
  ];

  return (
    <Box 
      sx={{ 
        py: 10,
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)"
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              color: "#00E5FF",
              mb: 3
            }}
          >
            Who Benefits from WattCanvas?
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              color: "rgba(255,255,255,0.8)",
              maxWidth: "800px",
              mx: "auto",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              lineHeight: 1.6
            }}
          >
            Our platform serves diverse stakeholders in the energy transition, 
            each gaining unique advantages from surplus interconnection
          </Typography>
        </Box>

        {/* Persona Cards Grid */}
        <Grid container spacing={4}>
          {personas.map((persona, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: "100%",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${persona.color}20`,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px ${persona.color}30`,
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${persona.color}40`,
                    "& .persona-icon": {
                      transform: "scale(1.1) rotate(5deg)"
                    }
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${persona.color}00, ${persona.color}, ${persona.color}00)`,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  },
                  "&:hover::before": {
                    opacity: 1
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Icon and Title */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box 
                      className="persona-icon"
                      sx={{ 
                        color: persona.color,
                        mr: 3,
                        transition: "transform 0.3s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        background: `${persona.color}15`
                      }}
                    >
                      {persona.icon}
                    </Box>
                    <Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: "white",
                          fontWeight: 600,
                          mb: 0.5
                        }}
                      >
                        {persona.title}
                      </Typography>
                      <Typography 
                        variant="subtitle1"
                        sx={{ 
                          color: persona.color,
                          fontWeight: 500
                        }}
                      >
                        {persona.headline}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Benefits List */}
                  <Box sx={{ mt: 3 }}>
                    {persona.benefits.map((benefit, idx) => (
                      <Box 
                        key={idx}
                        sx={{ 
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 2,
                          "&:last-child": { mb: 0 }
                        }}
                      >
                        <Check 
                          sx={{ 
                            color: persona.color,
                            fontSize: 20,
                            mr: 2,
                            mt: 0.3,
                            flexShrink: 0
                          }}
                        />
                        <Typography 
                          variant="body1"
                          sx={{ 
                            color: "rgba(255,255,255,0.85)",
                            lineHeight: 1.6
                          }}
                        >
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography 
            variant="h5"
            sx={{ 
              color: "rgba(255,255,255,0.9)",
              mb: 3,
              fontWeight: 500
            }}
          >
            No matter your role in the energy ecosystem, WattCanvas accelerates your path to success
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}