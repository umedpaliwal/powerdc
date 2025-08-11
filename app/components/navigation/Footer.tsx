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
    support: [
      { label: 'Contact Support', href: '/support' },
      { label: 'FAQ', href: '/faq' },
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
                <Image 
                  src="/logo.svg" 
                  alt="PowerDC Logo" 
                  width={150}
                  height={45}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                Exploring innovative solutions for renewable energy deployment and data center sustainability through advanced analytics and optimization.
              </Typography>
            </Box>
          </Grid>

          {/* Links Sections */}
          <Grid item xs={12} md={4}>
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

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link
                href="mailto:contact@wattcanvas.com"
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
                contact@wattcanvas.com
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
            © {currentYear} PowerDC. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}