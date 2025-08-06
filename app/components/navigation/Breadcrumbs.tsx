"use client";

import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Dashboard as DashboardIcon,
  ElectricBolt as ElectricBoltIcon,
  AttachMoney as PricingIcon,
  AccountCircle as AccountIcon,
  Code as ApiIcon,
  Description as DocsIcon,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

const pathIconMap: { [key: string]: React.ReactNode } = {
  '': <HomeIcon sx={{ fontSize: 16 }} />,
  'dashboard': <DashboardIcon sx={{ fontSize: 16 }} />,
  'surplus-interconnection': <ElectricBoltIcon sx={{ fontSize: 16 }} />,
  'pricing': <PricingIcon sx={{ fontSize: 16 }} />,
  'account': <AccountIcon sx={{ fontSize: 16 }} />,
  'api-docs': <ApiIcon sx={{ fontSize: 16 }} />,
  're': <ElectricBoltIcon sx={{ fontSize: 16, color: '#4CAF50' }} />,
  'thermal': <ElectricBoltIcon sx={{ fontSize: 16, color: '#FF5722' }} />,
  'export': <DocsIcon sx={{ fontSize: 16 }} />,
  'signin': <AccountIcon sx={{ fontSize: 16 }} />,
  'signup': <AccountIcon sx={{ fontSize: 16 }} />,
  'checkout': <PricingIcon sx={{ fontSize: 16 }} />,
};

const pathLabelMap: { [key: string]: string } = {
  '': 'Home',
  'dashboard': 'Dashboard',
  'surplus-interconnection': 'Surplus Interconnection',
  'pricing': 'Plans',
  'account': 'Account',
  'api-docs': 'API Documentation',
  're': 'Renewable Energy',
  'thermal': 'Thermal',
  'export': 'Export',
  'signin': 'Sign In',
  'signup': 'Sign Up',
  'checkout': 'Checkout',
  'forgot-password': 'Forgot Password',
  'reset-password': 'Reset Password',
  'verify-email': 'Verify Email',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();

  // Skip breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: pathIconMap[''],
    },
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    const label = pathLabelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbItems.push({
      label,
      href: isLast ? undefined : currentPath,
      icon: pathIconMap[segment],
      isActive: isLast,
    });
  });

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <Box
      sx={{
        py: 2,
        px: { xs: 2, sm: 3 },
        backgroundColor: 'rgba(15, 32, 39, 0.02)',
        borderBottom: '1px solid rgba(0, 229, 255, 0.1)',
      }}
    >
      <MuiBreadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: 16, color: 'rgba(0, 229, 255, 0.5)' }} />}
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center',
          },
        }}
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          if (isLast || !item.href) {
            return (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {item.icon}
                <Typography
                  variant="body2"
                  sx={{
                    color: item.isActive ? '#00E5FF' : 'text.primary',
                    fontWeight: item.isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </Typography>
                {item.isActive && (
                  <Chip
                    label="Current"
                    size="small"
                    sx={{
                      ml: 1,
                      height: 20,
                      fontSize: '0.7rem',
                      backgroundColor: 'rgba(0, 229, 255, 0.1)',
                      color: '#00E5FF',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                    }}
                  />
                )}
              </Box>
            );
          }

          return (
            <Link
              key={item.label}
              onClick={() => handleNavigation(item.href!)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#00E5FF',
                  textDecoration: 'none',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {item.icon}
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}