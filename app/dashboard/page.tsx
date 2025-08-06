"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Chip,
  LinearProgress,
  Alert,
  Skeleton
} from "@mui/material";
import {
  TrendingUp,
  Speed,
  Battery80,
  WbSunny,
  LocationOn,
  Assessment,
  Settings,
  Download
} from "@mui/icons-material";

interface SiteData {
  id: string;
  name: string;
  location: string;
  capacity: number;
  interconnectionCapacity: number;
  utilizationRate: number;
  type: 'gas' | 'solar' | 'battery';
  status: 'available' | 'partially-available' | 'unavailable';
}

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [sites, setSites] = useState<SiteData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Simulate loading site data
    const timer = setTimeout(() => {
      setSites([
        {
          id: '1',
          name: 'West Texas Solar Hub',
          location: 'Pecos County, TX',
          capacity: 850,
          interconnectionCapacity: 1200,
          utilizationRate: 71,
          type: 'solar',
          status: 'available'
        },
        {
          id: '2',
          name: 'Gulf Coast Gas Plant',
          location: 'Harris County, TX',
          capacity: 450,
          interconnectionCapacity: 800,
          utilizationRate: 56,
          type: 'gas',
          status: 'partially-available'
        },
        {
          id: '3',
          name: 'Arizona Battery Storage',
          location: 'Maricopa County, AZ',
          capacity: 200,
          interconnectionCapacity: 400,
          utilizationRate: 50,
          type: 'battery',
          status: 'available'
        }
      ]);
      setLoadingData(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <LinearProgress sx={{ width: '200px' }} />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  const isPro = profile?.subscription_tier === 'professional';
  const totalCapacity = sites.reduce((acc, site) => acc + site.interconnectionCapacity, 0);
  const availableCapacity = sites.reduce((acc, site) => 
    acc + (site.interconnectionCapacity - site.capacity), 0
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Surplus Interconnection Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back, {profile?.name || user.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
            <Chip 
              label={isPro ? 'Professional' : 'Explorer'} 
              color={isPro ? 'primary' : 'default'}
              sx={{ mr: 2 }}
            />
            {!isPro && (
              <Button variant="contained" color="primary" href="/pricing">
                Upgrade to Pro
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Free Tier Alert */}
      {!isPro && (
        <Alert severity="info" sx={{ mb: 3 }}>
          You're on the Explorer plan. Upgrade to Professional for full access to all sites, 
          detailed analytics, and API access.
        </Alert>
      )}

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Total Capacity
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {totalCapacity.toLocaleString()} MW
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Speed sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Available Now
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {availableCapacity.toLocaleString()} MW
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ color: 'warning.main', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Active Sites
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {isPro ? sites.length : '1'} / {sites.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ color: 'info.main', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Avg. Utilization
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {Math.round(sites.reduce((acc, site) => acc + site.utilizationRate, 0) / sites.length)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sites List */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Available Sites
      </Typography>
      
      <Grid container spacing={3}>
        {loadingData ? (
          [1, 2, 3].map((i) => (
            <Grid item xs={12} md={6} lg={4} key={i}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={32} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          sites.map((site, index) => {
            const isLocked = !isPro && index > 0;
            
            return (
              <Grid item xs={12} md={6} lg={4} key={site.id}>
                <Card sx={{ 
                  position: 'relative',
                  opacity: isLocked ? 0.6 : 1,
                  filter: isLocked ? 'blur(2px)' : 'none'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {site.type === 'solar' && <WbSunny sx={{ mr: 1, color: 'warning.main' }} />}
                        {site.type === 'gas' && <Speed sx={{ mr: 1, color: 'error.main' }} />}
                        {site.type === 'battery' && <Battery80 sx={{ mr: 1, color: 'success.main' }} />}
                        <Typography variant="h6" fontWeight="bold">
                          {site.name}
                        </Typography>
                      </Box>
                      <Chip 
                        label={site.status} 
                        size="small"
                        color={site.status === 'available' ? 'success' : 'warning'}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {site.location}
                    </Typography>
                    
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Interconnection</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {site.interconnectionCapacity} MW
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Current Usage</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {site.capacity} MW
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2">Available</Typography>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          {site.interconnectionCapacity - site.capacity} MW
                        </Typography>
                      </Box>
                      
                      <LinearProgress 
                        variant="determinate" 
                        value={site.utilizationRate} 
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {site.utilizationRate}% Utilized
                      </Typography>
                    </Box>

                    <Button 
                      fullWidth 
                      variant="outlined" 
                      sx={{ mt: 2 }}
                      disabled={isLocked}
                    >
                      {isLocked ? 'Pro Only' : 'View Details'}
                    </Button>
                  </CardContent>
                  
                  {isLocked && (
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      zIndex: 1
                    }}>
                      <Button variant="contained" color="primary" href="/pricing">
                        Upgrade to View
                      </Button>
                    </Box>
                  )}
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button 
              variant="outlined" 
              startIcon={<Download />}
              disabled={!isPro}
            >
              Export Data
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              startIcon={<Assessment />}
              disabled={!isPro}
            >
              Generate Report
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              startIcon={<Settings />}
            >
              Settings
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}