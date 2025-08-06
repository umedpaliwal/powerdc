"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SpeedIcon from '@mui/icons-material/Speed';
import DataCenterIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

            {/* Stats Row */}
            <Grid container spacing={3} sx={{ mb: 4, animation: mounted ? "fadeIn 1.2s ease-out" : "none", "@keyframes fadeIn": { "0%": { opacity: 0 }, "100%": { opacity: 1 } } }}>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#00E5FF" }}>200+</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>GW Available</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#00E5FF" }}>75%</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Cost Savings</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#00E5FF" }}>18</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Months Deploy</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#00E5FF" }}>1000+</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Sites Ready</Typography>
                </Box>
              </Grid>
            </Grid>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 2,
                mb: 3,
                animation: mounted ? "slideInUp 1.4s ease-out" : "none",
                "@keyframes slideInUp": {
                  "0%": { opacity: 0, transform: "translateY(30px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Button
                variant="contained"
                size="large"
                href="/dashboard"
                endIcon={<LaunchIcon />}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  background: "linear-gradient(45deg, #00E5FF 30%, #0090EA 90%)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #00B8D4 30%, #0078C8 90%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(0, 229, 255, 0.4)",
                  },
                  boxShadow: "0 6px 20px rgba(0, 229, 255, 0.3)",
                  transition: "all 0.3s ease",
                  minWidth: "200px",
                }}
              >
                Explore Dashboard
              </Button>

              <Button
                variant="outlined"
                size="large"
                href="/signup"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.5)",
                  minWidth: "200px",
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
          </Grid>

          {/* Right side - Interactive Visual */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                animation: mounted ? "slideInRight 1s ease-out" : "none",
                "@keyframes slideInRight": {
                  "0%": { opacity: 0, transform: "translateX(50px)" },
                  "100%": { opacity: 1, transform: "translateX(0)" },
                },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Animated grid background */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                    animation: "grid 10s linear infinite",
                    "@keyframes grid": {
                      "0%": { transform: "translate(0, 0)" },
                      "100%": { transform: "translate(30px, 30px)" },
                    },
                  }}
                />
                
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography variant="h5" sx={{ color: "#00E5FF", mb: 3, fontWeight: 600 }}>
                    Real-Time Grid Intelligence
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {[
                      { icon: <SpeedIcon />, label: "Fast Track", value: "18 months" },
                      { icon: <DataCenterIcon />, label: "Data Centers", value: "100+ MW" },
                      { icon: <TrendingUpIcon />, label: "Efficiency", value: "99.9%" },
                      { icon: <ElectricBoltIcon />, label: "Grid Ready", value: "1000 GW" },
                    ].map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background: "rgba(0,229,255,0.1)",
                            border: "1px solid rgba(0,229,255,0.3)",
                            transition: "all 0.3s",
                            cursor: "pointer",
                            "&:hover": {
                              background: "rgba(0,229,255,0.2)",
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            {React.cloneElement(item.icon, { sx: { color: "#00E5FF", fontSize: 24, mr: 1 } })}
                            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                              {item.label}
                            </Typography>
                          </Box>
                          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.2rem" }}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
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
            Powered by EIA & NREL Data • FERC Order 845 Compliant
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
    </Box>
  );
}