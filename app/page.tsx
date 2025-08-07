"use client";

import { Box, Container, CssBaseline } from "@mui/material";
import HeroSection from "./components/new-home/HeroSection";
import DataCenterCrisisSection from "./components/home/DataCenterCrisisSection";
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
          <SchematicDiagram />
          <Box sx={{ 
            py: { xs: 8, md: 10 },
            background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          }}>
            <Container maxWidth="lg" sx={{ maxWidth: "85%" }}>
              <TimelineComparison />
            </Container>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
