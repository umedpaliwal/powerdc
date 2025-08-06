"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Link, Tabs, Tab } from "@mui/material";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ThermalDashoardFilters from "./ThermalDashboardFilters";
import { useRouter } from "next/navigation";

interface ThermalDashboardSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  plantData: { all: any[]; filtered: any[] };
  onFilterChange: (filterName: string, value: string | boolean) => void;
  onReset: () => void;
}

export default function ThermalDashboardSidebar({
  filters,
  setFilters,
  plantData,
  onFilterChange,
  onReset,
}: ThermalDashboardSidebarProps) {
  const router = useRouter();
  const [isDataReady, setIsDataReady] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 1) {
      router.push("/re/dashboard");
    }
  };

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
        WattCanvas
      </Typography>

      <Tabs
        sx={{
          color: "white",
          marginBottom: 2,
        }}
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Dashboard Tabs"
      >
        <Tab label="Thermal" />
        <Tab label="Renewable" />
      </Tabs>

      <ThermalDashoardFilters
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
