import { Suspense } from 'react'
import CheckoutContent from './CheckoutContent'
import { Box, CircularProgress } from '@mui/material'

export default function CheckoutPage() {
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
      <CheckoutContent />
    </Suspense>
  )
}