'use client'

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import {
  Check,
  Warning,
  ErrorOutline,
  ManageAccounts,
  Cancel,
  Restore,
} from '@mui/icons-material'
import { useSubscription } from '@/hooks/useSubscription'
import { formatPrice, isSubscriptionActive, subscriptionNeedsAttention } from '@/lib/stripe/utils'

export default function SubscriptionManager() {
  const {
    subscription,
    featureAccess,
    loading,
    error,
    manageSubscription,
    cancelSubscription,
    reactivateSubscription,
  } = useSubscription()

  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const handleManageSubscription = async () => {
    setActionLoading('manage')
    setActionError(null)
    try {
      await manageSubscription()
    } catch (error: any) {
      setActionError(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancelSubscription = async () => {
    setActionLoading('cancel')
    setActionError(null)
    try {
      await cancelSubscription()
      setCancelDialogOpen(false)
    } catch (error: any) {
      setActionError(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReactivateSubscription = async () => {
    setActionLoading('reactivate')
    setActionError(null)
    try {
      await reactivateSubscription()
    } catch (error: any) {
      setActionError(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    if (isSubscriptionActive(status as any)) return 'success'
    if (subscriptionNeedsAttention(status as any)) return 'warning'
    return 'error'
  }

  const getStatusIcon = (status: string) => {
    if (isSubscriptionActive(status as any)) return <Check />
    if (subscriptionNeedsAttention(status as any)) return <Warning />
    return <ErrorOutline />
  }

  if (loading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">
            Failed to load subscription data: {error}
          </Alert>
        </CardContent>
      </Card>
    )
  }

  // Check if user has a paid subscription (has stripe_subscription_id)
  const hasPaidSubscription = subscription?.stripe_subscription_id

  if (!subscription || !hasPaidSubscription) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {subscription?.plan_type === 'explorer' ? 'Explorer Plan' : 'No Active Subscription'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            You're currently on the Explorer plan with limited features.
          </Typography>
          <Button
            variant="contained"
            href="/pricing"
            sx={{ mt: 2 }}
          >
            Upgrade to Professional
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Subscription Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your PowerDC Professional subscription
              </Typography>
            </Box>
            <Chip
              icon={getStatusIcon(subscription.status)}
              label={subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              color={getStatusColor(subscription.status)}
              variant="outlined"
            />
          </Box>

          {actionError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {actionError}
            </Alert>
          )}

          {subscription.status === 'past_due' && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              Your payment is past due. Please update your payment method to avoid service interruption.
            </Alert>
          )}

          {subscription.cancel_at_period_end && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Your subscription will be canceled at the end of the current billing period (
              {subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}
              ).
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              Plan Features
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Check sx={{ 
                    color: featureAccess.canExportData ? '#4caf50' : 'rgba(255,255,255,0.3)' 
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Data Export"
                  secondary={featureAccess.canExportData ? 'Enabled' : 'Not available'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check sx={{ 
                    color: featureAccess.hasApiAccess ? '#4caf50' : 'rgba(255,255,255,0.3)' 
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="API Access"
                  secondary={featureAccess.hasApiAccess ? `${featureAccess.monthlyApiLimit === -1 ? 'Unlimited' : featureAccess.monthlyApiLimit} calls/month` : 'Not available'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check sx={{ 
                    color: featureAccess.canAccessApiDocs ? '#4caf50' : 'rgba(255,255,255,0.3)' 
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="API Documentation"
                  secondary={featureAccess.canAccessApiDocs ? 'Full access' : 'Not available'}
                />
              </ListItem>
            </List>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<ManageAccounts />}
              onClick={handleManageSubscription}
              disabled={actionLoading === 'manage'}
            >
              {actionLoading === 'manage' ? (
                <CircularProgress size={20} />
              ) : (
                'Manage Subscription'
              )}
            </Button>

            {subscription.cancel_at_period_end ? (
              <Button
                variant="outlined"
                startIcon={<Restore />}
                onClick={handleReactivateSubscription}
                disabled={actionLoading === 'reactivate'}
                color="success"
              >
                {actionLoading === 'reactivate' ? (
                  <CircularProgress size={20} />
                ) : (
                  'Reactivate Subscription'
                )}
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={() => setCancelDialogOpen(true)}
                disabled={actionLoading !== null}
                color="error"
              >
                Cancel Subscription
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Cancel Confirmation Dialog - only show for paid subscriptions */}
      {hasPaidSubscription && (
        <Dialog
          open={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Cancel Subscription</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to cancel your subscription?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your subscription will remain active until the end of your current billing period (
              {subscription?.current_period_end && new Date(subscription.current_period_end).toLocaleDateString()}
              ). After that, you'll be downgraded to the Explorer plan.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCancelDialogOpen(false)}>
              Keep Subscription
            </Button>
            <Button
              onClick={handleCancelSubscription}
              color="error"
              variant="contained"
              disabled={actionLoading === 'cancel'}
            >
              {actionLoading === 'cancel' ? (
                <CircularProgress size={20} />
              ) : (
                'Cancel Subscription'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}