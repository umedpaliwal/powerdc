"use client";

import DashboardIntroModal from "@/app/components/DashboardIntroModal";
import ReDashboardContent from "@/app/components/re/ReDashboardContent";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const [showIntroModal, setShowIntroModal] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin?redirectTo=/re/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress />
        <Typography>Loading dashboard...</Typography>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", position: "relative" }}>
      <ReDashboardContent
      // filters={filters}
      // setFilters={setFilters}
      // mapConfig={mapConfig}
      />
      <DashboardIntroModal
        open={showIntroModal}
        onClose={() => setShowIntroModal(false)}
      />
    </Box>
  );
}
