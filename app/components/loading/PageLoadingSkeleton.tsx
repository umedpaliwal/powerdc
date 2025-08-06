"use client";

import React from 'react';
import {
  Box,
  Skeleton,
  Container,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

interface PageLoadingSkeletonProps {
  variant?: 'dashboard' | 'content' | 'list' | 'form';
  showHeader?: boolean;
}

export default function PageLoadingSkeleton({ 
  variant = 'content', 
  showHeader = true 
}: PageLoadingSkeletonProps) {

  const renderDashboardSkeleton = () => (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Skeleton */}
      <Box sx={{ width: 300, p: 2, borderRight: '1px solid rgba(0,0,0,0.1)' }}>
        <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={150} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={100} />
      </Box>
      
      {/* Main Content Skeleton */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Skeleton variant="rectangular" width={200} height={100} />
          <Skeleton variant="rectangular" width={200} height={100} />
          <Skeleton variant="rectangular" width={200} height={100} />
        </Box>
        <Skeleton variant="rectangular" height="60%" />
      </Box>
    </Box>
  );

  const renderContentSkeleton = () => (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section Skeleton */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Skeleton variant="text" width="60%" height={60} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width="80%" height={30} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width="70%" height={30} sx={{ mx: 'auto', mb: 4 }} />
        <Skeleton variant="rectangular" width={200} height={50} sx={{ mx: 'auto', borderRadius: 3 }} />
      </Box>

      {/* Content Cards Skeleton */}
      <Grid container spacing={4}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Card 
              sx={{ 
                height: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 229, 255, 0.1)',
              }}
            >
              <CardContent>
                <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="70%" height={20} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Content Skeleton */}
      <Box sx={{ mt: 6 }}>
        <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={150} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={130} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

  const renderListSkeleton = () => (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: 2 }} />
      </Box>
      
      {[1, 2, 3, 4, 5].map((item) => (
        <Card 
          key={item}
          sx={{ 
            mb: 2, 
            p: 3,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 229, 255, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={60} height={60} />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="60%" height={25} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
            <Skeleton variant="rectangular" width={100} height={35} sx={{ borderRadius: 2 }} />
          </Box>
        </Card>
      ))}
    </Container>
  );

  const renderFormSkeleton = () => (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card 
        sx={{ 
          p: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 229, 255, 0.1)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" width="60%" height={35} sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto' }} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 3, mt: 2 }} />
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Skeleton variant="text" width="70%" height={20} sx={{ mx: 'auto' }} />
        </Box>
      </Card>
    </Container>
  );

  return (
    <Box>
      {showHeader && (
        <Box sx={{ height: 64, backgroundColor: 'rgba(15, 32, 39, 0.95)' }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 2 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={120} height={24} />
              <Box sx={{ flexGrow: 1 }} />
              <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 2 }} />
            </Box>
          </Container>
        </Box>
      )}
      
      {variant === 'dashboard' && renderDashboardSkeleton()}
      {variant === 'content' && renderContentSkeleton()}
      {variant === 'list' && renderListSkeleton()}
      {variant === 'form' && renderFormSkeleton()}
    </Box>
  );
}