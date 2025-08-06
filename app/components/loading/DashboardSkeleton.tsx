"use client";

import React from 'react';
import {
  Box,
  Skeleton,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

export default function DashboardSkeleton() {
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Sidebar Skeleton */}
      <Box
        sx={{
          width: { xs: '100%', md: 350 },
          backgroundColor: 'rgba(15, 32, 39, 0.95)',
          p: 3,
          borderRight: '1px solid rgba(0, 229, 255, 0.1)',
        }}
      >
        {/* Logo Area */}
        <Box sx={{ mb: 4 }}>
          <Skeleton
            variant="rectangular"
            width="80%"
            height={40}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Stats Cards */}
        <Box sx={{ mb: 4 }}>
          <Skeleton
            variant="text"
            width="60%"
            height={24}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              mb: 2,
            }}
          />
          <Grid container spacing={2}>
            {[1, 2].map((item) => (
              <Grid item xs={6} key={item}>
                <Card
                  sx={{
                    backgroundColor: 'rgba(0, 229, 255, 0.05)',
                    border: '1px solid rgba(0, 229, 255, 0.1)',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', mb: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={32}
                      sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Filters Section */}
        <Box sx={{ mb: 4 }}>
          <Skeleton
            variant="text"
            width="50%"
            height={24}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              mb: 2,
            }}
          />
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              variant="rectangular"
              width="100%"
              height={56}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.1)',
                borderRadius: 1,
                mb: 2,
              }}
            />
          ))}
        </Box>

        {/* Action Buttons */}
        <Box>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={45}
            sx={{
              backgroundColor: 'rgba(0, 229, 255, 0.2)',
              borderRadius: 3,
              mb: 2,
            }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
            }}
          />
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, position: 'relative', backgroundColor: '#f5f5f5' }}>
        {/* Top Statistics Bar */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            p: 2,
            backgroundColor: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} sx={{ minWidth: 150, flex: 1 }}>
              <CardContent sx={{ p: 2 }}>
                <Skeleton variant="text" width="70%" height={16} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" height={28} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="50%" height={14} />
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Map Area Skeleton */}
        <Box
          sx={{
            position: 'relative',
            height: 'calc(100vh - 120px)',
            backgroundColor: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Simulated Map Loading */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              opacity: 0.5,
            }}
          />
          
          {/* Loading Indicator */}
          <Box sx={{ textAlign: 'center', zIndex: 1 }}>
            <Skeleton
              variant="circular"
              width={60}
              height={60}
              sx={{
                mx: 'auto',
                mb: 2,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                },
              }}
            />
            <Skeleton variant="text" width={200} height={24} sx={{ mx: 'auto' }} />
          </Box>

          {/* Map Controls Skeleton */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                width={40}
                height={40}
                sx={{
                  borderRadius: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              />
            ))}
          </Box>

          {/* Legend Skeleton */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              p: 2,
              borderRadius: 2,
              minWidth: 200,
            }}
          >
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
            {[1, 2, 3].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="text" width="80%" height={16} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}