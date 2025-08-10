"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Fade,
  CircularProgress,
} from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";
import DemoForm from "./DemoForm";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        // Reset states after closing
        setTimeout(() => {
          setIsSuccess(false);
          setIsSubmitting(false);
        }, 500);
      }, 3000);
    } catch (error) {
      console.error("Error submitting demo request:", error);
      alert("There was an error submitting your request. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset states after closing
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "1px solid rgba(0, 229, 255, 0.2)",
          boxShadow: "0 20px 60px rgba(0, 229, 255, 0.15)",
        },
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <DialogTitle
        sx={{
          position: "relative",
          pb: 0,
          pt: 3,
          px: 3,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={isSubmitting}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "rgba(255, 255, 255, 0.5)",
            "&:hover": {
              color: "rgba(255, 255, 255, 0.8)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3, pt: 1 }}>
        {!isSuccess ? (
          <>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#00E5FF",
                  mb: 2,
                }}
              >
                Schedule Your Demo
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.6,
                }}
              >
                See how WattCanvas can accelerate your data center deployment from 5+ years to just 18 months
              </Typography>
            </Box>

            {/* Form or Loading */}
            {isSubmitting ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 6,
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{
                    color: "#00E5FF",
                    mb: 3,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  Submitting your request...
                </Typography>
              </Box>
            ) : (
              <DemoForm onSubmit={handleSubmit} />
            )}
          </>
        ) : (
          /* Success State */
          <Fade in={isSuccess} timeout={500}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 6,
                textAlign: "center",
              }}
            >
              <CheckCircle
                sx={{
                  fontSize: 80,
                  color: "#4CAF50",
                  mb: 3,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "white",
                  mb: 2,
                }}
              >
                Thank You!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "400px",
                  lineHeight: 1.6,
                }}
              >
                We've received your demo request and will contact you within 24 hours to schedule your personalized walkthrough.
              </Typography>
            </Box>
          </Fade>
        )}
      </DialogContent>
    </Dialog>
  );
}