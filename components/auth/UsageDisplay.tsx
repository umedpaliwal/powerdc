'use client'

import { Box, Typography, LinearProgress, Chip, Card, CardContent } from '@mui/material'
import { useSubscription, useUsageLimit } from '@/hooks/useSubscription'

interface UsageDisplayProps {
  type: 'reports' | 'api' | 'exports'
  title: string
  compact?: boolean
}

export default function UsageDisplay({ type, title, compact = false }: UsageDisplayProps) {
  const usage = useUsageLimit(type)

  if (compact) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          {title}:
        </Typography>
        {usage.unlimited ? (
          <Chip label="Unlimited" size="small" color="success" />
        ) : (
          <Chip 
            label={`${usage.current}/${usage.limit}`} 
            size="small" 
            color={usage.remaining > usage.limit * 0.2 ? 'success' : 'warning'}
          />
        )}
      </Box>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        
        {usage.unlimited ? (
          <Typography color="success.main" variant="body1">
            Unlimited usage
          </Typography>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                {usage.current} of {usage.limit} used
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {usage.remaining} remaining
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={(usage.current / usage.limit) * 100}
              color={
                usage.remaining > usage.limit * 0.5 ? 'success' : 
                usage.remaining > usage.limit * 0.2 ? 'warning' : 'error'
              }
              sx={{ height: 8, borderRadius: 4 }}
            />
            
            {usage.remaining <= usage.limit * 0.1 && (
              <Typography 
                variant="caption" 
                color="error" 
                sx={{ mt: 1, display: 'block' }}
              >
                You're approaching your monthly limit
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export function UsageSummary() {
  const { subscription } = useSubscription()
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Current Plan: {subscription?.plan_type || 'Explorer'}
      </Typography>
      
      <Box display="flex" gap={2} flexWrap="wrap">
        <UsageDisplay type="reports" title="Reports" compact />
        <UsageDisplay type="api" title="API Calls" compact />
        <UsageDisplay type="exports" title="Exports" compact />
      </Box>
    </Box>
  )
}