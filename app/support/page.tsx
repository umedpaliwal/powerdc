"use client";

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Link,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import emailjs from '@emailjs/browser';

// EmailJS Configuration - Replace these with your actual values
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
      // Fallback to mailto if EmailJS is not configured
      const subject = `Support Request from ${formData.name} - ${formData.company}`;
      const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ACompany: ${formData.company}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
      window.location.href = `mailto:contact@wattcanvas.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 2000);
      return;
    }

    // Send email using EmailJS
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          message: formData.message,
          to_email: 'contact@wattcanvas.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      
      setShowSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
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
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          Contact Support
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1.1rem', md: '1.5rem' },
          }}
        >
          We're here to help with any questions about WattCanvas
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Email Contact Section */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: 4,
              background: 'rgba(0, 229, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <EmailIcon sx={{ fontSize: 60, color: '#00E5FF', mb: 3 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#00E5FF',
              }}
            >
              Email Us Directly
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              For immediate assistance, send us an email and we'll get back to you as soon as possible.
            </Typography>
            <Link
              href="mailto:contact@wattcanvas.com"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#00E5FF',
                textDecoration: 'none',
                p: 2,
                borderRadius: 2,
                border: '2px solid #00E5FF',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0, 229, 255, 0.2)',
                },
              }}
            >
              <EmailIcon />
              contact@wattcanvas.com
            </Link>
          </Paper>
        </Grid>

        {/* Contact Form Section */}
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 229, 255, 0.1)',
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: '#00E5FF',
                textAlign: 'center',
              }}
            >
              Or Fill Out This Form
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                required
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#00E5FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00E5FF',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00E5FF',
                  },
                }}
              />
              
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#00E5FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00E5FF',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00E5FF',
                  },
                }}
              />
              
              <TextField
                fullWidth
                required
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={isLoading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#00E5FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00E5FF',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00E5FF',
                  },
                }}
              />
              
              <TextField
                fullWidth
                required
                multiline
                rows={6}
                label="How can we help?"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#00E5FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00E5FF',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00E5FF',
                  },
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{
                  backgroundColor: '#00E5FF',
                  color: '#000',
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#40C4FF',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0, 229, 255, 0.3)',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(0, 229, 255, 0.3)',
                  },
                }}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Response Time Notice */}
      <Box
        sx={{
          mt: 6,
          p: 3,
          background: 'rgba(0, 229, 255, 0.05)',
          borderRadius: 3,
          border: '1px solid rgba(0, 229, 255, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
          }}
        >
          We typically respond within 24-48 hours during business days. 
          For urgent matters, please indicate so in your message.
        </Typography>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' 
            ? 'Your email client has been opened with the message. Please send the email to complete your request.'
            : 'Thank you for contacting us! We\'ll get back to you soon.'}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          Failed to send message. Please try again or email us directly at contact@wattcanvas.com
        </Alert>
      </Snackbar>
    </Container>
  );
}