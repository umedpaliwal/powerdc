"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video slightly
      videoRef.current.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "120vh" /* Increased height */,
        overflow: "hidden",
        backgroundColor: "#001220",
      }}
    >
      {/* Video background */}
      <Box
        sx={{ position: "absolute", width: "100%", height: "100%", zIndex: 0 }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4,
            filter: "brightness(0.7)",
          }}
        >
          <source src="/assets/re/video_re_dashboard.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Content overlay */}
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, pt: 20, pb: 12 }}
      >
        <Grid container>
          {/* Hero Text and CTA */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Box
              sx={{
                maxWidth: { xs: "100%", md: "90%" },
                margin: { xs: "auto", md: "0" },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3.2rem",
                    md: "3.8rem",
                    lg: "4.2rem",
                  },
                  fontWeight: 800,
                  color: "#fff",
                  mb: 3,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                Deploy Your Data Center in 18 Months, Not 5 Years
              </Typography>
            </Box>

            <Box
              sx={{
                maxWidth: { xs: "100%", md: "90%" },
                margin: { xs: "auto", md: "0" },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
                  fontWeight: 500,
                  color: "#D1F0FF",
                  mb: 4,
                  letterSpacing: "-0.3px",
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  lineHeight: 1.4,
                }}
              >
                Access 1,000 GW of ready grid capacity. Skip the 5-year interconnection queue with surplus interconnection.
              </Typography>
            </Box>

            {/* Prominent Dashboard Button */}
            <Box
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
                mb: 4,
              }}
            >
              <Button
                variant="contained"
                size="large"
                href="/dashboard"
                endIcon={<LaunchIcon />}
                sx={{
                  py: 2.5,
                  px: 5,
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  borderRadius: "12px",
                  backgroundColor: "#0090EA",
                  "&:hover": {
                    backgroundColor: "#0078C8",
                    transform: "translateY(-2px)",
                  },
                  boxShadow: "0 6px 20px rgba(0, 144, 234, 0.5)",
                  transition: "all 0.3s ease",
                  display: "inline-block",
                }}
              >
                Explore Live Dashboard
              </Button>
            </Box>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 2,
                mb: 3,
              }}
            >
              <Button
                variant="contained"
                size="large"
                href="/signup"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  backgroundColor: "#00C853",
                  "&:hover": {
                    backgroundColor: "#00A047",
                  },
                  boxShadow: "0 4px 14px rgba(0, 200, 83, 0.4)",
                  minWidth: "160px",
                }}
              >
                Start Free Trial
              </Button>

              <Button
                variant="outlined"
                size="large"
                href="#demo"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  color: "#fff",
                  borderColor: "#fff",
                  minWidth: "160px",
                  "&:hover": {
                    borderColor: "#D1F0FF",
                    color: "#D1F0FF",
                    backgroundColor: "rgba(209, 240, 255, 0.05)",
                  },
                }}
              >
                View Demo
              </Button>
            </Box>

            {/* Trust Signals */}
            <Box
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
                mt: 4,
                mb: 10,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#B3D9FF",
                  opacity: 0.9,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Powered by EIA & NREL Data
              </Typography>
            </Box>
          </Grid>
        </Grid>

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
            sx={{ fontSize: "3rem", color: "white", opacity: 0.8 }}
          />
        </Box>
      </Container>
    </Box>
  );
}
