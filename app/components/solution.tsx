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

export default function Solution() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="solution">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ color: 'black', whiteSpace: 'nowrap' }}>
                The Innovative Solution
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'black', mb: 3 }}>
                We propose a revolutionary approach: sharing interconnection with existing power plants. Here's how it works:
              </Typography>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Identify suitable locations within 6 miles of existing power plants
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Install solar panels or wind turbines in these areas
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Use the existing plant's grid connection to transmit the renewable energy
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Operate thermal plants when renewables aren't generating
              </BulletPoint>
              <Typography variant="h6" sx={{ color: 'black', mt: 3, mb: 2 }}>
                This strategy allows us to:
              </Typography>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Bypass lengthy interconnection queues
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Utilize existing infrastructure more efficiently
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                Deploy clean energy rapidly
              </BulletPoint>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', width: '250%', height: '998px', marginLeft: '-75%' }}>
                <Image
                  src="/idea.png"
                  alt="Innovative Solution Concept"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            </Grid>
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
}