# Create User Account Management Pages

## Description
Build user account pages for profile management, subscription management, and billing. This allows users to manage their account settings and subscription.

## Acceptance Criteria
- [ ] Create account overview page
- [ ] Build profile edit form
- [ ] Show current subscription status
- [ ] Add upgrade/downgrade options
- [ ] Display usage statistics
- [ ] Include billing history (if applicable)
- [ ] Add password change functionality
- [ ] Show API keys for Professional users

## Page Structure

### /account
Main account overview with tabs:
- Profile
- Subscription
- Usage
- Security
- API (Professional only)

### Profile Tab
```
Company Information
┌────────────────────────────────┐
│ Company Name: [___________]     │
│ Industry:     [Dropdown    ▼]   │
│ Phone:        [___________]     │
│ Email:        user@example.com  │
│                                 │
│ [Save Changes]                  │
└────────────────────────────────┘
```

### Subscription Tab
```
Current Plan: Professional
Status: Active
Next billing: Dec 5, 2024 - $99

[Manage Subscription] [Cancel Plan]

Features Included:
✓ Unlimited site reports
✓ Data exports
✓ API access
✓ Priority support
```

### Usage Tab
```
Current Month Usage (Nov 2024)

Reports Generated: 47
Data Exports: 12
API Calls: 342/3000

[Download Usage Report]
```

### Security Tab
- Change password
- Two-factor authentication (future)
- Active sessions
- Sign out all devices

### API Tab (Professional only)
```
API Key: sk_live_xxxxxxxxxxxx [Copy] [Regenerate]

Documentation: /api-docs
Rate Limit: 100 requests/hour

Recent API Usage:
[Chart showing last 7 days]
```

## Files to Create
- `/app/account/page.tsx` - Main account page
- `/app/account/layout.tsx` - Account layout with navigation
- `/components/account/ProfileForm.tsx`
- `/components/account/SubscriptionCard.tsx`
- `/components/account/UsageStats.tsx`
- `/components/account/SecuritySettings.tsx`
- `/components/account/APIKeys.tsx`

## Technical Implementation
```typescript
// Account layout with tabs
export function AccountLayout({ children }) {
  const pathname = usePathname();
  
  const tabs = [
    { name: 'Profile', href: '/account' },
    { name: 'Subscription', href: '/account/subscription' },
    { name: 'Usage', href: '/account/usage' },
    { name: 'Security', href: '/account/security' },
    { name: 'API', href: '/account/api', requiresPro: true },
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <TabNavigation tabs={tabs} current={pathname} />
      {children}
    </div>
  );
}

// Profile update function
async function updateProfile(data: ProfileData) {
  const { error } = await supabase
    .from('user_profiles')
    .update(data)
    .eq('id', user.id);
    
  if (error) throw error;
  toast.success('Profile updated successfully');
}
```

## Stripe Integration Notes
- Use Stripe Customer Portal for subscription management
- Redirect to Stripe for payment method updates
- Webhook handling for subscription changes

## Estimate
**Time:** 10-12 hours  
**Priority:** Medium  
**Assignee:** Full-stack Developer

## Labels
- `fullstack`
- `account`
- `user-management`
- `billing`

## Dependencies
- Depends on: #1, #10 (Auth, Database Schema)
- Related to: #11 (Pricing)

## Testing
- [ ] Profile updates save correctly
- [ ] Subscription status displays accurately
- [ ] Usage stats are current
- [ ] Password change works
- [ ] API key generation works
- [ ] Tab navigation functions properly