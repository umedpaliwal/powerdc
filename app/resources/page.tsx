"use client";

import { useState } from "react";
import { Box, Container, Typography, Paper, Grid, Card, CardContent, Button } from "@mui/material";
import { HelpOutline, Article, Description, Support } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import DemoModal from "../components/demo/DemoModal";

export default function ResourcesPage() {
  const router = useRouter();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const resources = [
    {
      icon: <HelpOutline sx={{ fontSize: 48 }} />,
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about surplus interconnection, deployment timelines, and our platform.",
      link: "/faq",
      buttonText: "View FAQ",
      color: "#00E5FF"
    },
    {
      icon: <Description sx={{ fontSize: 48 }} />,
      title: "Whitepapers & Research",
      description: "UC Berkeley and RMI studies showing 800+ GW potential through surplus interconnection at existing fossil sites.",
      link: "/resources/research",
      buttonText: "View All Research",
      color: "#4CAF50"
    },
    {
      icon: <Article sx={{ fontSize: 48 }} />,
      title: "Recent News Coverage",
      description: "Latest media coverage on surplus interconnection opportunities and regulatory developments.",
      link: "/resources/news",
      buttonText: "View News",
      color: "#FFC107"
    },
    {
      icon: <Support sx={{ fontSize: 48 }} />,
      title: "Contact Us",
      description: "Get help with your account, technical issues, or platform questions.",
      link: "/support",
      buttonText: "Contact Team",
      color: "#FF6B6B"
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
        </Box>

        {/* Resource Cards */}
        <Grid container spacing={4}>
          {resources.map((resource, index) => (
            <Grid item xs={12} md={6} key={index}>
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
                      router.push(resource.link);
                    }}
                    sx={{
                      borderColor: resource.color,
                      color: resource.color,
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

        {/* Schedule Demo Button */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
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
        </Box>
      </Container>
      <DemoModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </Box>
  );
}