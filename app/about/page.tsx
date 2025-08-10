"use client";

import { Box, Container, Typography, Paper, Grid, Card, CardContent, Avatar, Chip } from "@mui/material";
import { Lightbulb, Speed, Public, Group, Target, TrendingUp } from "@mui/icons-material";

export default function AboutPage() {
  const values = [
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: "Speed to Market",
      description: "We're obsessed with reducing deployment time from 5+ years to 18 months."
    },
    {
      icon: <Public sx={{ fontSize: 40 }} />,
      title: "Sustainability",
      description: "Enabling 95% renewable energy integration for every data center we help deploy."
    },
    {
      icon: <Lightbulb sx={{ fontSize: 40 }} />,
      title: "Innovation",
      description: "Leveraging regulatory frameworks like FERC Order 845 in creative ways."
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: "Impact",
      description: "Unlocking 30+ GW of stranded grid capacity for sustainable growth."
    }
  ];

  const milestones = [
    { year: "2023", event: "Founded to solve the data center energy crisis" },
    { year: "2024", event: "Analyzed 1,500+ thermal plants nationwide" },
    { year: "2024", event: "Identified 30+ GW of available capacity" },
    { year: "2025", event: "Launching WattCanvas platform for public access" }
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" }}>
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: "#00E5FF", 
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            About WattCanvas
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: "rgba(255,255,255,0.9)", 
              maxWidth: "800px", 
              mx: "auto",
              lineHeight: 1.6
            }}
          >
            We're pioneering the use of surplus interconnection to dramatically accelerate 
            data center deployment while maximizing renewable energy integration.
          </Typography>
        </Box>

        {/* Mission Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 5,
            mb: 8,
            borderRadius: 3,
            background: "rgba(0, 229, 255, 0.1)",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            textAlign: "center"
          }}
        >
          <Target sx={{ fontSize: 48, color: "#00E5FF", mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: "white", mb: 3 }}>
            Our Mission
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "1.2rem", lineHeight: 1.8, maxWidth: "800px", mx: "auto" }}>
            To unlock stranded grid capacity and enable the rapid deployment of sustainable data centers 
            using surplus interconnection, reducing deployment time from 5+ years to 18 months while 
            achieving 95% renewable energy integration.
          </Typography>
        </Paper>

        {/* Problem We Solve */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 600, color: "white", mb: 5 }}>
            The Problem We Solve
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: "100%",
                background: "rgba(255,100,100,0.1)",
                border: "1px solid rgba(255,100,100,0.3)"
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: "#FF6B6B", fontWeight: 600, mb: 2 }}>
                    Traditional Approach
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                    • 5-7 year deployment timeline
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                    • New transmission infrastructure required
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                    • Limited renewable integration (10-30%)
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                    • High capital expenditure
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: "100%",
                background: "rgba(0,229,255,0.1)",
                border: "1px solid rgba(0,229,255,0.3)"
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: "#00E5FF", fontWeight: 600, mb: 2 }}>
                    Our Solution
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                    • 18-month deployment timeline
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                    • Uses existing grid infrastructure
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                    • 95% renewable energy integration
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                    • Lower infrastructure costs
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Our Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 600, color: "white", mb: 5 }}>
            Our Values
          </Typography>
          
          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: "100%",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textAlign: "center",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 40px rgba(0, 229, 255, 0.2)"
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: "#00E5FF", mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" sx={{ color: "white", fontWeight: 600, mb: 2 }}>
                      {value.title}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Company Timeline */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 600, color: "white", mb: 5 }}>
            Our Journey
          </Typography>
          
          <Box sx={{ position: "relative" }}>
            {milestones.map((milestone, index) => (
              <Box key={index} sx={{ display: "flex", mb: 4, alignItems: "center" }}>
                <Chip 
                  label={milestone.year}
                  sx={{ 
                    backgroundColor: "#00E5FF",
                    color: "#0a0a0a",
                    fontWeight: 600,
                    mr: 3,
                    minWidth: "80px"
                  }}
                />
                <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                  {milestone.event}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Technology & Innovation */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 5,
            mb: 8,
            borderRadius: 3,
            background: "rgba(118, 75, 162, 0.1)",
            border: "1px solid rgba(118, 75, 162, 0.3)"
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#764ba2", mb: 3, textAlign: "center" }}>
            Technology & Innovation
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.8, mb: 3 }}>
            WattCanvas leverages advanced analytics and regulatory expertise to identify and unlock 
            surplus interconnection opportunities across the United States. Our platform analyzes:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
                • Real-time capacity factors at 1,500+ plants
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
                • Variable operating costs and grid constraints
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
                • Land availability and zoning regulations
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
                • Renewable resource quality (solar/wind)
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
                • Proximity to fiber infrastructure
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
                • Environmental and regulatory compliance
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Contact CTA */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "white", mb: 3 }}>
            Ready to Accelerate Your Data Center Deployment?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", mb: 4, fontSize: "1.1rem" }}>
            Let's discuss how surplus interconnection can transform your timeline and sustainability goals.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              href="/demo"
              sx={{
                backgroundColor: "#00E5FF",
                color: "#0a0a0a",
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
              href="mailto:contact@wattcanvas.com"
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
    </Box>
  );
}