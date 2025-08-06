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

  // Temporarily disabled for demo
  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/signin?redirectTo=/thermal/dashboard');
  //   }
  // }, [user, loading, router]);

  // Temporarily show dashboard for demo
  // if (loading) {
  //   return (
  //     <Box 
  //       display="flex" 
  //       justifyContent="center" 
  //       alignItems="center" 
  //       minHeight="100vh"
  //       flexDirection="column"
  //       gap={2}
  //     >
  //       <CircularProgress />
  //       <Typography>Loading dashboard...</Typography>
  //     </Box>
  //   );
  // }

  // if (!user) {
  //   return null;
  // }

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
