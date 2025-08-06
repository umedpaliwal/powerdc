"use client";

import {
  Box,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import ComparisonRow from "./ComparisonRow";

export default function ComparisonTable() {
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

  const comparisonData = [
    {
      category: "Turbine Delivery",
      gasPlant: { value: "5-6 year backlog", status: "bad" as const },
      surplus: { value: "Already installed", status: "good" as const },
      tooltip: "Gas turbines face severe manufacturing bottlenecks",
    },
    {
      category: "Grid Studies",
      gasPlant: { value: "2-3 years", status: "bad" as const },
      surplus: { value: "Expedited (6 months)", status: "good" as const },
      tooltip: "Interconnection studies required for new connections",
    },
    {
      category: "Transmission Upgrades",
      gasPlant: { value: "Required ($10M+)", status: "bad" as const },
      surplus: { value: "Uses existing", status: "good" as const },
      tooltip: "New connections often require expensive grid upgrades",
    },
    {
      category: "Transformer Wait",
      gasPlant: { value: "2-4 years", status: "bad" as const },
      surplus: { value: "Already in place", status: "good" as const },
      tooltip: "Critical transformer shortages causing major delays",
    },
    {
      category: "Permitting",
      gasPlant: { value: "Complex new facility", status: "bad" as const },
      surplus: { value: "Add-on to existing", status: "good" as const },
      tooltip: "Environmental and safety permits for new plants",
    },
    {
      category: "Total Timeline",
      gasPlant: { value: "5-8 years", status: "bad" as const },
      surplus: { value: "1-2 years", status: "good" as const },
      tooltip: "End-to-end deployment timeline comparison",
    },
    {
      category: "Carbon Profile",
      gasPlant: { value: "100% fossil", status: "bad" as const },
      surplus: { value: "95% clean energy", status: "good" as const },
      tooltip: "Environmental impact comparison",
    },
    {
      category: "Stranded Asset Risk",
      gasPlant: { value: "High", status: "bad" as const },
      surplus: { value: "Flexible, modular", status: "good" as const },
      tooltip: "Risk of investment becoming obsolete",
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

        .table-glow {
          box-shadow: 0 0 30px rgba(142,202,230,0.1);
          transition: all 0.3s ease;
        }

        .table-glow:hover {
          box-shadow: 0 0 40px rgba(142,202,230,0.2);
        }
      `}</style>
      
      <Box
        id="gas-plant-comparison"
        ref={sectionRef}
        sx={{
          py: { xs: 10, md: 12 },
          background: "linear-gradient(180deg, #16213e 0%, #0f172a 50%, #1e1b4b 100%)",
          position: "relative",
          overflow: "hidden",
          color: "white",
        }}
      >
        {/* Background decorations */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "-20%",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(76,175,80,0.06) 0%, rgba(76,175,80,0) 70%)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            right: "-25%",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,152,0,0.05) 0%, rgba(255,152,0,0) 70%)",
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
                color: "#8ecae6",
                textShadow: "0 0 20px rgba(142,202,230,0.3)",
                maxWidth: "800px",
                mx: "auto",
                fontSize: { xs: "2.2rem", md: "2.8rem" },
              }}
            >
              Why Not Just Build New Gas Plants?
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
              The traditional approach faces massive bottlenecks across every component of the supply chain
            </Typography>
          </Box>

          {/* Comparison Table */}
          <Box className="fade-in-section">
            <Card
              className="table-glow"
              sx={{
                bgcolor: "rgba(0,20,40,0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(142,202,230,0.2)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {/* Header Row */}
                      <ComparisonRow
                        category="Comparison Factor"
                        gasPlant={{ value: "New Gas Plant", status: "neutral" }}
                        surplus={{ value: "Surplus Interconnection", status: "neutral" }}
                        isHeader={true}
                      />
                      
                      {/* Data Rows */}
                      {comparisonData.map((row, index) => (
                        <ComparisonRow
                          key={row.category}
                          category={row.category}
                          gasPlant={row.gasPlant}
                          surplus={row.surplus}
                          tooltip={row.tooltip}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Bottom Summary */}
          <Box
            className="fade-in-section"
            sx={{
              mt: 6,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            {/* Gas Plant Summary */}
            <Card
              sx={{
                flex: 1,
                bgcolor: "rgba(244,67,54,0.1)",
                border: "1px solid rgba(244,67,54,0.3)",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#f44336",
                    fontSize: { xs: "1.5rem", md: "1.8rem" },
                  }}
                >
                  5-8 Years
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Traditional deployment with 100% fossil fuel dependency
                </Typography>
              </CardContent>
            </Card>

            {/* Surplus Summary */}
            <Card
              sx={{
                flex: 1,
                bgcolor: "rgba(76,175,80,0.1)",
                border: "1px solid rgba(76,175,80,0.3)",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#4caf50",
                    fontSize: { xs: "1.5rem", md: "1.8rem" },
                  }}
                >
                  1-2 Years
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Rapid deployment with 95% clean energy profile
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Call to Action */}
          <Box
            className="fade-in-section"
            sx={{
              mt: 6,
              p: 4,
              bgcolor: "rgba(142,202,230,0.1)",
              borderRadius: 3,
              border: "2px solid rgba(142,202,230,0.3)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#8ecae6",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              The Clear Choice for AI Infrastructure
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
              Skip the bottlenecks. Deploy clean, reliable power where AI needs it most.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}