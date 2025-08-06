"use client";

import ThermalDashboardContent from "@/app/components/thermal/ThermalDashboardContent";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardIntroModal from "@/app/components/DashboardIntroModal";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const [showIntroModal, setShowIntroModal] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Enforce authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin?redirectTo=/dashboard');
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        flexDirection="column"
        gap={2}
        sx={{ background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" }}
      >
        <CircularProgress sx={{ color: '#00E5FF' }} />
        <Typography sx={{ color: 'white' }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return null;
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", position: "relative" }}>
      <ThermalDashboardContent
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