"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";

const theme = createTheme();

const SectionContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(12, 0),
  background: "#00838F",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  padding: theme.spacing(0, 2),
}));

const FindingBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderLeft: "2px solid rgba(255, 255, 255, 0.2)",
  "&:first-of-type": {
    borderLeft: "none",
  },
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const NumberCircle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "white",
  color: "#00838F",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginBottom: theme.spacing(2),
}));

export default function Findings() {
  const findings = [
    {
      number: "1",
      title: "Abundant Local Resources",
      description:
        "Over 15,400 GW of renewable energy can be built within just 6 miles of existing fossil fuel plants. Most plants (90%) have enough nearby land to build 5 times their current capacity in renewables.",
      highlight: "15,400 GW",
    },
    {
      number: "2",
      title: "Cost-Effective Today",
      description:
        "At 75% of existing fossil plants (700 GW), building new solar is already cheaper than running the existing plant. For wind, this is true at 80% of plants. By 2030, this will be true almost everywhere.",
      highlight: "75% Viable",
    },
    {
      number: "3",
      title: "Ready for Renewables",
      description:
        "977 GW of solar and wind can be added to existing grid connections by 2030 - nearly doubling US electricity generation capacity.",
      highlight: "977 GW by 2030",
    },
    {
      number: "4",
      title: "Nationwide Solution",
      description:
        "In 38 states, the majority of newclean electricity demand by 2030 can be met by building solar and wind near existing interconnection. 775 gigawatts can be added through this according to the least-cost power system modeling.",
      highlight: "38 States",
    },
    {
      number: "5",
      title: "Quick Wins Available",
      description:
        "Over 200 GW of fossil plants are barely used (running less than 15% of the time) and cost $20/MWh more to operate than typical plants - making them prime candidates for renewable additions.",
      highlight: "200 GW Ready",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="findings">
        <ContentContainer>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              color: "white",
              textAlign: "center",
              mb: 8,
              fontSize: "2.5rem",
            }}
          >
            Key Research Findings
          </Typography>

          <Grid container spacing={0}>
            {findings.map((finding, index) => (
              <Grid item xs={12} md={2.4} key={index}>
                <FindingBox>
                  <NumberCircle>{finding.number}</NumberCircle>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {finding.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#4fc3f7",
                      my: 2,
                      fontWeight: "bold",
                    }}
                  >
                    {finding.highlight}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white", mb: 3 }}>
                    {finding.description}
                  </Typography>
                </FindingBox>
              </Grid>
            ))}
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
}
