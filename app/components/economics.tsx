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
  background: 'white', // White background
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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function Economics() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="economics">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ color: 'black', whiteSpace: 'nowrap' }}>
                Economic Viability:
              </Typography>
              <Typography variant="h4" gutterBottom sx={{ color: 'black', whiteSpace: 'nowrap', mb: 3 }}>
                A Shifting Landscape
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'black', mb: 3 }}>
                The economics of this approach are increasingly favorable:
              </Typography>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Today, 70% of existing thermal plants (about 560 GW) could economically integrate renewables
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                By 2029, nearly all thermal power plants will reach this "cost crossover point"
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Local solar and wind will be cost-competitive with fossil fuel operating costs for many plants by 2032
              </BulletPoint>
            </Grid>
            <Grid item xs={12} md={6}>
              <ImageContainer>
                <Image
                  src="/solyear.png"
                  alt="Economic Viability Chart"
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