'use client'

import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Alert,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Chip
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription, useUsageLimit } from '@/hooks/useSubscription'
import { useEffect, useState } from 'react'

export default function ExportPage() {
  const { user, loading: authLoading } = useAuth()
  const { subscription, featureAccess, loading: subLoading } = useSubscription()
  const exportUsage = useUsageLimit('exports')
  const router = useRouter()

  const [exportType, setExportType] = useState('')
  const [format, setFormat] = useState('')
  const [dateRange, setDateRange] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin')
    }
  }, [user, authLoading, router])

  if (authLoading || subLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!user) {
    return null
  }

  if (!featureAccess.canExportData) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Data Export is available for Professional and Enterprise plans only.
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => router.push('/account?upgrade=true&feature=professional')}
        >
          Upgrade to Professional
        </Button>
      </Box>
    )
  }

  const canExport = exportUsage.unlimited || exportUsage.remaining > 0

  const handleExport = () => {
    if (!canExport) {
      alert('You have reached your monthly export limit. Please upgrade your plan for more exports.')
      return
    }
    
    // Simulate export process
    alert(`Exporting ${exportType} data in ${format} format for ${dateRange}...`)
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Data Export
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Export PowerDC data for analysis in your preferred tools. 
        Your {subscription?.plan_type} plan includes {exportUsage.unlimited ? 'unlimited' : exportUsage.limit} exports per month.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Usage Status
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Chip 
                label={`${exportUsage.current}/${exportUsage.unlimited ? '∞' : exportUsage.limit} used`}
                color={canExport ? 'success' : 'error'}
              />
            </Grid>
            {!exportUsage.unlimited && (
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  {exportUsage.remaining} exports remaining this month
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Export Configuration
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Data Type</InputLabel>
                <Select
                  value={exportType}
                  label="Data Type"
                  onChange={(e) => setExportType(e.target.value)}
                >
                  <MenuItem value="thermal">Thermal Plants</MenuItem>
                  <MenuItem value="renewable">Renewable Plants</MenuItem>
                  <MenuItem value="combined">Combined Dataset</MenuItem>
                  <MenuItem value="analysis">Analysis Results</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Format</InputLabel>
                <Select
                  value={format}
                  label="Format"
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <MenuItem value="csv">CSV</MenuItem>
                  <MenuItem value="json">JSON</MenuItem>
                  <MenuItem value="xlsx">Excel (.xlsx)</MenuItem>
                  <MenuItem value="parquet">Parquet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="last-month">Last Month</MenuItem>
                  <MenuItem value="last-quarter">Last Quarter</MenuItem>
                  <MenuItem value="last-year">Last Year</MenuItem>
                  <MenuItem value="all-time">All Time</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {dateRange === 'custom' && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Export Options
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Available Data Fields:</strong>
          </Typography>
          
          <Box component="ul" sx={{ pl: 2 }}>
            <li>Plant identification and location data</li>
            <li>Generation capacity and technology type</li>
            <li>Historical performance metrics</li>
            <li>Environmental impact data</li>
            <li>Economic indicators and costs</li>
            <li>Grid interconnection information</li>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            All exports include metadata and data quality indicators.
            Large datasets may be split into multiple files.
          </Typography>
        </CardContent>
      </Card>

      <Box display="flex" gap={2} justifyContent="flex-end">
        <Button 
          variant="outlined" 
          onClick={() => router.push('/dashboard')}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleExport}
          disabled={!canExport || !exportType || !format || !dateRange}
        >
          {canExport ? 'Start Export' : 'Limit Reached'}
        </Button>
      </Box>

      {!canExport && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          You've reached your monthly export limit. 
          <Button 
            size="small" 
            onClick={() => router.push('/account?upgrade=true')}
            sx={{ ml: 1 }}
          >
            Upgrade Plan
          </Button>
        </Alert>
      )}
    </Box>
  )
}