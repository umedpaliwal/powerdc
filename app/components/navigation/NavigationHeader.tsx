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
    router.push(path);
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Product', path: '/product' },
    { label: 'Solution', path: '/solution' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Resources', path: '/resources' },
    { label: 'About', path: '/about' },
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
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1, justifyContent: 'center' }}>
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
                  </Button>
                ))}
              </Box>

              {/* User Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {user ? (
                  <>
                    <Button
                      onClick={() => handleNavigate('/dashboard')}
                      sx={{
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 229, 255, 0.1)',
                        },
                      }}
                    >
                      Dashboard
                    </Button>
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
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleNavigate('/signin')}
                      sx={{
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 229, 255, 0.1)',
                        },
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleNavigate('/demo')}
                      variant="contained"
                      sx={{
                        backgroundColor: '#00E5FF',
                        color: '#0a0a0a',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        '&:hover': {
                          backgroundColor: '#00B8D4',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0, 229, 255, 0.3)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Request Demo
                    </Button>
                  </>
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