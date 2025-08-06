"use client";

import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import Header from "./header";

const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/gasplant.jpeg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
}));

const VideoBackground = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  "& video": {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const HeroContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "0 20px",
  width: "100%",
}));

export default function Hero() {
  return (
    <HeroContainer>
      <VideoBackground>
        <video autoPlay muted loop playsInline>
          <source src="/Video_Surplus_Interconnection.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoBackground>
      <Overlay />
      <Header />
      <HeroContent>
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontSize: {
              xs: "2.5rem", // Smaller on mobile
              sm: "3.5rem", // Medium on tablet
              md: "4rem", // Full size on desktop
            },
            fontWeight: "bold",
            lineHeight: {
              xs: 1.2, // Tighter line height on mobile
              sm: 1.3,
            },
            mb: 2,
          }}
        >
          From Scarcity to <p style={{ padding: 0, margin: 0 }}>Surplus</p>
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.25rem", // Smaller on mobile
              sm: "1.5rem", // Medium on tablet
              md: "2rem", // Full size on desktop
            },
            mb: 4,
            opacity: 0.9,
          }}
        >
          Accelerating access to cheap clean electricity
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: { xs: "wrap", sm: "nowrap" }, // Stack on mobile, side by side otherwise
          }}
        >
          <Link
            href="/dashboard"
            sx={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#00838F",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              width: { xs: "100%", sm: "auto" }, // Full width on mobile
              textAlign: "center",
              "&:hover": {
                backgroundColor: "#006064",
                transform: "translateY(-2px)",
              },
            }}
          >
            Explore Dashboard
          </Link>
          <Link
            href="https://surplusinterconnection.s3.us-east-1.amazonaws.com/2025-02-21_GridLab_Surplus_Interconnection_Technical_Paper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#00838F",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              width: { xs: "100%", sm: "auto" }, // Full width on mobile
              textAlign: "center",
              "&:hover": {
                backgroundColor: "#006064",
                transform: "translateY(-2px)",
              },
            }}
          >
            Technical Report
          </Link>
          <Link
            href="https://surplusinterconnection.s3.us-east-1.amazonaws.com/GridLab_Surplus_Interconnection_Issue_Brief.pdf"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#00838F",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              width: { xs: "100%", sm: "auto" }, // Full width on mobile
              textAlign: "center",
              "&:hover": {
                backgroundColor: "#006064",
                transform: "translateY(-2px)",
              },
            }}
          >
            Issue Brief
          </Link>
          <Link
            href="https://surplusinterconnection.s3.us-east-1.amazonaws.com/2025-02-21_GridLab_Surplus_Interconnection_Barriers_Report.pdf "
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#00838F",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              width: { xs: "100%", sm: "auto" },
              textAlign: "center",
              "&:hover": {
                backgroundColor: "#006064",
                transform: "translateY(-2px)",
              },
            }}
          >
            Barriers and Recommendations
          </Link>
        </Box>
      </HeroContent>
    </HeroContainer>
  );
}
