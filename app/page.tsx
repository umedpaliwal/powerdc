"use client";

import { Box, CssBaseline } from "@mui/material";
import HeroSection from "./components/new-home/HeroSection";
import DataCenterCrisisSection from "./components/home/DataCenterCrisisSection";
import ProblemSolutionSection from "./components/new-home/ProblemSolutionSection";
import SchematicDiagram from "./components/home/SchematicDiagram";
import TimelineComparison from "./components/home/TimelineComparison";

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
          <DataCenterCrisisSection />
          <ProblemSolutionSection />
          <SchematicDiagram />
          <TimelineComparison />
        </Box>
      </Box>
    </main>
  );
}
