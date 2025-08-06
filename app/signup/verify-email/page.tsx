'use client'

import React from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Link as MuiLink,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const handleResendEmail = () => {
    // TODO: Implement resend verification email functionality
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <EmailIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            
            <Typography component="h1" variant="h4" gutterBottom>
              Check Your Email
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Didn't receive the email? Check your spam folder or
              </Typography>
              <Button 
                variant="text" 
                color="primary" 
                onClick={handleResendEmail}
                sx={{ textTransform: 'none' }}
              >
                Resend verification email
              </Button>
            </Box>

            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">
                Need help? Contact our{' '}
                <MuiLink href="mailto:support@powerdc.com" color="primary">
                  support team
                </MuiLink>
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                <MuiLink component={Link} href="/signin" color="primary" sx={{ textDecoration: 'none' }}>
                  Back to Sign In
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}