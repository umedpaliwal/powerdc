"use client";

import BoltIcon from "@mui/icons-material/Bolt";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StorageIcon from "@mui/icons-material/Storage";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef } from "react";
import StatisticCard from "./StatisticCard";
import TimelineComparison from "./TimelineComparison";

export default function DataCenterCrisisSection() {
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

  const statistics = [
    {
      icon: <BoltIcon sx={{ fontSize: 48 }} />,
      value: 500,
      unit: "TWh",
      label: "AI Data Center Demand",
      description: "Projected energy demand by 2030",
      color: "#ff9800",
    },
    {
      icon: <StorageIcon sx={{ fontSize: 48 }} />,
      value: 2500,
      unit: "GW",
      label: "Capacity in Queue",
      description: "Stuck in interconnection bottlenecks",
      color: "#f44336",
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 48 }} />,
      value: "5-6",
      unit: "Years",
      label: "Average Wait Time",
      description: "For new grid connections",
      animate: false,
      color: "#ff6b6b",
    },
    {
      icon: <DataUsageIcon sx={{ fontSize: 48 }} />,
      value: "65-90",
      unit: "GW",
      label: "Data Center Capacity",
      description: "Needed by 2029 for AI growth",
      animate: false,
      color: "#2196f3",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      value: 128,
      unit: "GW",
      label: "Total Load Growth",
      description: "US forecast 2025-2029",
      color: "#4caf50",
    },
    {
      icon: <WarningIcon sx={{ fontSize: 48 }} />,
      value: 64,
      unit: "%",
      label: "Coverage Gap",
      description: "Only this much peak load growth covered",
      color: "#ff5722",
    },
  ];

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

        .crisis-glow {
          animation: crisisGlow 4s ease-in-out infinite alternate;
        }

        @keyframes crisisGlow {
          from {
            text-shadow: 0 0 20px rgba(255,152,0,0.3);
          }
          to {
            text-shadow: 0 0 30px rgba(255,152,0,0.5), 0 0 40px rgba(255,152,0,0.2);
          }
        }
      `}</style>
      
      <Box
        id="data-center-crisis"
        ref={sectionRef}
        sx={{
          py: { xs: 10, md: 12 },
          background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          position: "relative",
          overflow: "hidden",
          color: "white",
        }}
      >
        {/* Background decorations */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "-10%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,152,0,0.08) 0%, rgba(255,152,0,0) 70%)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            left: "-15%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(244,67,54,0.06) 0%, rgba(244,67,54,0) 70%)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Section Header */}
          <Box sx={{ mb: 8, textAlign: "center" }}>
            <Typography
              variant="h2"
              className="fade-in-section crisis-glow"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#ff9800",
                maxWidth: "900px",
                mx: "auto",
                fontSize: { xs: "2.2rem", md: "2.8rem" },
              }}
            >
              America's AI Infrastructure Bottleneck
            </Typography>
            <Typography
              variant="h5"
              className="fade-in-section"
              sx={{
                color: "rgba(255,255,255,0.8)",
                maxWidth: "800px",
                mx: "auto",
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                lineHeight: 1.5,
              }}
            >
              The grid can't keep pace with AI's explosive growth. Critical infrastructure is trapped in decade-long queues while the digital economy waits.
            </Typography>
          </Box>

          {/* Statistics Grid */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {statistics.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={stat.label}>
                <Box className="fade-in-section" sx={{ height: "100%" }}>
                  <StatisticCard
                    icon={stat.icon}
                    value={stat.value}
                    unit={stat.unit}
                    label={stat.label}
                    description={stat.description}
                    animate={stat.animate !== false}
                    color={stat.color}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Timeline Comparison */}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box className="fade-in-section">
                <TimelineComparison />
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Call to Action */}
          <Box
            className="fade-in-section"
            sx={{
              mt: 6,
              p: 4,
              bgcolor: "rgba(255,152,0,0.1)",
              borderRadius: 3,
              border: "2px solid rgba(255,152,0,0.3)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background pulse effect */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(45deg, rgba(255,152,0,0.1) 0%, rgba(244,67,54,0.1) 100%)",
                animation: "pulse 3s ease-in-out infinite",
                zIndex: 0,
              }}
            />
            
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#ff9800",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                The Solution: Surplus Interconnection
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: "600px",
                  mx: "auto",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  lineHeight: 1.4,
                }}
              >
                Deploy clean AI infrastructure in 1-2 years using existing grid connections at underutilized power plants
              </Typography>
            </Box>
          </Box>
        </Container>

        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
        `}</style>
      </Box>
    </>
  );
}