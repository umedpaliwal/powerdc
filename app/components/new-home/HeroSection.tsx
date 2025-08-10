"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DemoModal from "../demo/DemoModal";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDemoClick = () => {
    console.log("Demo button clicked, opening modal");
    setDemoModalOpen(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
      }}
    >
      {/* Animated background pattern */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: "float 20s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />

      {/* Floating particles effect */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {mounted && [...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: "4px",
              height: "4px",
              backgroundColor: "#00E5FF",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `particle ${20 + Math.random() * 20}s linear infinite`,
              "@keyframes particle": {
                "0%": { transform: "translateY(0) translateX(0)" },
                "100%": { transform: `translateY(-100vh) translateX(${Math.random() * 100 - 50}px)` },
              },
            }}
          />
        ))}
      </Box>

      {/* Content overlay */}
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, pt: 15, pb: 8 }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Hero Text and CTA */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Box
              sx={{
                maxWidth: { xs: "100%", md: "100%" },
                margin: { xs: "auto", md: "0" },
                animation: mounted ? "slideInLeft 0.8s ease-out" : "none",
                "@keyframes slideInLeft": {
                  "0%": { opacity: 0, transform: "translateX(-50px)" },
                  "100%": { opacity: 1, transform: "translateX(0)" },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#00E5FF",
                    letterSpacing: "1px",
                  }}
                >
                  WattCanvas
                </Typography>
              </Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "3.5rem",
                    lg: "4rem",
                  },
                  fontWeight: 800,
                  color: "#fff",
                  mb: 3,
                  letterSpacing: "-1px",
                  lineHeight: 1.2,
                  background: "linear-gradient(45deg, #ffffff 30%, #00E5FF 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Deploy Your Data Center in 18 Months, Not 5 Years
              </Typography>
            </Box>

            <Box
              sx={{
                maxWidth: { xs: "100%", md: "100%" },
                margin: { xs: "auto", md: "0" },
                animation: mounted ? "slideInLeft 1s ease-out" : "none",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.9)",
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Access <Box component="span" sx={{ fontWeight: 700, color: "#00E5FF" }}>1,000 GW</Box> of ready grid capacity. Skip the 5-year interconnection queue with surplus interconnection.
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Stats and CTA */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                animation: mounted ? "slideInRight 1s ease-out" : "none",
                "@keyframes slideInRight": {
                  "0%": { opacity: 0, transform: "translateX(50px)" },
                  "100%": { opacity: 1, transform: "translateX(0)" },
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
                gap: 4,
              }}
            >
              {/* Stats Grid */}
              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0,229,255,0.3)",
                      textAlign: "center",
                      transition: "all 0.3s",
                      "&:hover": {
                        background: "rgba(0,229,255,0.1)",
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,229,255,0.2)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: "2.5rem", fontWeight: 700, color: "#00E5FF", lineHeight: 1 }}>
                      1000
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", mt: 1 }}>
                      GW Available
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0,229,255,0.3)",
                      textAlign: "center",
                      transition: "all 0.3s",
                      "&:hover": {
                        background: "rgba(0,229,255,0.1)",
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,229,255,0.2)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: "2.5rem", fontWeight: 700, color: "#00E5FF", lineHeight: 1 }}>
                      18
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", mt: 1 }}>
                      Months Deploy
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0,229,255,0.3)",
                      textAlign: "center",
                      transition: "all 0.3s",
                      "&:hover": {
                        background: "rgba(0,229,255,0.1)",
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,229,255,0.2)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: "2.5rem", fontWeight: 700, color: "#00E5FF", lineHeight: 1 }}>
                      1000+
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", mt: 1 }}>
                      Sites Ready
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleDemoClick}
                  endIcon={<CalendarMonth />}
                  sx={{
                    py: 2.5,
                    px: 4,
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    borderRadius: "50px",
                    background: "linear-gradient(45deg, #00E5FF 30%, #0090EA 90%) !important",
                    color: "#0a0a0a !important",
                    "&:hover": {
                      background: "linear-gradient(45deg, #00FFE5 30%, #00B8FF 90%) !important",
                      transform: "translateY(-3px) scale(1.02)",
                      boxShadow: "0 20px 50px rgba(0, 229, 255, 0.6)",
                    },
                    boxShadow: "0 10px 30px rgba(0, 229, 255, 0.5)",
                    transition: "all 0.3s ease",
                    width: "100%",
                  }}
                >
                  Schedule Demo
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="/signup"
                  sx={{
                    py: 2.5,
                    px: 4,
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    borderRadius: "50px",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.5)",
                    width: "100%",
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    "&:hover": {
                      borderColor: "#00E5FF",
                      color: "#00E5FF",
                      backgroundColor: "rgba(0, 229, 255, 0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Start Free Trial
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Trust Signals */}
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            animation: mounted ? "fadeIn 1.6s ease-out" : "none",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            A Unique Opportunity for Deploying Data Centers with FERC Order 845
          </Typography>
        </Box>

        {/* Scroll indicator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
              "40%": { transform: "translateY(-20px)" },
              "60%": { transform: "translateY(-10px)" },
            },
          }}
        >
          <KeyboardArrowDownIcon
            sx={{ fontSize: "2.5rem", color: "#00E5FF", opacity: 0.8 }}
          />
        </Box>
      </Container>
      
      {/* Demo Modal */}
      <DemoModal 
        open={demoModalOpen} 
        onClose={() => setDemoModalOpen(false)} 
      />
    </Box>
  );
}