'use client'

import React from 'react';
import Image from 'next/image';
import { Box, Typography, Grid, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';

const theme = createTheme();

const SectionContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(8, 0),
  background: '#00838F', // Darker teal background
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
    color: 'white', // Changed to white for better visibility on teal background
    fontSize: '1.2em',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  aspectRatio: '16/9',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function Impact() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="impact">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                Integration Potential and National Impact
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'white', mb: 3, fontSize: '1rem' }}>
                Our analysis shows significant potential:
              </Typography>
              <BulletPoint variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
                By 2030: Up to 800 GW of renewables could be integrated
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
                By 2035: This potential increases to 1200 GW
              </BulletPoint>
              <Typography variant="body1" sx={{ color: 'white', mt: 3, fontSize: '1rem' }}>
                Most regions could meet 50% or more of their 2032 electricity needs through this approach.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <ImageContainer>
                <Image
                  src="/cap_add.png"
                  alt="Integration Potential Chart"
                  layout="responsive"
                  width={16}
                  height={9}
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
