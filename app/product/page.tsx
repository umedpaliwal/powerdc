"use client";

import { Box, Container, Typography, Paper, Grid, Button, Card, CardContent, Chip } from "@mui/material";
import { Dashboard, Analytics, Map, Speed, Security, CloudSync, ArrowForward, Login } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProductPage() {
  const router = useRouter();
  const { user } = useAuth();

  const features = [
    {
      icon: <Map sx={{ fontSize: 48 }} />,
      title: "AI-Powered Site Selection",
      description: "Analyze 1,500+ power plants with real-time capacity data to find optimal locations for your data center deployment.",
      color: "#00E5FF"
    },
    {
      icon: <Analytics sx={{ fontSize: 48 }} />,
      title: "Project Simulation & Optimization",
      description: "Model solar, battery, and load configurations. Optimize for 95% renewable energy with ROI forecasts.",
      color: "#764ba2"
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: "Fast-Track Deployment",
      description: "Navigate FERC Order 845 processes and streamline permitting with our regulatory insights.",
      color: "#4CAF50"
    },
    {
      icon: <Dashboard sx={{ fontSize: 48 }} />,
      title: "Real-Time Monitoring",
      description: "Track performance, uptime (99.99%), and energy mix in real-time once your project goes live.",
      color: "#FFC107"
    }
  ];

  const platformCapabilities = [
    "1,500+ thermal plants analyzed",
    "Real-time capacity factors",
    "Variable cost tracking",
    "Interconnection capacity available",
    "Land availability analysis",
    "Solar/wind resource quality",
    "Distance to fiber networks",
    "Environmental constraints"
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
            WattCanvas Platform
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: "rgba(255,255,255,0.9)", 
              maxWidth: "800px", 
              mx: "auto",
              mb: 4,
              lineHeight: 1.6
            }}
          >
            A Grid Capacity Analytics Platform that identifies optimal sites for data center deployment 
            using surplus interconnection, enabling 18-month deployment instead of 5+ years.
          </Typography>
          
          {/* CTA Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            {user ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/dashboard")}
                startIcon={<Dashboard />}
                sx={{
                  backgroundColor: "#00E5FF",
                  color: "#0a0a0a",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#00B8D4",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0, 229, 255, 0.3)"
                  }
                }}
              >
                Open Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push("/demo")}
                  sx={{
                    backgroundColor: "#00E5FF",
                    color: "#0a0a0a",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#00B8D4",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(0, 229, 255, 0.3)"
                    }
                  }}
                >
                  Request Demo
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push("/signin")}
                  startIcon={<Login />}
                  sx={{
                    borderColor: "#00E5FF",
                    color: "#00E5FF",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#00B8D4",
                      backgroundColor: "rgba(0, 229, 255, 0.1)"
                    }
                  }}
                >
                  Sign In to Dashboard
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* Platform Features */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: "center", 
              fontWeight: 600, 
              color: "white", 
              mb: 5 
            }}
          >
            How WattCanvas Works
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  sx={{ 
                    height: "100%",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 40px rgba(0, 229, 255, 0.2)",
                      background: "rgba(255,255,255,0.08)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box sx={{ color: feature.color, mr: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Platform Capabilities */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 5,
            borderRadius: 3,
            background: "rgba(0, 229, 255, 0.1)",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            mb: 8
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: "center", 
              fontWeight: 600, 
              color: "#00E5FF", 
              mb: 4 
            }}
          >
            Platform Capabilities
          </Typography>
          
          <Grid container spacing={2}>
            {platformCapabilities.map((capability, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Chip
                  label={capability}
                  sx={{
                    width: "100%",
                    height: "auto",
                    padding: "12px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "white",
                    fontSize: "0.9rem",
                    "& .MuiChip-label": { whiteSpace: "normal" }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Dashboard Preview Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: "center", 
              fontWeight: 600, 
              color: "white", 
              mb: 5 
            }}
          >
            Interactive Dashboard
          </Typography>
          
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center"
            }}
          >
            <Box 
              sx={{ 
                height: 400, 
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3
              }}
            >
              <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.5)" }}>
                Dashboard Preview Coming Soon
              </Typography>
            </Box>
            
            <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}>
              Our interactive dashboard provides real-time insights into available sites, capacity factors, 
              and renewable potential across 1,500+ power plants nationwide.
            </Typography>
            
            <Button
              variant="contained"
              onClick={() => router.push(user ? "/dashboard" : "/demo")}
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: "#00E5FF",
                color: "#0a0a0a",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#00B8D4"
                }
              }}
            >
              {user ? "Access Dashboard" : "Request a Demo"}
            </Button>
          </Paper>
        </Box>

        {/* Security & Compliance */}
        <Box sx={{ textAlign: "center" }}>
          <Security sx={{ fontSize: 48, color: "#00E5FF", mb: 2 }} />
          <Typography variant="h5" sx={{ color: "white", mb: 2, fontWeight: 600 }}>
            Enterprise-Grade Security
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", maxWidth: "600px", mx: "auto" }}>
            Your data is encrypted and secure. WattCanvas is fully compliant with industry standards 
            and FERC Order 845 regulations.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}