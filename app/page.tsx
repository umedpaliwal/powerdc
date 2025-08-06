"use client";

import { Box, CssBaseline } from "@mui/material";
import HeroSection from "./components/new-home/HeroSection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import DataCenterCrisisSection from "./components/home/DataCenterCrisisSection";

export default function Home() {
  return (
    <main>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        <Box component="main" sx={{ flexGrow: 1 }}>
          <HeroSection />
          <HowItWorksSection />
          <DataCenterCrisisSection />
        </Box>
      </Box>
    </main>
  );
}
