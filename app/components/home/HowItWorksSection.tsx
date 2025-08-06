"use client";

import BoltIcon from "@mui/icons-material/Bolt";
import BuildIcon from "@mui/icons-material/Build";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef } from "react";
import BehindTheMeterDiagram from "./BehindTheMeterDiagram";

export default function HowItWorksSection() {
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
              }, 150 * index);
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
    <>
      <style jsx global>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .power-flow-animation {
          animation: powerFlow 3s infinite;
        }

        @keyframes powerFlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
      
      <Box
        id="how-it-works"
        ref={sectionRef}
        sx={{
          py: { xs: 10, md: 12 },
          background: "linear-gradient(180deg, #001220 0%, #002B47 100%)",
          position: "relative",
          overflow: "hidden",
          color: "white",
        }}
      >
        {/* Background decorations */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "-5%",
            width: "35%",
            height: "35%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(142,202,230,0.08) 0%, rgba(142,202,230,0) 70%)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "-10%",
            width: "45%",
            height: "45%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(58,134,255,0.08) 0%, rgba(58,134,255,0) 70%)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Section Header */}
          <Box sx={{ mb: 8, textAlign: "center" }}>
            <Typography
              variant="h2"
              className="fade-in-section"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "white",
                textShadow: "0 0 20px rgba(142,202,230,0.3)",
                maxWidth: "900px",
                mx: "auto",
                fontSize: { xs: "2.2rem", md: "2.8rem" },
              }}
            >
              The Behind-the-Meter Advantage
            </Typography>
            <Typography
              variant="h5"
              className="fade-in-section"
              sx={{
                color: "rgba(255,255,255,0.8)",
                maxWidth: "700px",
                mx: "auto",
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                lineHeight: 1.5,
              }}
            >
              Deploy data centers 95% clean with existing grid connections
            </Typography>
          </Box>

          {/* Main Content Grid */}
          <Grid container spacing={4} alignItems="stretch">
            {/* Configuration Setup - Left Column */}
            <Grid item xs={12} lg={4}>
              <Card
                className="fade-in-section"
                sx={{
                  bgcolor: "rgba(0,30,50,0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(142,202,230,0.2)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 40px rgba(142,202,230,0.15)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <CardContent sx={{ p: 3, height: "100%" }}>
                  <Stack spacing={2} sx={{ height: "100%" }}>
                    <Box sx={{ textAlign: "center" }}>
                      <BuildIcon
                        sx={{
                          fontSize: 48,
                          color: "#8ecae6",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#8ecae6",
                          fontSize: "1.5rem",
                        }}
                      >
                        Configuration Setup
                      </Typography>
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack spacing={2.5}>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              color: "white",
                              fontSize: "1rem",
                            }}
                          >
                            Behind-the-Meter Placement
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              lineHeight: 1.6,
                            }}
                          >
                            Data center positioned behind existing gas plant
                            interconnection, leveraging pre-approved grid access
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              color: "white",
                              fontSize: "1rem",
                            }}
                          >
                            Oversized Solar Array
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              lineHeight: 1.6,
                            }}
                          >
                            Solar capacity sized beyond data center needs to
                            maximize clean energy generation during peak hours
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              color: "white",
                              fontSize: "1rem",
                            }}
                          >
                            16-Hour Battery Storage
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              lineHeight: 1.6,
                            }}
                          >
                            Extended duration battery system providing overnight
                            operations and weather resilience
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* How It Works - Center Column with Diagram */}
            <Grid item xs={12} lg={4}>
              <Card
                className="fade-in-section"
                sx={{
                  bgcolor: "rgba(0,40,80,0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(58,134,255,0.3)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 40px rgba(58,134,255,0.15)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <CardContent sx={{ p: 3, height: "100%" }}>
                  <Stack spacing={3} sx={{ height: "100%" }}>
                    <Box sx={{ textAlign: "center" }}>
                      <BoltIcon
                        sx={{
                          fontSize: 48,
                          color: "#3a86ff",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#3a86ff",
                          fontSize: "1.5rem",
                        }}
                      >
                        How It Works
                      </Typography>
                    </Box>

                    {/* Diagram Container */}
                    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                      <BehindTheMeterDiagram />
                    </Box>

                    {/* Power Flow Stats */}
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Box>
                          <Typography
                            variant="h3"
                            sx={{
                              fontWeight: 800,
                              color: "#00C853",
                              fontSize: "2rem",
                            }}
                          >
                            95%
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "rgba(255,255,255,0.8)" }}
                          >
                            Solar + Battery
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="h3"
                            sx={{
                              fontWeight: 800,
                              color: "#FF9800",
                              fontSize: "2rem",
                            }}
                          >
                            5%
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "rgba(255,255,255,0.8)" }}
                          >
                            Gas Backup
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Key Benefits - Right Column */}
            <Grid item xs={12} lg={4}>
              <Card
                className="fade-in-section"
                sx={{
                  bgcolor: "rgba(0,50,30,0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(76,175,80,0.3)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 40px rgba(76,175,80,0.15)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <CardContent sx={{ p: 3, height: "100%" }}>
                  <Stack spacing={2} sx={{ height: "100%" }}>
                    <Box sx={{ textAlign: "center" }}>
                      <TrendingUpIcon
                        sx={{
                          fontSize: 48,
                          color: "#4caf50",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#4caf50",
                          fontSize: "1.5rem",
                        }}
                      >
                        Key Benefits
                      </Typography>
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack spacing={2.5}>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <SpeedIcon sx={{ fontSize: 20, color: "#4caf50" }} />
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: "white",
                                fontSize: "1rem",
                              }}
                            >
                              Rapid Deployment
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              lineHeight: 1.6,
                              ml: 3,
                            }}
                          >
                            1-2 year deployment timeline vs 5+ years for new
                            interconnection
                          </Typography>
                        </Box>

                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <BoltIcon sx={{ fontSize: 20, color: "#4caf50" }} />
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: "white",
                                fontSize: "1rem",
                              }}
                            >
                              95% Clean Energy
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              lineHeight: 1.6,
                              ml: 3,
                            }}
                          >
                            Majority renewable power with minimal gas backup for
                            reliability
                          </Typography>
                        </Box>

                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <BuildIcon sx={{ fontSize: 20, color: "#4caf50" }} />
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: "white",
                                fontSize: "1rem",
                              }}
                            >
                              Existing Connection
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              lineHeight: 1.6,
                              ml: 3,
                            }}
                          >
                            Leverages pre-approved grid infrastructure and
                            transmission capacity
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            bgcolor: "rgba(76,175,80,0.1)",
                            borderRadius: 2,
                            p: 2,
                            border: "1px solid rgba(76,175,80,0.2)",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#81c784",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            Skip the interconnection queue entirely
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}