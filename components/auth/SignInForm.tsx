'use client'

import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Alert,
  Divider,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

interface SignInFormProps {
  onSuccess?: () => void
}

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const { signIn, signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.type === 'checkbox' 
      ? (event.target as HTMLInputElement).checked 
      : event.target.value
    
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      await signIn(formData.email, formData.password)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
    } catch (err: any) {
      setError(err.message || 'An error occurred with Google sign in')
    } finally {
      setLoading(false)
    }
  }


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* OAuth Buttons */}
      <Box sx={{ mb: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          disabled={loading}
          sx={{ 
            mb: 2,
            py: 1.5,
            borderColor: '#4285f4',
            color: '#4285f4',
            '&:hover': {
              borderColor: '#357ae8',
              backgroundColor: 'rgba(66, 133, 244, 0.04)'
            }
          }}
        >
          Sign in with Google
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            or sign in with email
          </Typography>
        </Divider>
      </Box>

      {/* Form Fields */}
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleInputChange('email')}
        error={!!errors.email}
        helperText={errors.email}
        margin="normal"
        required
        autoComplete="email"
        autoFocus
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleInputChange('password')}
        error={!!errors.password}
        helperText={errors.password}
        margin="normal"
        required
        autoComplete="current-password"
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleInputChange('rememberMe')}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              Remember me
            </Typography>
          }
        />
        
        <MuiLink component={Link} href="/forgot-password" color="primary" sx={{ textDecoration: 'none' }}>
          <Typography variant="body2">
            Forgot password?
          </Typography>
        </MuiLink>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ mt: 2, mb: 2 }}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </Button>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{' '}
          <MuiLink component={Link} href="/signup" color="primary" sx={{ textDecoration: 'none', fontWeight: 500 }}>
            Sign up free
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  )
}