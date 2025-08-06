"use client";

import { Box, Container, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import { Bolt, SolarPower } from "@mui/icons-material";
import ComparisonTable from "@/app/components/home/ComparisonTable";

export default function SurplusInterconnection() {
  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" }}>
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        {/* Page Title */}
        <Typography 
          variant="h2" 
          sx={{ 
            textAlign: "center", 
            fontWeight: 700, 
            color: "#fff",
            mb: 2,
            background: "linear-gradient(45deg, #ffffff 30%, #00E5FF 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Surplus Interconnection
        </Typography>

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
            What is Surplus Interconnection?
          </Typography>
          
          <Paper 
            elevation={0}
            sx={{ 
              p: 5,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
              Surplus Interconnection Service allows new electricity supply resources to connect to the grid using existing infrastructure that serves already operating generators, without exceeding the total output capacity already allocated to the existing resource. FERC Order 845 (2018) cleared a regulatory pathway for generators to add new electricity resources to the grid by utilizing surplus capacity at existing interconnection points.
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
                    <Bolt sx={{ fontSize: 40, color: '#00E5FF', mr: 2 }} />
                    <Typography variant="h5" fontWeight="bold" color="white">
                      Underutilized Capacity
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ color: '#00E5FF', fontWeight: 'bold', mb: 2 }}>
                    200+ GW
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                    Over 200 GW of fossil capacity has capacity factor less than 15%, leaving grid connections unused for significant periods.
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
                      Cost Advantage
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ color: '#00E5FF', fontWeight: 'bold', mb: 2 }}>
                    75%
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                    75% of fossil capacity has operating cost higher than local solar LCOE. Co-locating renewables bypasses interconnection queues and adds cheap electricity.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box 
            sx={{ 
              mt: 5,
              p: 4,
              borderRadius: 3,
              background: "rgba(0, 229, 255, 0.1)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom color="#00E5FF">
              The Opportunity
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px', mx: 'auto' }}>
              By co-locating new solar and wind generation at these underutilized sites, we can bypass lengthy interconnection queues and add cheap electricity while making use of the current infrastructure.
            </Typography>
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