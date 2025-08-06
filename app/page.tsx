"use client";

import { Box, CssBaseline } from "@mui/material";
import ApproachSection from "./components/new-home/ApproachSection";
import HeroSection from "./components/new-home/HeroSection";
import ProblemSolutionSection from "./components/new-home/ProblemSolutionSection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import DataCenterCrisisSection from "./components/home/DataCenterCrisisSection";
import ComparisonTable from "./components/home/ComparisonTable";

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
          <HowItWorksSection />
          <DataCenterCrisisSection />
          <ComparisonTable />
          <ProblemSolutionSection />
          <ApproachSection />
        </Box>
        {/* <Footer /> */}
      </Box>
    </main>
  );
}
