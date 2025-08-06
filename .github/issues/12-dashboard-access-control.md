# Implement Dashboard Access Control

## Description
Add access control to the existing dashboard based on user authentication status and subscription tier. Show upgrade prompts for free users when they hit limits.

## Acceptance Criteria
- [ ] Gate dashboard access behind authentication
- [ ] Track usage for free tier users (10 reports/month)
- [ ] Show usage counter for free users
- [ ] Display upgrade prompts at appropriate times
- [ ] Disable export features for free tier
- [ ] Add "Upgrade to Professional" buttons
- [ ] Show trial countdown for trial users
- [ ] Implement soft walls (show data but limit actions)

## Access Control Rules

### Unauthenticated Users
- Redirect to sign-in page
- Show message: "Sign up free to explore our platform"

### Explorer (Free) Users
- ✅ View map and all sites
- ✅ Basic site information popup
- ✅ Search and filter (basic)
- ⚠️ 10 detailed site reports/month
- ❌ No CSV/Excel export
- ❌ No advanced filters
- ❌ No API access

### Professional Users
- ✅ All features unlocked
- ✅ Unlimited site reports
- ✅ Export functionality
- ✅ Advanced filtering
- ✅ API documentation

### Trial Users
- All Professional features
- Show: "14 days left in trial"
- Reminder emails at 7, 3, 1 day

## UI Components to Add

### Usage Widget (Free Users)
```
Reports This Month: 7/10
[Upgrade for Unlimited →]
```

### Upgrade Prompts
- When hitting export: "Upgrade to Professional to export data"
- At 8/10 reports: "You're running low on reports"
- At 10/10: "You've reached your limit. Upgrade to continue"

### Trial Banner
```
🎉 Your Professional trial expires in 7 days
[Subscribe Now] [Remind Me Later]
```

## Files to Modify
- `/app/components/thermal/ThermalDashboardContent.tsx`
- `/app/components/re/ReDashboardContent.tsx`
- `/app/components/dashboard-sidebar.tsx`
- `/app/components/dashboard-filters.tsx`
- `/hooks/useSubscription.ts` - New hook for subscription status
- `/hooks/useUsageTracking.ts` - New hook for usage tracking

## Technical Implementation
```typescript
// useSubscription hook
export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState({ reports: 0, limit: 10 });
  
  // Fetch subscription and usage data
  useEffect(() => {
    if (user) {
      fetchSubscription(user.id);
      fetchUsage(user.id);
    }
  }, [user]);
  
  return {
    plan: subscription?.plan_type || 'explorer',
    isTrialing: subscription?.status === 'trialing',
    trialEndsAt: subscription?.trial_ends_at,
    usage,
    canExport: subscription?.plan_type !== 'explorer',
    canAccessReport: usage.reports < usage.limit || subscription?.plan_type !== 'explorer'
  };
}

// Dashboard modification
const handleSiteClick = async (siteId: string) => {
  if (!canAccessReport) {
    showUpgradeModal();
    return;
  }
  
  // Track usage for free users
  if (plan === 'explorer') {
    await incrementUsage('report');
  }
  
  // Show site details
  showSiteDetails(siteId);
};
```

## Upgrade Modal Design
```
You've Reached Your Free Tier Limit

Explorer Plan: 10 reports/month
You've used: 10/10

Upgrade to Professional for:
✓ Unlimited site reports
✓ Data exports
✓ Advanced features

[Upgrade Now - $99/month] [Maybe Later]
```

## Estimate
**Time:** 8-10 hours  
**Priority:** High  
**Assignee:** Full-stack Developer

## Labels
- `fullstack`
- `dashboard`
- `access-control`
- `monetization`

## Dependencies
- Depends on: #1, #4, #10 (Auth, Middleware, Database)

## Testing
- [ ] Free users hit usage limits correctly
- [ ] Professional users have unlimited access
- [ ] Export is blocked for free users
- [ ] Usage tracking increments properly
- [ ] Upgrade prompts appear at right times
- [ ] Trial countdown works