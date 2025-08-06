'use client'

import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useAuth } from '@/contexts/AuthContext'
import { PlanSelector, PlanType } from './PlanSelector'

interface SignUpFormProps {
  onSuccess?: () => void
}

interface FormData {
  email: string
  password: string
  confirmPassword: string
  companyName: string
  industryType: 'datacenter' | 'utility' | 'developer' | 'other' | ''
  phone: string
  selectedPlan: PlanType
  agreeToTerms: boolean
}

const industryOptions = [
  { value: 'datacenter', label: 'Data Center' },
  { value: 'utility', label: 'Utility' },
  { value: 'developer', label: 'Power Developer' },
  { value: 'other', label: 'Other' },
]

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const { signUp, signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    industryType: '',
    phone: '',
    selectedPlan: 'explorer',
    agreeToTerms: false,
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

  const handleSelectChange = (field: keyof FormData) => (
    event: any
  ) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }))
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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required'
    }

    if (!formData.industryType) {
      newErrors.industryType = 'Please select an industry type'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
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
      await signUp(formData.email, formData.password, {
        company_name: formData.companyName,
        industry_type: formData.industryType,
        phone: formData.phone,
        selected_plan: formData.selectedPlan,
      })
      
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
    } catch (err: any) {
      setError(err.message || 'An error occurred with Google sign up')
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
          onClick={handleGoogleSignUp}
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
          Sign up with Google
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            or sign up with email
          </Typography>
        </Divider>
      </Box>

      {/* Plan Selection */}
      <PlanSelector 
        selectedPlan={formData.selectedPlan}
        onPlanSelect={(plan) => setFormData(prev => ({ ...prev, selectedPlan: plan }))}
      />

      {/* Form Fields */}
      <Box sx={{ mt: 3 }}>
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
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Company Name"
          value={formData.companyName}
          onChange={handleInputChange('companyName')}
          error={!!errors.companyName}
          helperText={errors.companyName}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal" error={!!errors.industryType}>
          <InputLabel>Industry Type *</InputLabel>
          <Select
            value={formData.industryType}
            onChange={handleSelectChange('industryType')}
            label="Industry Type *"
          >
            {industryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors.industryType && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
              {errors.industryType}
            </Typography>
          )}
        </FormControl>

        <TextField
          fullWidth
          label="Phone (Optional)"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          margin="normal"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreeToTerms}
              onChange={handleInputChange('agreeToTerms')}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Typography component="a" href="/terms" color="primary" sx={{ textDecoration: 'none' }}>
                Terms of Service
              </Typography>{' '}
              and{' '}
              <Typography component="a" href="/privacy" color="primary" sx={{ textDecoration: 'none' }}>
                Privacy Policy
              </Typography>
            </Typography>
          }
          sx={{ mt: 2, alignItems: 'flex-start' }}
        />
        
        {errors.agreeToTerms && (
          <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5 }}>
            {errors.agreeToTerms}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </Box>
    </Box>
  )
}