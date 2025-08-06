"use client";

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Dashboard as DashboardIcon,
  Map as MapIcon,
  Download as DownloadIcon,
  Api as ApiIcon,
} from '@mui/icons-material';

export default function HelpCenter() {
  const faqData = [
    {
      question: "How do I access the WattCanvas dashboard?",
      answer: "To access the dashboard, you need to create an account and sign in. Go to the Sign In page, create your account, and once logged in, you'll have access to our renewable energy analytics dashboard."
    },
    {
      question: "What data is available on WattCanvas?",
      answer: "WattCanvas provides comprehensive data on renewable energy resources, data center locations, thermal analysis, and surplus interconnection opportunities. This includes geographic data, capacity information, and optimization insights."
    },
    {
      question: "Can I export data from the platform?",
      answer: "Yes, authenticated users can export data from the dashboard. Look for the export functionality in the sidebar or use our API endpoints for programmatic access to the data."
    },
    {
      question: "Is there API access available?",
      answer: "Yes, WattCanvas provides REST API access for developers and researchers. Check our API documentation for detailed information about available endpoints, authentication, and usage limits."
    },
    {
      question: "How is this data used for research?",
      answer: "WattCanvas is a platform for academic research purposes. The platform helps researchers analyze renewable energy deployment opportunities and optimize data center sustainability."
    },
    {
      question: "What are the system requirements?",
      answer: "WattCanvas is a web-based platform that works on modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser."
    },
    {
      question: "How do I report a bug or issue?",
      answer: "If you encounter any issues, please report them through our support page or email bugs@wattcanvas.com. Include as much detail as possible about the issue and steps to reproduce it."
    },
    {
      question: "Can I collaborate on research projects?",
      answer: "Yes! WattCanvas welcomes academic collaboration. Contact us at collaboration@wattcanvas.com to discuss research partnerships and data sharing opportunities."
    }
  ];

  const quickGuides = [
    {
      icon: <DashboardIcon sx={{ fontSize: 40, color: '#00E5FF' }} />,
      title: 'Getting Started',
      description: 'Learn how to navigate the WattCanvas dashboard and access key features.',
    },
    {
      icon: <MapIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      title: 'Map Navigation',
      description: 'Understand how to use the interactive map and filter data geographically.',
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 40, color: '#FF5722' }} />,
      title: 'Data Export',
      description: 'Export your analysis results and data for further research.',
    },
    {
      icon: <ApiIcon sx={{ fontSize: 40, color: '#9C27B0' }} />,
      title: 'API Usage',
      description: 'Access WattCanvas data programmatically through our REST API.',
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
          Help Center
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
          Find answers to common questions and learn how to use WattCanvas
        </Typography>
      </Box>

      {/* Quick Guides */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}
        >
          Quick Guides
        </Typography>
        <Grid container spacing={4}>
          {quickGuides.map((guide, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 229, 255, 0.1)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 229, 255, 0.15)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {guide.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {guide.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                  >
                    {guide.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Paper
        sx={{
          p: 6,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 229, 255, 0.1)',
          borderRadius: 3,
          mb: 6,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 4, textAlign: 'center', color: '#00E5FF' }}
        >
          Frequently Asked Questions
        </Typography>
        
        <Box>
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(0, 229, 255, 0.1)',
                borderRadius: 2,
                mb: 2,
                '&:before': { display: 'none' },
                '&.Mui-expanded': {
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#00E5FF' }} />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 1,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>

      {/* Contact Support */}
      <Paper
        sx={{
          p: 4,
          background: 'rgba(0, 229, 255, 0.05)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}
        >
          Still need help?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 3, maxWidth: 500, mx: 'auto' }}
        >
          If you can't find the answer you're looking for, our support team is here to help.
        </Typography>
        <Button
          variant="contained"
          href="/support"
          sx={{
            backgroundColor: '#00E5FF',
            color: '#000',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#40C4FF',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Contact Support
        </Button>
      </Paper>
    </Container>
  );
}