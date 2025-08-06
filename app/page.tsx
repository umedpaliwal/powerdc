"use client";

import { Box, CssBaseline } from "@mui/material";
import ApproachSection from "./components/new-home/ApproachSection";
import HeroSection from "./components/new-home/HeroSection";
import ProblemSolutionSection from "./components/new-home/ProblemSolutionSection";

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
        {/* <Header /> */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <HeroSection />
          <ProblemSolutionSection />
          <ApproachSection />
        </Box>
        {/* <Footer /> */}
      </Box>
    </main>
  );
}
