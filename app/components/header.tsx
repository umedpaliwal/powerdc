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
            src="/gridlab_logo.png" 
            alt="GridLab Logo" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ position: 'relative', width: 160, height: 67 }}>
          <Image 
            src="/ucb_logo.png" 
            alt="UCB Logo" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Box>
    </Box>
  );
}