"use client";

import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function NavigationHeader() {
  const router = useRouter();
  const { user } = useAuth();

  const handleNavigate = (path: string) => {
    if (path === '/dashboard' && !user) {
      router.push('/signin?redirectTo=/dashboard');
    } else {
      router.push(path);
    }
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard', requiresAuth: true },
    { label: 'Surplus Interconnection', path: '/surplus-interconnection' },
    { label: 'Plans', path: '/pricing' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            background: 'rgba(15, 32, 39, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 229, 255, 0.1)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Logo Section */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  mr: 4,
                }}
                onClick={() => handleNavigate('/')}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    textDecoration: 'none',
                    letterSpacing: '1px',
                  }}
                >
                  WattCanvas
                </Typography>
              </Box>

              {/* Navigation Links */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 229, 255, 0.1)',
                        color: '#00E5FF',
                      },
                    }}
                  >
                    {item.label}
                    {item.requiresAuth && !user && (
                      <Typography
                        component="span"
                        sx={{
                          ml: 1,
                          fontSize: '0.75rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontWeight: 400,
                        }}
                      >
                        (Login)
                      </Typography>
                    )}
                  </Button>
                ))}
              </Box>

              {/* User Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {user ? (
                  <Button
                    onClick={() => handleNavigate('/account')}
                    sx={{
                      color: '#00E5FF',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 229, 255, 0.1)',
                      },
                    }}
                  >
                    Account
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleNavigate('/signin')}
                    variant="outlined"
                    sx={{
                      color: '#00E5FF',
                      borderColor: '#00E5FF',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: '#00E5FF',
                        backgroundColor: 'rgba(0, 229, 255, 0.1)',
                      },
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <Toolbar />
    </>
  );
}