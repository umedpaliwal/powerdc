'use client'

import React from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  Link as MuiLink,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SignUpForm } from '@/components/auth/SignUpForm'

export default function SignUpPage() {
  const router = useRouter()

  const handleSignUpSuccess = () => {
    // Redirect to dashboard after successful signup
    router.push('/dashboard')
  }

  return (
    <Container component="main" maxWidth="md">
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
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography component="h1" variant="h4" gutterBottom>
              Join WattCanvas
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Get started with comprehensive power grid analytics and insights
            </Typography>
          </Box>

          <SignUpForm onSuccess={handleSignUpSuccess} />

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <MuiLink component={Link} href="/signin" color="primary" sx={{ textDecoration: 'none' }}>
                Sign in here
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}