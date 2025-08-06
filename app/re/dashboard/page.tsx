"use client";

import DashboardIntroModal from "@/components/DashboardIntroModal";
import ReDashboardContent from "@/components/re/ReDashboardContent";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Dashboard() {
  const [showIntroModal, setShowIntroModal] = useState(false);

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
