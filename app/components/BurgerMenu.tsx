"use client";

import React, { useState } from 'react';
import { 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Box,
  Typography,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleNavigate = (path: string) => {
    if (path === '/dashboard' && !user) {
      router.push('/signin?redirectTo=/dashboard');
    } else {
      router.push(path);
    }
    setOpen(false);
  };

  const menuItems = [
    { 
      text: 'Home', 
      icon: <HomeIcon />, 
      path: '/' 
    },
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard',
      requiresAuth: true 
    },
    { 
      text: 'Surplus Interconnection', 
      icon: <ElectricBoltIcon />, 
      path: '/surplus-interconnection' 
    },
    { 
      text: 'Plans', 
      icon: <AttachMoneyIcon />, 
      path: '/pricing' 
    },
    { 
      text: 'Account', 
      icon: <AccountCircleIcon />, 
      path: '/account' 
    },
  ];

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1300,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: '#00E5FF',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0, 229, 255, 0.2)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <MenuIcon sx={{ fontSize: 28 }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            background: 'linear-gradient(135deg, #0F2027 0%, #203A43 100%)',
            color: 'white',
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ElectricBoltIcon sx={{ fontSize: 30, color: '#00E5FF', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                PowerDC
              </Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#00E5FF', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '1.1rem',
                      fontWeight: 500,
                    }}
                  />
                  {item.requiresAuth && !user && (
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      (Login Required)
                    </Typography>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {user && (
            <>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Signed in as
                </Typography>
                <Typography variant="body2" sx={{ color: '#00E5FF', mt: 0.5 }}>
                  {user.email}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}