'use client'

import React from 'react';
import { Box, Typography, Grid, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

const theme = createTheme();

const SectionContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(8, 0),
  background: 'white',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
}));

const BulletPoint = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '&:before': {
    content: '"•"',
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: '1.2em',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
}));

export default function Challenge() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="challenge">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ color: 'black', fontSize: '2.5rem', marginBottom: '1rem' }}>
                The Challenge We Face
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'black', mb: 3, fontSize: '1.1rem' }}>
                The United States is at a critical juncture in its energy future. We need to triple or quadruple our current rate of clean electricity deployment to meet our climate goals. Even doubling our efforts would leave us short by about 1000 GW by 2035.
              </Typography>
              <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
                Key Challenges:
              </Typography>
              <BulletPoint variant="body1" sx={{ color: 'black', fontSize: '1.1rem' }}>
                Current deployment rate: only 30 GW/year
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black', fontSize: '1.1rem' }}>
                Interconnection bottleneck: Over 2500 GW of projects stuck in queue
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black', fontSize: '1.1rem' }}>
                Surging demand: AI and data centers alone could require 500 TWh by 2030
              </BulletPoint>
            </Grid>
            <Grid item xs={12} md={6}>
              <ImageContainer>
                <Image
                  src="/rate.png"
                  alt="Current vs. Required RE Deployment Rate"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </ImageContainer>
            </Grid>
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
}