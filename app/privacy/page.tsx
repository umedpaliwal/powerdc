"use client";

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';

export default function PrivacyPolicy() {
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
          Privacy Policy
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ '& > *': { mb: 4 } }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              1. Information We Collect
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This may include your name, email address, 
              and usage data related to renewable energy analysis and data center optimization.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, send you technical notices and support messages, and respond 
              to your comments and questions.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              3. Information Sharing
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share aggregated, 
              non-personally identifiable information for research purposes in line with our academic mission.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              4. Data Security
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the Internet is 100% secure.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              5. Academic Research
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              As a UC Berkeley GridLab project, anonymized usage data may be used for academic research 
              purposes to advance the field of renewable energy and sustainable data center operations.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              6. Contact Us
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              If you have any questions about this Privacy Policy, please contact us at support@powerdc.dev
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}