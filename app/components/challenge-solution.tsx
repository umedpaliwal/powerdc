'use client'

import React from 'react';
import { Box, Typography, Grid, ThemeProvider, createTheme, Divider } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

const theme = createTheme();

const SectionContainer = styled(Box)(({ theme }) => ({
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(8, 0),
  background: 'white',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: theme.spacing(0, 4),
}));

const BulletPoint = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  '&:before': {
    content: '"•"',
    marginRight: theme.spacing(2),
    color: '#00838F',
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
}));

export default function ChallengeSolution() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="challenge-solution">
        <ContentContainer>
          <Grid container spacing={6} alignItems="center">
            {/* Left Side - Challenge */}
            <Grid item xs={12} md={5}>
              <Box>
                <Typography variant="h3" sx={{
                  color: '#00838F',
                  fontSize: '2.8rem',
                  fontWeight: 'bold',
                  mb: 4,
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    backgroundColor: '#00838F',
                  },
                }}>
                  The Challenge
                </Typography>
                <Typography variant="h5" sx={{ 
                  color: '#333',
                  mb: 3,
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}>
                  The U.S. power grid faces an unprecedented bottleneck in clean energy deployment
                </Typography>
                <Box sx={{ pl: 1, mb: 4 }}>
                  <BulletPoint variant="h6" sx={{ color: '#333' }}>
                    Current pace of 30 GW/year leads to 1,000 GW shortfall by 2035
                  </BulletPoint>
                  <BulletPoint variant="h6" sx={{ color: '#333' }}>
                    2,500 GW of projects stuck in interconnection queues
                  </BulletPoint>
                  <BulletPoint variant="h6" sx={{ color: '#333' }}>
                    Surging demand from AI and data centers requires 500 TWh by 2030
                  </BulletPoint>
                </Box>
              </Box>
            </Grid>

            {/* Vertical Divider */}
            <Grid item xs={12} md={0.5}>
              <Box sx={{ 
                height: '400px',
                width: '2px',
                backgroundColor: 'rgba(0, 131, 143, 0.2)',
                margin: '0 auto',
                display: { xs: 'none', md: 'block' }
              }} />
            </Grid>

            {/* Right Side - Solution */}
            <Grid item xs={12} md={6.5}>
              <Box>
                <Typography variant="h3" sx={{
                  color: '#00838F',
                  fontSize: '2.8rem',
                  fontWeight: 'bold',
                  mb: 4,
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    backgroundColor: '#00838F',
                  },
                }}>
                  The Solution
                </Typography>
                <Typography variant="h5" sx={{ 
                  color: '#333',
                  mb: 3,
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}>
                  Share interconnection with existing power plants to unlock rapid renewable deployment
                </Typography>
                <Box sx={{ pl: 1, mb: 4 }}>
                  <BulletPoint variant="h6" sx={{ color: '#333' }}>
                    Identify suitable locations within 6 miles of existing plants
                  </BulletPoint>
                  <BulletPoint variant="h6" sx={{ color: '#333' }}>
                    Install renewables to share existing grid connections
                  </BulletPoint>
                  <BulletPoint variant="h6" sx={{ color: '#333' }}>
                    Maintain thermal plants for reliability backup
                  </BulletPoint>
                </Box>
                <Box sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}>
                  <Image
                    src="/idea.png"
                    alt="Solution Concept"
                    fill
                    style={{ 
                      objectFit: 'contain',
                      padding: '20px',
                    }}
                    priority
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
} 