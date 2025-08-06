'use client'

import React from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { SignInForm } from '@/components/auth/SignInForm'

export default function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSignInSuccess = () => {
    // Get the redirect URL from search params, default to dashboard
    const redirectTo = searchParams?.get('redirectTo') || '/dashboard'
    router.push(redirectTo)
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
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography component="h1" variant="h4" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to your WattCanvas account
            </Typography>
          </Box>

          <SignInForm onSuccess={handleSignInSuccess} />
        </Paper>
      </Box>
    </Container>
  )
}