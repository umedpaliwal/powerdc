import { Suspense } from 'react'
import AccountContent from './AccountContent'
import { Box, CircularProgress } from '@mui/material'

export default function AccountPage() {
  return (
    <Suspense 
      fallback={
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
          sx={{ background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" }}
        >
          <CircularProgress sx={{ color: '#00E5FF' }} />
        </Box>
      }
    >
      <AccountContent />
    </Suspense>
  )
}