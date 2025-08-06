'use client'

import React from 'react';
import { Box, Typography, Grid, Button, ThemeProvider, createTheme } from '@mui/material';
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

export default function CallToAction() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="call-to-action">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: 'black', 
                  whiteSpace: 'nowrap',
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}
              >
                Join the Revolution
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'black', mb: 3 }}>
                As policymakers and business leaders, you have the power to accelerate this transition. We urge you to support policies and investments that enable the sharing of interconnection infrastructure and the rapid deployment of renewable energy.
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'black', mb: 3 }}>
                Together, we can build a cleaner, more resilient, and more prosperous energy future for America.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                href="#contact-form"
                sx={{ 
                  fontSize: '1.2rem',
                  padding: '12px 24px',
                }}
              >
                Get Involved
              </Button>
            </Grid>
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
}