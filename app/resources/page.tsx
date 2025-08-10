"use client";

import { Box, Container, Typography, Paper, Grid, Card, CardContent, Button } from "@mui/material";
import { HelpOutline, Article, Description, Support, School, Email } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function ResourcesPage() {
  const router = useRouter();

  const resources = [
    {
      icon: <HelpOutline sx={{ fontSize: 48 }} />,
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about surplus interconnection, deployment timelines, and our platform.",
      link: "/resources/faq",
      buttonText: "View FAQ",
      color: "#00E5FF"
    },
    {
      icon: <Article sx={{ fontSize: 48 }} />,
      title: "Documentation",
      description: "Technical documentation, API references, and integration guides for the WattCanvas platform.",
      link: "/resources/docs",
      buttonText: "Browse Docs",
      color: "#764ba2",
      comingSoon: true
    },
    {
      icon: <Description sx={{ fontSize: 48 }} />,
      title: "Whitepapers & Research",
      description: "In-depth research on surplus interconnection, including UC Berkeley studies and GridLab reports.",
      link: "/resources/research",
      buttonText: "Read Research",
      color: "#4CAF50",
      comingSoon: true
    },
    {
      icon: <School sx={{ fontSize: 48 }} />,
      title: "Learning Center",
      description: "Educational resources about FERC Order 845, renewable energy integration, and data center deployment.",
      link: "/resources/learn",
      buttonText: "Start Learning",
      color: "#FFC107",
      comingSoon: true
    },
    {
      icon: <Support sx={{ fontSize: 48 }} />,
      title: "Support Center",
      description: "Get help with your account, technical issues, or platform questions.",
      link: "/support",
      buttonText: "Get Support",
      color: "#FF6B6B"
    },
    {
      icon: <Email sx={{ fontSize: 48 }} />,
      title: "Contact Us",
      description: "Reach out to our team for partnerships, media inquiries, or general questions.",
      link: "mailto:contact@wattcanvas.com",
      buttonText: "Contact Team",
      color: "#2196F3",
      external: true
    }
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
            Resources & Support
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: "rgba(255,255,255,0.9)", 
              maxWidth: "700px", 
              mx: "auto",
              lineHeight: 1.6
            }}
          >
            Everything you need to understand and leverage surplus interconnection for your data center deployment.
          </Typography>
        </Box>

        {/* Resource Cards */}
        <Grid container spacing={4}>
          {resources.map((resource, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card 
                sx={{ 
                  height: "100%",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 40px rgba(0, 229, 255, 0.2)",
                    background: "rgba(255,255,255,0.08)"
                  }
                }}
              >
                {resource.comingSoon && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      backgroundColor: "rgba(255, 152, 0, 0.2)",
                      color: "#FF9800",
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      border: "1px solid rgba(255, 152, 0, 0.3)"
                    }}
                  >
                    Coming Soon
                  </Box>
                )}
                
                <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box sx={{ color: resource.color, mr: 2 }}>
                      {resource.icon}
                    </Box>
                  </Box>
                  
                  <Typography variant="h5" sx={{ color: "white", fontWeight: 600, mb: 2 }}>
                    {resource.title}
                  </Typography>
                  
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, mb: 3, flex: 1 }}>
                    {resource.description}
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (resource.external) {
                        window.location.href = resource.link;
                      } else {
                        router.push(resource.link);
                      }
                    }}
                    disabled={resource.comingSoon}
                    sx={{
                      borderColor: resource.comingSoon ? "rgba(255,255,255,0.2)" : resource.color,
                      color: resource.comingSoon ? "rgba(255,255,255,0.3)" : resource.color,
                      "&:hover": {
                        borderColor: resource.color,
                        backgroundColor: `${resource.color}20`
                      }
                    }}
                  >
                    {resource.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Links Section */}
        <Paper 
          elevation={0}
          sx={{ 
            mt: 8,
            p: 5,
            borderRadius: 3,
            background: "rgba(0, 229, 255, 0.1)",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            textAlign: "center"
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: "#00E5FF", 
              mb: 3 
            }}
          >
            Need Immediate Assistance?
          </Typography>
          
          <Typography sx={{ color: "rgba(255,255,255,0.9)", mb: 4, fontSize: "1.1rem" }}>
            Our team is here to help you accelerate your data center deployment with surplus interconnection.
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/demo")}
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
              Email Support
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}