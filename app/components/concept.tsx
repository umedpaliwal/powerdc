'use client'

import React from 'react';
import { Box, Typography, Grid, ThemeProvider, createTheme } from '@mui/material';
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

export default function Concept() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="concept">
        <ContentContainer>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{
                color: '#00838F',
                fontSize: '2.8rem',
                fontWeight: 'bold',
                mb: 4,
                lineHeight: 1.2,
              }}>
                Unlocking the Grid Through Interconnection Sharing
              </Typography>
              <Typography variant="h5" sx={{ 
                color: '#333',
                mb: 4,
                lineHeight: 1.6,
                fontWeight: 500,
              }}>
                Nearly 2,500 GW of clean energy projects are currently stalled in interconnection queues, 
                waiting an average of five years to connect to the grid.
              </Typography>
              <Typography variant="h5" sx={{ 
                color: '#333',
                mb: 4,
                lineHeight: 1.6,
                fontWeight: 500,
              }}>
                Our solution: Share existing grid connections at fossil fuel plants with new renewable projects, 
                bypassing lengthy queues while maximizing use of current infrastructure.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' },
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 30px rgba(0, 131, 143, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                maxWidth: '600px'
              }}>
                <Image
                  src="/idea.png"
                  alt="Interconnection Sharing Concept"
                  fill
                  style={{ 
                    objectFit: 'contain',
                    padding: '20px',
                  }}
                  priority
                />
              </Box>
            </Grid>
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
} 