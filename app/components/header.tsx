'use client'

import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

export default function Header() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ position: 'relative', width: 160, height: 67 }}>
          <Image 
            src="/logo.png" 
            alt="Company Logo" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Box>
    </Box>
  );
}