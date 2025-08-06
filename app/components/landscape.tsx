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
  background: '#00838F', // Keep the dark teal background
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px', // Keep the same height as the previous map
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const BulletPoint = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '&:before': {
    content: '"•"',
    marginRight: theme.spacing(1),
    color: 'white', // Changed to white for teal background
    fontSize: '1.2em',
  },
}));

export default function Landscape() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="landscape">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>
                The Local Renewable Energy Landscape
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'white', mb: 3, fontSize: '1rem' }}>
                Our analysis of over 2000 thermal power plants reveals:
              </Typography>
              <BulletPoint variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
                90% of power plants have 5 times the local renewable energy capacity within a 6-mile radius
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
                Total resource potential within these zones: 20,000 GW
              </BulletPoint>
            </Grid>
            <Grid item xs={12} md={6}>
              <ImageContainer>
                <Image
                  src="/dash_img.png"
                  alt="Renewable Energy Landscape Dashboard"
                  layout="fill"
                  objectFit="contain"
                />
              </ImageContainer>
            </Grid>
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
}