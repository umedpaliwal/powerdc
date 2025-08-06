"use client";

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
    support: [
      { label: 'Contact Support', href: '/support' },
      { label: 'API Documentation', href: '/api-docs' },
      { label: 'Help Center', href: '/help' },
    ],
    resources: [
      { label: 'About', href: '/about' },
      { label: 'Research', href: '/research' },
      { label: 'Publications', href: '/publications' },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ElectricBoltIcon sx={{ color: '#00E5FF', mr: 1, fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  PowerDC
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                Exploring innovative solutions for renewable energy deployment and data center sustainability through advanced analytics and optimization.
              </Typography>
              
              {/* Institution Logos */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ position: 'relative', width: 100, height: 35 }}>
                  <Image 
                    src="/gridlab_logo.png" 
                    alt="GridLab Logo" 
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <Box sx={{ position: 'relative', width: 100, height: 35 }}>
                  <Image 
                    src="/ucb_logo.png" 
                    alt="UC Berkeley Logo" 
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Links Sections */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: '#00E5FF',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.support.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: '#00E5FF',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.resources.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: '#00E5FF',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link
                href="mailto:support@powerdc.dev"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.9rem',
                  '&:hover': { color: '#00E5FF' },
                }}
              >
                <EmailIcon sx={{ fontSize: 18 }} />
                Support
              </Link>
              
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <IconButton
                  href="#"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { color: '#00E5FF' },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  href="#"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { color: '#00E5FF' },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            © {currentYear} PowerDC. All rights reserved. UC Berkeley GridLab.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Built with renewable energy insights
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}