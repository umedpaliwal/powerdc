"use client";

import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

interface LoadingSpinnerProps {
  open?: boolean;
  message?: string;
  variant?: 'page' | 'overlay' | 'inline';
  size?: number;
}

export default function LoadingSpinner({
  open = true,
  message = 'Loading...',
  variant = 'inline',
  size = 40,
}: LoadingSpinnerProps) {

  const renderSpinner = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {/* Custom PowerDC Loading Animation */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          size={size}
          thickness={3}
          sx={{
            color: '#00E5FF',
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
        <ElectricBoltIcon
          sx={{
            position: 'absolute',
            fontSize: size * 0.5,
            color: '#00E5FF',
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%': {
                opacity: 1,
                transform: 'scale(1)',
              },
              '50%': {
                opacity: 0.7,
                transform: 'scale(1.1)',
              },
              '100%': {
                opacity: 1,
                transform: 'scale(1)',
              },
            },
          }}
        />
      </Box>

      {message && (
        <Typography
          variant="body2"
          sx={{
            color: variant === 'overlay' ? 'white' : 'text.secondary',
            fontWeight: 500,
            textAlign: 'center',
            animation: 'fadeInOut 2s ease-in-out infinite',
            '@keyframes fadeInOut': {
              '0%': { opacity: 0.7 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.7 },
            },
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (variant === 'overlay') {
    return (
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(15, 32, 39, 0.8)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {renderSpinner()}
      </Backdrop>
    );
  }

  if (variant === 'page') {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
          zIndex: 9999,
        }}
      >
        {renderSpinner()}
      </Box>
    );
  }

  // Inline variant
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      {renderSpinner()}
    </Box>
  );
}

// Additional specialized loading components
export function ButtonLoadingSpinner({ size = 20 }: { size?: number }) {
  return (
    <CircularProgress
      size={size}
      thickness={4}
      sx={{
        color: 'inherit',
        mr: 1,
      }}
    />
  );
}

export function TableLoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <LoadingSpinner message="Loading data..." />
    </Box>
  );
}

export function MapLoadingSpinner() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
      }}
    >
      <LoadingSpinner 
        message="Loading map data..." 
        variant="overlay"
        size={60}
      />
    </Box>
  );
}