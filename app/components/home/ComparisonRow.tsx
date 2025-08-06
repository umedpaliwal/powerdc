"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface ComparisonRowProps {
  category: string;
  gasPlant: {
    value: string;
    status: "good" | "bad" | "neutral";
  };
  surplus: {
    value: string;
    status: "good" | "bad" | "neutral";
  };
  tooltip?: string;
  isHeader?: boolean;
}

export default function ComparisonRow({
  category,
  gasPlant,
  surplus,
  tooltip,
  isHeader = false,
}: ComparisonRowProps) {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getStatusIcon = (status: "good" | "bad" | "neutral") => {
    switch (status) {
      case "good":
        return <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 20 }} />;
      case "bad":
        return <CancelIcon sx={{ color: "#f44336", fontSize: 20 }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: "good" | "bad" | "neutral") => {
    switch (status) {
      case "good":
        return "#4caf50";
      case "bad":
        return "#f44336";
      default:
        return "rgba(255,255,255,0.8)";
    }
  };

  if (isHeader) {
    return (
      <TableRow
        sx={{
          bgcolor: "rgba(0,40,80,0.3)",
          "& td": {
            borderBottom: "2px solid rgba(142,202,230,0.3)",
            py: 2,
          },
        }}
      >
        <TableCell sx={{ color: "white", fontWeight: 700, fontSize: "1.1rem" }}>
          {category}
        </TableCell>
        <TableCell sx={{ color: "#ff9800", fontWeight: 700, fontSize: "1.1rem", textAlign: "center" }}>
          {gasPlant.value}
        </TableCell>
        <TableCell sx={{ color: "#4caf50", fontWeight: 700, fontSize: "1.1rem", textAlign: "center" }}>
          {surplus.value}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <style jsx global>{`
        .comparison-row {
          transition: all 0.3s ease;
        }
        
        .comparison-row:hover {
          background-color: rgba(142,202,230,0.05) !important;
          transform: scale(1.01);
        }

        .comparison-cell {
          transition: all 0.3s ease;
        }

        .comparison-row:hover .comparison-cell {
          color: white !important;
        }
      `}</style>
      
      <TableRow
        className="comparison-row"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          "&:hover": {
            bgcolor: "rgba(142,202,230,0.05)",
          },
          "& td": {
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            py: 1.5,
          },
        }}
      >
        {/* Category Column */}
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              className="comparison-cell"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {category}
            </Typography>
            {tooltip && (
              <Tooltip
                title={tooltip}
                arrow
                placement="top"
                sx={{
                  "& .MuiTooltip-tooltip": {
                    bgcolor: "rgba(0,30,50,0.95)",
                    color: "white",
                    fontSize: "0.8rem",
                    border: "1px solid rgba(142,202,230,0.3)",
                  },
                }}
              >
                <IconButton size="small">
                  <InfoIcon sx={{ fontSize: 16, color: "rgba(142,202,230,0.7)" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </TableCell>

        {/* Gas Plant Column */}
        <TableCell sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            {getStatusIcon(gasPlant.status)}
            <Typography
              className="comparison-cell"
              sx={{
                color: getStatusColor(gasPlant.status),
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              {gasPlant.value}
            </Typography>
          </Box>
        </TableCell>

        {/* Surplus Column */}
        <TableCell sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            {getStatusIcon(surplus.status)}
            <Typography
              className="comparison-cell"
              sx={{
                color: getStatusColor(surplus.status),
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              {surplus.value}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}