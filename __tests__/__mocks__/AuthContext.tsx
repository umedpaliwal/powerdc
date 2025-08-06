import React from 'react'

export const mockSignIn = jest.fn()
export const mockSignInWithGoogle = jest.fn()
export const mockSignUp = jest.fn()
export const mockSignOut = jest.fn()

export const useAuth = jest.fn(() => ({
  user: null,
  loading: false,
  signIn: mockSignIn,
  signInWithGoogle: mockSignInWithGoogle,
  signUp: mockSignUp,
  signOut: mockSignOut,
  resetPassword: jest.fn(),
  updatePassword: jest.fn(),
}))

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="auth-provider">{children}</div>
}

// This file is a mock and doesn't contain tests