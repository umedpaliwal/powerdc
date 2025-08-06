"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface StatisticCardProps {
  icon: React.ReactNode;
  value: string | number;
  unit?: string;
  label: string;
  description?: string;
  animate?: boolean;
  color?: string;
}

export default function StatisticCard({
  icon,
  value,
  unit,
  label,
  description,
  animate = true,
  color = "#8ecae6",
}: StatisticCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animate && isVisible && typeof value === "number") {
      const increment = value / 50; // Animation over ~50 frames
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [value, animate, isVisible]);

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

    const cardElement = document.getElementById(`stat-card-${label.replace(/\s+/g, '-')}`);
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, [label]);

  const formatValue = () => {
    if (typeof value === "number" && animate) {
      return displayValue;
    }
    return value;
  };

  return (
    <>
      <style jsx global>{`
        .stat-card {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-card.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .stat-value {
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-value {
          transform: scale(1.05);
        }
      `}</style>
      
      <Card
        id={`stat-card-${label.replace(/\s+/g, '-')}`}
        className="stat-card"
        sx={{
          bgcolor: "rgba(0,30,50,0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${color}40`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          height: "100%",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: `0 20px 40px ${color}15`,
            transition: "all 0.3s ease",
            border: `1px solid ${color}60`,
          },
        }}
      >
        <CardContent sx={{ p: 3, textAlign: "center", height: "100%" }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ color: color, mb: 1.5 }}>
              {icon}
            </Box>
            
            <Box className="stat-value" sx={{ mb: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: color,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  lineHeight: 1,
                  textShadow: `0 0 20px ${color}30`,
                }}
              >
                {formatValue()}
                {unit && (
                  <Typography
                    component="span"
                    variant="h3"
                    sx={{
                      fontWeight: 600,
                      color: color,
                      fontSize: { xs: "1.5rem", md: "1.8rem" },
                      ml: 0.5,
                    }}
                  >
                    {unit}
                  </Typography>
                )}
              </Typography>
            </Box>
            
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "white",
                mb: description ? 1 : 0,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              {label}
            </Typography>
            
            {description && (
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.4,
                  fontSize: { xs: "0.85rem", md: "0.9rem" },
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}