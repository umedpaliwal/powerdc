"use client";

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Email as EmailIcon,
  Help as HelpIcon,
  BugReport as BugReportIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

export default function Support() {
  const supportOptions = [
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: '#00E5FF' }} />,
      title: 'Email Support',
      description: 'Get help from our team via email',
      action: 'Contact Us',
      href: 'mailto:support@powerdc.dev',
    },
    {
      icon: <HelpIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      title: 'Help Center',
      description: 'Browse our knowledge base and guides',
      action: 'View Docs',
      href: '/api-docs',
    },
    {
      icon: <BugReportIcon sx={{ fontSize: 40, color: '#FF5722' }} />,
      title: 'Report Bug',
      description: 'Report technical issues or bugs',
      action: 'Report Issue',
      href: 'mailto:bugs@powerdc.dev',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#9C27B0' }} />,
      title: 'Academic Collaboration',
      description: 'Partner with UC Berkeley GridLab',
      action: 'Learn More',
      href: 'mailto:collaboration@powerdc.dev',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #00E5FF, #40C4FF)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Support Center
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Get help with PowerDC's renewable energy analytics platform
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {supportOptions.map((option, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 229, 255, 0.1)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 229, 255, 0.15)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  {option.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
                >
                  {option.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}
                >
                  {option.description}
                </Typography>
                <Button
                  variant="contained"
                  href={option.href}
                  sx={{
                    backgroundColor: '#00E5FF',
                    color: '#000',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 3,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#40C4FF',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          p: 6,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 229, 255, 0.1)',
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 3, color: '#00E5FF' }}
        >
          Frequently Asked Questions
        </Typography>
        
        <Grid container spacing={4} sx={{ textAlign: 'left' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              What is PowerDC?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              PowerDC is a research platform by UC Berkeley GridLab that provides 
              analytics and optimization tools for renewable energy deployment and 
              sustainable data center operations.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              How do I access the dashboard?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              You'll need to create an account and sign in to access the dashboard 
              and its analytical tools. Some features may require a subscription.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Can I use this data for research?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Yes, PowerDC is designed for academic and research use. Please cite 
              our work appropriately and contact us for collaboration opportunities.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Is there API access available?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Yes, we provide API access for programmatic data retrieval. 
              Check our API documentation for details on endpoints and authentication.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}