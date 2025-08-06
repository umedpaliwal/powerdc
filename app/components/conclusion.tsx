'use client'

import React from 'react';
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

export default function Conclusion() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="conclusion">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ color: 'white', whiteSpace: 'nowrap' }}>
                Conclusion: A Path Forward
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'white', mb: 3 }}>
                By reimagining how we use our existing energy infrastructure, we have an opportunity to revolutionize our energy landscape. This approach offers a win-win solution for fossil plant owners, renewable energy generators, and consumers alike.
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                It's time to turn our energy scarcity into a clean energy surplus.
              </Typography>
            </Grid>
            {/* Keep any existing visuals or add a call-to-action here */}
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
}