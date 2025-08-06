"use client";

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Home as HomeIcon,
  BugReport as BugReportIcon,
  ElectricBolt as ElectricBoltIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        color: 'white',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 82, 82, 0.3)',
            borderRadius: 4,
          }}
        >
          {/* Error Icon and Title */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                mb: 3,
              }}
            >
              <BugReportIcon 
                sx={{ 
                  fontSize: 64, 
                  color: '#ff5252',
                  animation: 'shake 0.5s ease-in-out infinite alternate',
                  '@keyframes shake': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(5px)' },
                  },
                }} 
              />
            </Box>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 900,
                background: 'linear-gradient(45deg, #ff5252, #ff8a80)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              System Error
            </Typography>
          </Box>

          {/* Error Message */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 600,
            }}
          >
            Something went wrong!
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            We've encountered an unexpected error. This might be a temporary issue with our renewable energy grid. 
            Please try refreshing the page or return to the home page.
          </Typography>

          {/* Error Details (in development) */}
          {process.env.NODE_ENV === 'development' && (
            <Alert
              severity="error"
              sx={{
                mb: 4,
                textAlign: 'left',
                backgroundColor: 'rgba(255, 82, 82, 0.1)',
                border: '1px solid rgba(255, 82, 82, 0.3)',
                color: 'white',
                '& .MuiAlert-icon': {
                  color: '#ff5252',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                <strong>Error:</strong> {error.message}
              </Typography>
              {error.digest && (
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  <strong>Digest:</strong> {error.digest}
                </Typography>
              )}
            </Alert>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={reset}
              sx={{
                backgroundColor: '#00E5FF',
                color: '#000',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#40C4FF',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 229, 255, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Try Again
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => router.push('/')}
              sx={{
                borderColor: '#00E5FF',
                color: '#00E5FF',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#40C4FF',
                  color: '#40C4FF',
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Go Home
            </Button>
          </Box>

          {/* Support Information */}
          <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', pt: 4 }}>
            <Typography
              variant="body2"
              sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.6)' }}
            >
              If the problem persists, please contact our support team:
            </Typography>
            <Button
              onClick={() => router.push('/support')}
              sx={{
                color: '#00E5FF',
                textTransform: 'none',
                fontSize: '0.9rem',
                '&:hover': {
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                },
              }}
            >
              Contact Support
            </Button>
          </Box>

          {/* PowerDC Branding */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
              opacity: 0.6,
            }}
          >
            <ElectricBoltIcon sx={{ fontSize: 20, mr: 1 }} />
            <Typography variant="body2">
              PowerDC Error Handler
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}