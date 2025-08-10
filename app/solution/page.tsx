"use client";

import { Box, Container, Typography, Paper, Grid, Card, CardContent, Divider, List, ListItem, ListItemText, Link, Chip } from "@mui/material";
import { Bolt, SolarPower, DataUsage, Battery80, CloudQueue, TrendingUp } from "@mui/icons-material";
import ComparisonTable from "@/app/components/home/ComparisonTable";

export default function SurplusInterconnection() {
  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" }}>
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        {/* What is Surplus Interconnection Section */}
        <Box sx={{ py: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            fontWeight="bold" 
            gutterBottom
            sx={{ mb: 4, color: "#00E5FF" }}
          >
            Powering Data Centers with Surplus Interconnection
          </Typography>
          
          <Paper 
            elevation={0}
            sx={{ 
              p: 5,
              borderRadius: 3,
              background: "rgba(0, 229, 255, 0.1)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              color: 'white',
              mb: 5
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                lineHeight: 1.8,
                textAlign: 'center',
                maxWidth: '900px',
                mx: 'auto'
              }}
            >
              Surplus Interconnection Service, enabled by FERC Order 845, allows data centers to co-locate with existing gas plants and connect to the grid using their unused capacity. By integrating oversized solar arrays and battery storage, data centers can run on clean energy 95% of the time, with the existing gas plant providing backup power for the remaining 5%. This approach bypasses the 5-year interconnection queue, enabling deployment in just 18 months.
            </Typography>
          </Paper>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 40px rgba(0, 229, 255, 0.2)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <DataUsage sx={{ fontSize: 40, color: '#00E5FF', mr: 2 }} />
                    <Typography variant="h5" fontWeight="bold" color="white">
                      Data Center Opportunity
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ color: '#00E5FF', fontWeight: 'bold', mb: 2 }}>
                    1000+ GW
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                    Over 1000 GW of underutilized fossil capacity can host data centers with renewable energy. These sites have existing grid connections, land, and infrastructure ready for immediate deployment.
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, mt: 2 }}>
                    By leveraging surplus interconnection, data centers can deploy in 18 months instead of waiting 5+ years in traditional interconnection queues.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 40px rgba(0, 229, 255, 0.2)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <SolarPower sx={{ fontSize: 40, color: '#764ba2', mr: 2 }} />
                    <Typography variant="h5" fontWeight="bold" color="white">
                      Solar Capacity Formula
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ color: '#00E5FF', fontWeight: 'bold', mb: 2 }}>
                    5x Rule
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                    To achieve 95% renewable power, the solar capacity should be approximately 5 times the data center capacity. This oversized solar array, combined with battery storage, ensures reliable clean energy supply.
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, mt: 2 }}>
                    The existing gas plant provides backup power for only 5% of the time when solar and storage cannot meet demand, creating a highly sustainable and reliable solution.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Example Calculation Box */}
          <Box 
            sx={{ 
              mt: 5,
              p: 4,
              borderRadius: 3,
              background: "rgba(0, 229, 255, 0.1)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom color="#00E5FF" textAlign="center">
              Real-World Example Configuration
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Bolt sx={{ fontSize: 48, color: '#00E5FF', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="white">100 MW</Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">Existing Gas Plant</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <CloudQueue sx={{ fontSize: 48, color: '#764ba2', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="white">100 MW</Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">Data Center</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <SolarPower sx={{ fontSize: 48, color: '#FFC107', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="white">500 MW</Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">Solar Array</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Battery80 sx={{ fontSize: 48, color: '#4CAF50', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="white">1,600 MWh</Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">Battery Storage</Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px', mx: 'auto', mt: 4, textAlign: 'center' }}>
              This configuration provides the data center with 95% renewable energy from solar and storage, while the existing gas plant serves as backup for the remaining 5%, ensuring 99.99% uptime without waiting in interconnection queues.
            </Typography>
          </Box>

          {/* The Opportunity Box */}
          <Box 
            sx={{ 
              mt: 5,
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #203A43 0%, #2C5364 100%)',
              border: "1px solid rgba(0, 229, 255, 0.3)",
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom color="#00E5FF">
              The Strategic Advantage
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: '900px', mx: 'auto' }}>
              By co-locating data centers at underutilized gas plants with oversized solar and battery storage, we can:
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2, maxWidth: '900px', mx: 'auto' }}>
              <Grid item xs={12} sm={6}>
                <Chip 
                  icon={<TrendingUp />} 
                  label="Deploy in 18 months vs 5+ years" 
                  sx={{ 
                    backgroundColor: 'rgba(0, 229, 255, 0.2)', 
                    color: 'white',
                    width: '100%',
                    height: 'auto',
                    padding: '8px',
                    '& .MuiChip-label': { whiteSpace: 'normal' }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chip 
                  icon={<SolarPower />} 
                  label="Achieve 95% renewable energy operation" 
                  sx={{ 
                    backgroundColor: 'rgba(0, 229, 255, 0.2)', 
                    color: 'white',
                    width: '100%',
                    height: 'auto',
                    padding: '8px',
                    '& .MuiChip-label': { whiteSpace: 'normal' }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chip 
                  icon={<Bolt />} 
                  label="Utilize existing grid infrastructure" 
                  sx={{ 
                    backgroundColor: 'rgba(0, 229, 255, 0.2)', 
                    color: 'white',
                    width: '100%',
                    height: 'auto',
                    padding: '8px',
                    '& .MuiChip-label': { whiteSpace: 'normal' }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chip 
                  icon={<CloudQueue />} 
                  label="Ensure 99.99% uptime with gas backup" 
                  sx={{ 
                    backgroundColor: 'rgba(0, 229, 255, 0.2)', 
                    color: 'white',
                    width: '100%',
                    height: 'auto',
                    padding: '8px',
                    '& .MuiChip-label': { whiteSpace: 'normal' }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Comparison Table Section */}
        <Box sx={{ py: 6 }}>
          <ComparisonTable />
        </Box>
      </Container>
    </Box>
  );
}