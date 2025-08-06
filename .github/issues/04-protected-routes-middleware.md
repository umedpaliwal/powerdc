# Implement Protected Routes & Middleware

## Description
Add authentication middleware to protect dashboard and other authenticated pages. Implement plan-based access control for different features.

## Acceptance Criteria
- [ ] Create Next.js middleware for auth checks
- [ ] Redirect unauthenticated users to sign in
- [ ] Implement plan-based access control
- [ ] Show loading states during auth verification
- [ ] Handle session expiry gracefully
- [ ] Protect API routes
- [ ] Add user context throughout app
- [ ] Handle different subscription tiers

## Protected Routes Structure
```
Public Routes:
/ (homepage)
/signin
/signup
/forgot-password
/pricing

Protected Routes (Requires Auth):
/dashboard
/dashboard/thermal
/dashboard/renewable
/account
/account/billing

Protected Routes (Professional+ Only):
/api-docs
/export (data export features)
```

## Files to Create/Modify
- `/middleware.ts` - Next.js middleware
- `/lib/auth/middleware.ts` - Auth middleware helpers
- `/lib/auth/permissions.ts` - Permission checking
- `/hooks/useAuth.ts` - Auth hook
- `/hooks/useSubscription.ts` - Subscription status hook

## Technical Implementation
```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  // Check if route requires authentication
  if (isProtectedRoute(req.nextUrl.pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    
    // Check plan-based access
    if (requiresProfessional(req.nextUrl.pathname)) {
      const plan = await getUserPlan(session.user.id);
      if (plan === 'explorer') {
        return NextResponse.redirect(new URL('/upgrade', req.url));
      }
    }
  }
  
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*', '/api-docs/:path*']
};
```

## Subscription Tiers Logic
```typescript
enum PlanTier {
  Explorer = 'explorer',
  Professional = 'professional',
  Enterprise = 'enterprise'
}

const featureAccess = {
  viewDashboard: [PlanTier.Explorer, PlanTier.Professional, PlanTier.Enterprise],
  exportData: [PlanTier.Professional, PlanTier.Enterprise],
  apiAccess: [PlanTier.Professional, PlanTier.Enterprise],
  unlimitedReports: [PlanTier.Professional, PlanTier.Enterprise],
};
```

## Estimate
**Time:** 6-8 hours  
**Priority:** High  
**Assignee:** Full-stack Developer

## Labels
- `fullstack`
- `authentication`
- `security`
- `priority-high`

## Dependencies
- Depends on: #1 (Setup Supabase Authentication)

## Testing
- [ ] Unauthenticated users are redirected
- [ ] Authenticated users can access dashboard
- [ ] Plan restrictions work correctly
- [ ] Session refresh works
- [ ] API routes are protected
- [ ] Loading states display properly