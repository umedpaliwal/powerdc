"use client";

import React from 'react';
import { Box, Container, Typography, Paper, Grid, Chip } from '@mui/material';
import Image from 'next/image';
import {
  ElectricBolt,
  SolarPower,
  Battery80,
  CloudQueue,
  CheckCircle,
  Speed,
  EnergySavingsLeaf,
  Security,
} from '@mui/icons-material';

export default function SchematicDiagram() {
  const configuration = [
    { icon: <ElectricBolt />, label: "100MW Gas Plant", value: "Existing Infrastructure" },
    { icon: <CloudQueue />, label: "100MW Data Center", value: "High-Performance Computing" },
    { icon: <SolarPower />, label: "500MW Solar Array", value: "5x Oversized Capacity" },
    { icon: <Battery80 />, label: "1600MWh Battery", value: "Long-Duration Storage" },
  ];

  const keyBenefits = [
    { icon: <EnergySavingsLeaf />, label: "95% Renewable Energy", description: "Solar + Storage Primary Power" },
    { icon: <Speed />, label: "18-Month Deployment", description: "Skip 5-Year Queue" },
    { icon: <Security />, label: "99.99% Uptime", description: "Gas Backup Reliability" },
    { icon: <CheckCircle />, label: "FERC Order 845", description: "Regulatory Compliant" },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#fff',
              mb: 2,
              fontSize: { xs: '1.6rem', md: '2.4rem' },
            }}
          >
            Surplus Interconnection Configuration
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '640px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
            }}
          >
            Deploy data centers with 95% renewable energy using existing gas plant interconnections
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {/* Left Side - Configuration and Benefits */}
          <Grid item xs={12} lg={5}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Configuration Setup */}
              <Paper
                elevation={0}
                sx={{
                  p: 3.2,
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                  borderRadius: 3,
                }}
              >
                <Typography variant="h5" sx={{ color: '#00E5FF', mb: 2.4, fontWeight: 600, fontSize: '1.4rem' }}>
                  Configuration Setup
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {configuration.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1.6,
                        borderRadius: 2,
                        background: 'rgba(0, 229, 255, 0.05)',
                        border: '1px solid rgba(0, 229, 255, 0.1)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          background: 'rgba(0, 229, 255, 0.1)',
                          transform: 'translateX(8px)',
                        },
                      }}
                    >
                      <Box sx={{ 
                        color: '#00E5FF', 
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        {React.cloneElement(item.icon, { fontSize: 'medium' })}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                          {item.label}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* Key Benefits */}
              <Paper
                elevation={0}
                sx={{
                  p: 3.2,
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                  borderRadius: 3,
                  flex: 1,
                }}
              >
                <Typography variant="h5" sx={{ color: '#00E5FF', mb: 2.4, fontWeight: 600, fontSize: '1.4rem' }}>
                  Key Benefits
                </Typography>
                <Grid container spacing={2}>
                  {keyBenefits.map((benefit, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          p: 1.6,
                          borderRadius: 2,
                          background: 'rgba(0, 229, 255, 0.05)',
                          border: '1px solid rgba(0, 229, 255, 0.1)',
                          height: '100%',
                          transition: 'all 0.3s',
                          '&:hover': {
                            background: 'rgba(0, 229, 255, 0.1)',
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ color: '#00E5FF', mr: 1 }}>
                            {React.cloneElement(benefit.icon, { fontSize: 'small' })}
                          </Box>
                          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>
                            {benefit.label}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                          {benefit.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>
          </Grid>

          {/* Right Side - Schematic Diagram */}
          <Grid item xs={12} lg={7}>
            <Paper
              elevation={0}
              sx={{
                p: 2.4,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" sx={{ color: '#00E5FF', mb: 2.4, fontWeight: 600, textAlign: 'center', fontSize: '1.4rem' }}>
                System Architecture
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  flex: 1,
                  minHeight: { xs: '320px', md: '400px' },
                  borderRadius: 2,
                  overflow: 'hidden',
                  background: 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <Image
                  src="/scheme.svg"
                  alt="Surplus Interconnection Schematic Diagram"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                  priority
                />
              </Box>
              <Box sx={{ mt: 2.4, display: 'flex', justifyContent: 'center', gap: 1.6, flexWrap: 'wrap' }}>
                <Chip
                  label="95% Solar + Storage"
                  sx={{
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    color: '#4CAF50',
                    border: '1px solid #4CAF50',
                  }}
                />
                <Chip
                  label="5% Gas Backup"
                  sx={{
                    backgroundColor: 'rgba(255, 152, 0, 0.2)',
                    color: '#FF9800',
                    border: '1px solid #FF9800',
                  }}
                />
                <Chip
                  label="Zero Queue Time"
                  sx={{
                    backgroundColor: 'rgba(0, 229, 255, 0.2)',
                    color: '#00E5FF',
                    border: '1px solid #00E5FF',
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            This configuration enables data centers to achieve sustainability goals while maintaining 
            enterprise-grade reliability, all while bypassing traditional interconnection delays.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}