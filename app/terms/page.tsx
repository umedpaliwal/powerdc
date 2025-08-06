"use client";

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';

export default function TermsOfService() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        sx={{
          p: 6,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 229, 255, 0.1)',
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #00E5FF, #40C4FF)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Terms of Service
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ '& > *': { mb: 4 } }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              By accessing and using PowerDC's services, you accept and agree to be bound by the terms and 
              provision of this agreement. This service is operated by UC Berkeley GridLab.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              2. Use License
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Permission is granted to temporarily access the materials on PowerDC's website for personal, 
              non-commercial transitory viewing only. This license shall automatically terminate if you 
              violate any of these restrictions and may be terminated by us at any time.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              3. Research Data and Academic Use
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              PowerDC provides data and analysis tools for research and educational purposes. The data 
              and insights provided are for informational purposes only and should not be used as the 
              sole basis for investment or business decisions.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              4. Disclaimer
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              The materials on PowerDC's website are provided on an 'as is' basis. PowerDC makes no 
              warranties, expressed or implied, and hereby disclaim and negate all other warranties 
              including without limitation, implied warranties or conditions of merchantability, fitness 
              for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              5. Contact Information
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              If you have any questions about these Terms of Service, please contact us at support@powerdc.dev
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}