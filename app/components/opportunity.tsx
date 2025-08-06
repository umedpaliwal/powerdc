'use client'

import React from 'react';
import { Box, Typography, Grid, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import dynamic from 'next/dynamic';

const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });
import Highcharts from 'highcharts';

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

export default function Opportunity() {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Interconnection Capacity',
      style: { color: '#ffffff' } // Changed to white for better contrast
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y} GW',
          style: {
            color: '#ffffff' // Changed to white for better contrast
          }
        }
      }
    },
    series: [{
      name: 'Capacity',
      colorByPoint: true,
      data: [{
        name: 'Utilized',
        y: 4200
      }, {
        name: 'Untapped Potential',
        y: 6500,
        sliced: true,
        selected: true
      }],
      type: 'pie'
    }] as any // Type assertion to avoid TypeScript error
  };

  return (
    <ThemeProvider theme={theme}>
      <SectionContainer id="opportunity">
        <ContentContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>
                The Untapped Opportunity
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'white', mb: 3, fontSize: '1rem' }}>
                Despite these challenges, a solution lies hidden in plain sight: our existing power infrastructure.
              </Typography>
              <BulletPoint variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
                Potential energy input through existing interconnection: 10,700 TWh
              </BulletPoint>
              <BulletPoint variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
                Actually utilized in 2023: 4200 TWh
              </BulletPoint>
              <Typography variant="body1" sx={{ color: 'white', mt: 3, fontSize: '1.2rem', fontWeight: 'bold' }}>
                We're using less than 40% of our existing interconnection capacity!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </Grid>
          </Grid>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
}