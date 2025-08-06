"use client";

import ThermalDashboardContent from "@/app/components/thermal/ThermalDashboardContent";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardIntroModal from "@/app/components/DashboardIntroModal";
import { useAuth } from "@/hooks/useAuth";
import DashboardSkeleton from "@/app/components/loading/DashboardSkeleton";

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
    return <DashboardSkeleton />;
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