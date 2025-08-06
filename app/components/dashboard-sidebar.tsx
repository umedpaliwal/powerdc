"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import Image from "next/image";
import DashboardFilters from "./dashboard-filters";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

interface DashboardSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  plantData: { all: any[]; filtered: any[] };
  onFilterChange: (filterName: string, value: string | boolean) => void;
  onReset: () => void;
}

export default function DashboardSidebar({
  filters,
  setFilters,
  plantData,
  onFilterChange,
  onReset,
}: DashboardSidebarProps) {
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (plantData.all.length > 0 && plantData.filtered.length > 0) {
      setIsDataReady(true);
    }
  }, [plantData]);

  if (!isDataReady) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          mb: 2,
          fontSize: "2rem",
          letterSpacing: "0.5px",
        }}
      >
        Surplus Interconnection
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          width: "100%",
          height: "50px",
        }}
      >
        <Box sx={{ width: "48%", position: "relative" }}>
          <Image
            src="/gridlab_logo.png"
            alt="GridLab Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box sx={{ width: "48%", position: "relative" }}>
          <Image
            src="/ucb_logo.png"
            alt="UCB Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>
      <DashboardFilters
        filters={filters}
        setFilters={setFilters}
        plantData={plantData}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
      <Box
        sx={{
          mt: "auto",
          pt: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          Created by Umed Paliwal
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link
            href="mailto:umed@berkeley.edu"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              "&:hover": { color: "#4fc3f7" },
            }}
          >
            <EmailIcon sx={{ fontSize: "1rem" }} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/paliwalumed/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              "&:hover": { color: "#4fc3f7" },
            }}
          >
            <LinkedInIcon sx={{ fontSize: "1rem" }} />
          </Link>
          <Link
            href="https://x.com/umedpali"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              "&:hover": { color: "#4fc3f7" },
            }}
          >
            <TwitterIcon sx={{ fontSize: "1rem" }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
