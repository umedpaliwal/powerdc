import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignInForm } from '@/components/auth/SignInForm'
import { mockSignIn, mockSignInWithGoogle } from '../../__mocks__/AuthContext'

// Mock the AuthContext
jest.mock('@/contexts/AuthContext', () => require('../../__mocks__/AuthContext'))

describe('SignInForm Component', () => {
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<SignInForm />)
  })

  it('displays all form elements', () => {
    render(<SignInForm />)
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument()
  })

  it('displays links for forgot password and sign up', () => {
    render(<SignInForm />)
    
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up free/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<SignInForm />)
    
    const submitButton = screen.getByRole('button', { name: /^sign in$/i })
    await user.click(submitButton)
    
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<SignInForm />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: /^sign in$/i })
    await user.click(submitButton)
    
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    mockSignIn.mockResolvedValue(undefined)
    
    render(<SignInForm onSuccess={mockOnSuccess} />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /^sign in$/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123')
    })
    
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  it('handles sign in errors', async () => {
    const user = userEvent.setup()
    const errorMessage = 'Invalid credentials'
    mockSignIn.mockRejectedValue(new Error(errorMessage))
    
    render(<SignInForm />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /^sign in$/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('toggles remember me checkbox', async () => {
    const user = userEvent.setup()
    render(<SignInForm />)
    
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i })
    
    expect(rememberMeCheckbox).not.toBeChecked()
    
    await user.click(rememberMeCheckbox)
    expect(rememberMeCheckbox).toBeChecked()
    
    await user.click(rememberMeCheckbox)
    expect(rememberMeCheckbox).not.toBeChecked()
  })

  it('calls Google sign in when Google button is clicked', async () => {
    const user = userEvent.setup()
    mockSignInWithGoogle.mockResolvedValue(undefined)
    
    render(<SignInForm />)
    
    const googleButton = screen.getByRole('button', { name: /sign in with google/i })
    await user.click(googleButton)
    
    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled()
    })
  })

  it('handles Google sign in errors', async () => {
    const user = userEvent.setup()
    const errorMessage = 'Google sign in failed'
    mockSignInWithGoogle.mockRejectedValue(new Error(errorMessage))
    
    render(<SignInForm />)
    
    const googleButton = screen.getByRole('button', { name: /sign in with google/i })
    await user.click(googleButton)
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('shows loading state during form submission', async () => {
    const user = userEvent.setup()
    let resolveSignIn: (value: unknown) => void
    mockSignIn.mockReturnValue(new Promise(resolve => { resolveSignIn = resolve }))
    
    render(<SignInForm />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /^sign in$/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    expect(screen.getByText('Signing In...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    
    // Resolve the promise
    resolveSignIn!(undefined)
    
    await waitFor(() => {
      expect(screen.queryByText('Signing In...')).not.toBeInTheDocument()
    })
  })

  it('clears field errors when user starts typing', async () => {
    const user = userEvent.setup()
    render(<SignInForm />)
    
    // First trigger validation errors
    const submitButton = screen.getByRole('button', { name: /^sign in$/i })
    await user.click(submitButton)
    
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    
    // Then start typing in email field
    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 't')
    
    await waitFor(() => {
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    })
  })
})