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

export default function CaseStudy() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="case-study">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ color: 'black', whiteSpace: 'nowrap', fontSize: '2rem', marginBottom: '1rem' }}>
                Real-World Success: Wolf Hills Solar
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'black', mb: 3 }}>
                The Wolf Hills Solar project in Virginia demonstrates this approach:
              </Typography>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                262 MW solar facility near an existing gas plant
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                $386.9 million capital investment
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'black' }}>
                262 job years during construction
              </BulletPoint>
              <Typography variant="body1" paragraph sx={{ color: 'black', mt: 3 }}>
                This project shows how we can leverage existing infrastructure to rapidly deploy renewable energy while providing economic benefits to local communities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
                <Image
                  src="/wolf.png"
                  alt="Wolf Hills Solar Project"
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