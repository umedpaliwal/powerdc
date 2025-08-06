"use client";

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
} from '@mui/material';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  ElectricBolt as ElectricBoltIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NotFound() {
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
            border: '1px solid rgba(0, 229, 255, 0.2)',
            borderRadius: 4,
          }}
        >
          {/* 404 Animation */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4rem', md: '8rem' },
                fontWeight: 900,
                background: 'linear-gradient(45deg, #00E5FF, #40C4FF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(0, 229, 255, 0.5)',
                mb: 2,
              }}
            >
              404
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                mb: 3,
              }}
            >
              <ElectricBoltIcon 
                sx={{ 
                  fontSize: 48, 
                  color: '#00E5FF',
                  animation: 'pulse 2s infinite',
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
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Page Not Found
              </Typography>
            </Box>
          </Box>

          {/* Error Message */}
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
            }}
          >
            Oops! The page you're looking for seems to have lost power.
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            The page you're trying to reach might have been moved, deleted, or you might have entered the wrong URL. 
            Don't worry, our renewable energy-powered servers are working fine!
          </Typography>

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
              startIcon={<HomeIcon />}
              onClick={() => router.push('/')}
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
              Go Home
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
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
              Go Back
            </Button>
          </Box>

          {/* Quick Links */}
          <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', pt: 4 }}>
            <Typography
              variant="body2"
              sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.6)' }}
            >
              Maybe you were looking for:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Pricing', path: '/pricing' },
                { label: 'API Docs', path: '/api-docs' },
                { label: 'Support', path: '/support' },
              ].map((link) => (
                <Button
                  key={link.label}
                  onClick={() => router.push(link.path)}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: '#00E5FF',
                      backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}