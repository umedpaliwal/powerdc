"use client";

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';

export default function CookiePolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        sx={{
          p: 6,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 229, 255, 0.1)',
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h3"
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
          Cookie Policy
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ '& > *': { mb: 4 } }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              What are cookies?
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Cookies are small text files that are stored on your computer or mobile device when you 
              visit a website. They help us provide you with a better experience by remembering your 
              preferences and improving our service.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              How we use cookies
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              PowerDC uses cookies for the following purposes:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mt: 2 }}>
              <Typography component="li" variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>
                Essential cookies: Required for the website to function properly
              </Typography>
              <Typography component="li" variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>
                Analytics cookies: Help us understand how visitors interact with our website
              </Typography>
              <Typography component="li" variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>
                Authentication cookies: Keep you signed in to your account
              </Typography>
              <Typography component="li" variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>
                Preference cookies: Remember your settings and preferences
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              Third-party cookies
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              We may use third-party services such as Google Analytics and Vercel Analytics to 
              analyze website usage. These services may set their own cookies to collect information 
              about your browsing behavior.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              Managing cookies
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              You can control and manage cookies in your browser settings. Please note that 
              disabling certain cookies may impact the functionality of our website. Most web 
              browsers allow you to control cookies through their settings preferences.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#00E5FF' }}>
              Contact us
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              If you have any questions about our use of cookies, please contact us at support@powerdc.dev
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}