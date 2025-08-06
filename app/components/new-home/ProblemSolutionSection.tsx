"use client";

import BoltIcon from "@mui/icons-material/Bolt";
import PolicyIcon from "@mui/icons-material/Policy";
import SavingsIcon from "@mui/icons-material/Savings";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SpeedIcon from "@mui/icons-material/Speed";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef } from "react";

export default function ProblemSolutionSection() {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-section");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("is-visible");
              }, 100 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      id="problem-solution"
      ref={sectionRef}
      sx={{
        py: { xs: 10, md: 12 },
        background: "linear-gradient(135deg, #011B29 0%, #01304D 100%)",
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "-5%",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(58,134,255,0.12) 0%, rgba(58,134,255,0) 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "-10%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(33,158,188,0.12) 0%, rgba(33,158,188,0) 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            className="fade-in-section"
            sx={{
              fontWeight: 700,
              mb: 6,
              color: "white",
              textShadow: "0 0 20px rgba(0,195,255,0.2)",
              maxWidth: "900px",
              mx: "auto",
              fontSize: "1.75rem",
            }}
          >
            The U.S. race to power AI innovation and reshore domestic
            manufacturing faces a critical roadblock
          </Typography>
        </Box>

        {/* PROBLEM AND SOLUTION SECTION - SIDE BY SIDE */}
        <Grid
          container
          spacing={4}
          sx={{ display: "flex", alignItems: "stretch" }}
        >
          {/* LEFT SIDE: THE PROBLEM */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              className="fade-in-section"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: "1.75rem",
                position: "relative",
                color: "white",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -12,
                  width: 50,
                  height: 3,
                  borderRadius: 2,
                  background:
                    "linear-gradient(90deg, #3a86ff 0%, #219ebc 100%)",
                },
              }}
            >
              The Problem
            </Typography>

            <Card
              className="fade-in-section"
              sx={{
                bgcolor: "rgba(0,20,40,0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(72,202,228,0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                mt: 4,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ mb: 2, alignItems: "center" }}
                  >
                    <BoltIcon sx={{ fontSize: 28, color: "#48cae4" }} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: "white",
                      }}
                    >
                      Unprecedented Demand Surge
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.9rem",
                      mb: 2,
                      lineHeight: 1.5,
                      color: "white",
                      fontWeight: 400,
                    }}
                  >
                    U.S. load forecasts have surged fivefold to{" "}
                    <strong style={{ color: "#48cae4" }}>
                      128 GW from 2025-2029
                    </strong>
                    , driven by data centers (65-90+ GW), manufacturing, and
                    electrification.
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(72,202,228,0.2)" }} />

                <Box sx={{ mb: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ mb: 2, alignItems: "center" }}
                  >
                    <WarningAmberIcon sx={{ fontSize: 28, color: "#48cae4" }} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: "white",
                      }}
                    >
                      Capacity Addition Shortfall
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.9rem",
                      mb: 2,
                      lineHeight: 1.5,
                      color: "white",
                      fontWeight: 400,
                    }}
                  >
                    Planned firm capacity additions will cover only{" "}
                    <strong style={{ color: "#48cae4" }}>
                      64% of projected peak load growth
                    </strong>{" "}
                    through 2029. New gas plants face 5-8 year delays due to
                    equipment shortages and permitting, putting them online no
                    earlier than 2030-2032—too late for immediate needs.
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(72,202,228,0.2)" }} />

                <Box>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ mb: 2, alignItems: "center" }}
                  >
                    <SettingsEthernetIcon
                      sx={{ fontSize: 28, color: "#48cae4" }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: "white",
                      }}
                    >
                      Grid Connection Bottlenecks
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.9rem",
                      mb: 2,
                      lineHeight: 1.5,
                      color: "white",
                      fontWeight: 400,
                    }}
                  >
                    Over 2,500 GW of capacity is stuck in interconnection queues
                    with 5-6 year waits and rapidly rising costs. High-voltage
                    transformer shortages, transmission upgrade timelines, and
                    grid study delays extend deployment by years. Without
                    solutions bypassing these bottlenecks, the U.S. faces higher
                    electricity prices and constrained economic growth.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT SIDE: THE SOLUTION */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              className="fade-in-section"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: "1.75rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -12,
                  width: 50,
                  height: 3,
                  borderRadius: 2,
                  background:
                    "linear-gradient(90deg, #8ecae6 0%, #219ebc 100%)",
                },
              }}
            >
              The Solution: Surplus Interconnection
            </Typography>

            <Card
              className="fade-in-section"
              sx={{
                bgcolor: "rgba(0,40,80,0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(142,202,230,0.3)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                mt: 4,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "#8ecae6",
                      fontSize: "1.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PolicyIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                    What is Surplus Interconnection?
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.9rem",
                      mb: 0,
                      lineHeight: 1.5,
                      color: "white",
                      fontWeight: 400,
                    }}
                  >
                    Surplus Interconnection Service allows new electricity
                    supply resources to connect to the grid using existing
                    infrastructure that serves already operating generators,
                    without exceeding the total output capacity already
                    allocated to the existing resource. FERC Order 845 (2018)
                    cleared a regulatory pathway for generators to add new
                    electricity resources to the grid by utilizing surplus
                    capacity at existing interconnection points.
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(142,202,230,0.2)" }} />

                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "#8ecae6",
                      fontSize: "1.2rem",
                    }}
                  >
                    Key Results
                  </Typography>

                  <Box sx={{ mb: 2.5 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: "#8ecae6",
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SpeedIcon sx={{ fontSize: "1rem", mr: 1 }} />
                      Massive Clean Energy Capacity
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                        color: "white",
                        ml: 2,
                        fontWeight: 400,
                      }}
                    >
                      Combined potential to integrate{" "}
                      <strong style={{ color: "#8ecae6" }}>1,339 GW</strong> of
                      clean energy capacity (
                      <strong style={{ color: "#8ecae6" }}>977 GW</strong> near
                      thermal plants +{" "}
                      <strong style={{ color: "#8ecae6" }}>362 GW</strong> near
                      RE sites), nearly doubling U.S. generation capacity.
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: "#8ecae6",
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SavingsIcon sx={{ fontSize: "1rem", mr: 1 }} />
                      Firm Capacity & Cost Savings
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                        color: "white",
                        ml: 2,
                        fontWeight: 400,
                      }}
                    >
                      Adds <strong style={{ color: "#8ecae6" }}>256 GW</strong>{" "}
                      of firm battery capacity. Saves approximately{" "}
                      <strong style={{ color: "#8ecae6" }}>$89 billion</strong>{" "}
                      in avoided grid upgrade costs by reusing existing
                      interconnection infrastructure.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
