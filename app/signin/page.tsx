import { Suspense } from 'react'
import SignInContent from './SignInContent'
import { Box, CircularProgress } from '@mui/material'

export default function SignInPage() {
  return (
    <Suspense 
      fallback={
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      }
    >
      <SignInContent />
    </Suspense>
  )
}