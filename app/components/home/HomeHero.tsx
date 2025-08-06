"use client";

import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { styled } from "@mui/system";
import Header from "../header";
import Link from "next/link";
import thermalBg from "@public/assets/thermal_bg.webp";
import reBg from "@public/assets/re_bg.webp";

const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  overflow: "hidden",
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
  maxWidth: "800px",
  position: "relative", // Ensure content stays above video
  zIndex: 1, // Bring content to front
}));

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  height: "100%",
  borderRadius: "8px",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Backdrop layer
    zIndex: 0,
  },
}));

const ThermalSection = styled(Section)({
  "&:before": {
    backgroundImage: `url(${thermalBg.src})`,
  },
});

const RenewableSection = styled(Section)({
  "&:before": {
    backgroundImage: `url(${reBg.src})`,
  },
});

export default function HomeHero() {
  return (
    <HeroContainer>
      <Header />
      <ThermalSection>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            zIndex: 1,
            color: "white",
            px: "1rem",
          }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontSize: "3rem",
              fontWeight: "bold",
              lineHeight: {
                xs: 1.2, // Tighter line height on mobile
                sm: 1.3,
              },
              mb: 2,
            }}
          >
            Integrate renewables at existing thermal plants
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: {
                xs: "1rem", // Smaller on mobile
                sm: "1.25rem", // Medium on tablet
                md: "1.5rem", // Full size on desktop
              },
              fontWeight: "normal",
              lineHeight: {
                xs: 1.2, // Tighter line height on mobile
                sm: 1.3,
              },
            }}
          >
            Accelerate cheaper electricity by co-locating new solar and wind at
            existing fossil power plants
          </Typography>
          <Link href="/thermal" passHref legacyBehavior>
            <MuiLink
              component="a"
              sx={{
                mt: "4rem",
                alignSelf: "center",
                width: "fit-content",
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#00838F",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                textAlign: "center",
                cursor: "pointer",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "#006064",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Explore Thermal
            </MuiLink>
          </Link>
        </Box>
      </ThermalSection>
      <RenewableSection>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            zIndex: 1,
            color: "white",
            px: "1rem",
          }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontSize: "3rem",
              fontWeight: "bold",
              lineHeight: {
                xs: 1.2, // Tighter line height on mobile
                sm: 1.3,
              },
              mb: 2,
            }}
          >
            Pair Storage with existing Renewables
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: {
                xs: "1rem", // Smaller on mobile
                sm: "1.25rem", // Medium on tablet
                md: "1.5rem", // Full size on desktop
              },
              fontWeight: "normal",
              lineHeight: {
                xs: 1.2, // Tighter line height on mobile
                sm: 1.3,
              },
            }}
          >
            Improve resiliency and meet peak demand by adding energy storage to
            existing renewable sites
          </Typography>
          <Link href="/re" passHref legacyBehavior>
            <MuiLink
              component="a"
              sx={{
                mt: "4rem",
                alignSelf: "center",
                width: "fit-content",
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#00838F",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                textAlign: "center",
                cursor: "pointer",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "#006064",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Explore Renewable
            </MuiLink>
          </Link>
        </Box>
      </RenewableSection>
    </HeroContainer>
  );
}
