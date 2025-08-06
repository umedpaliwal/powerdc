"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function TimelineComparison() {
  const [isVisible, setIsVisible] = useState(false);
  const [traditionalProgress, setTraditionalProgress] = useState(0);
  const [surplusProgress, setSurplusProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineElement = document.getElementById("timeline-comparison");
    if (timelineElement) {
      observer.observe(timelineElement);
    }

    return () => {
      if (timelineElement) {
        observer.unobserve(timelineElement);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Start progress animations with delay
      setTimeout(() => {
        setTraditionalProgress(100);
      }, 500);
      
      setTimeout(() => {
        setSurplusProgress(100);
      }, 800);
    }
  }, [isVisible]);

  return (
    <>
      <style jsx global>{`
        .timeline-comparison {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .timeline-comparison.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      
      <Card
        id="timeline-comparison"
        className="timeline-comparison"
        sx={{
          bgcolor: "rgba(0,20,40,0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(142,202,230,0.3)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          height: "100%",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#8ecae6",
              textAlign: "center",
              fontSize: { xs: "1.5rem", md: "1.8rem" },
            }}
          >
            Deployment Timeline Comparison
          </Typography>

          <Stack spacing={4}>
            {/* Traditional Route */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <AccessTimeIcon sx={{ color: "#ff6b6b", fontSize: 32 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      mb: 0.5,
                    }}
                  >
                    Traditional Interconnection
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    New grid connection, full study process
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#ff6b6b",
                  }}
                >
                  5-6 Years
                </Typography>
              </Stack>

              {/* Timeline visualization */}
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <Box
                      key={i}
                      sx={{
                        flex: 1,
                        height: 8,
                        bgcolor: i < 5 ? "#ff6b6b" : "rgba(255,107,107,0.3)",
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={traditionalProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(255,107,107,0.2)",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#ff6b6b",
                      borderRadius: 4,
                      transition: "transform 2s ease-in-out",
                    },
                  }}
                />
              </Box>

              <Stack direction="row" spacing={2} sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                <span>2025</span>
                <span>2026</span>
                <span>2027</span>
                <span>2028</span>
                <span>2029</span>
                <span>2030+</span>
              </Stack>
            </Box>

            {/* Divider */}
            <Box
              sx={{
                height: 1,
                bgcolor: "rgba(255,255,255,0.1)",
                my: 2,
              }}
            />

            {/* Surplus Route */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <FlashOnIcon sx={{ color: "#4caf50", fontSize: 32 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      mb: 0.5,
                    }}
                  >
                    Surplus Interconnection
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Behind-the-meter, existing connection
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#4caf50",
                  }}
                >
                  1-2 Years
                </Typography>
              </Stack>

              {/* Timeline visualization */}
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <Box
                      key={i}
                      sx={{
                        flex: 1,
                        height: 8,
                        bgcolor: i < 2 ? "#4caf50" : "rgba(76,175,80,0.2)",
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  <CheckCircleIcon 
                    sx={{ 
                      color: "#4caf50", 
                      fontSize: 20,
                      ml: 1,
                    }} 
                  />
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={surplusProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(76,175,80,0.2)",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#4caf50",
                      borderRadius: 4,
                      transition: "transform 2s ease-in-out",
                    },
                  }}
                />
              </Box>

              <Stack direction="row" spacing={2} sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                <span>2025</span>
                <span>2026</span>
                <span style={{ color: "#4caf50", fontWeight: 600 }}>DEPLOYED</span>
                <span>2028</span>
                <span>2029</span>
                <span>2030</span>
              </Stack>
            </Box>
          </Stack>

          {/* Bottom highlight */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "rgba(76,175,80,0.1)",
              borderRadius: 2,
              border: "1px solid rgba(76,175,80,0.2)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#81c784",
                fontWeight: 600,
              }}
            >
              Deploy AI infrastructure 3-4 years faster
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}