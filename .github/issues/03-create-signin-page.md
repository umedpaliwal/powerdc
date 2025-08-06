# Create Sign In Page

## Description
Build the sign-in page with email/password and OAuth options. Include forgot password functionality and proper error handling.

## Acceptance Criteria
- [ ] Email/password sign in form
- [ ] Google OAuth integration
- [ ] Microsoft OAuth integration
- [ ] "Remember me" checkbox functionality
- [ ] Forgot password flow
- [ ] Loading states during authentication
- [ ] Error message display
- [ ] Redirect to intended page after login
- [ ] Link to sign up page

## UI Design
```
Welcome Back to PowerDC
┌────────────────────────────────┐
│ Email                          │
│ ──────────────────────────     │
│                                │
│ Password                       │
│ ──────────────────────────     │
│                                │
│ □ Remember me                  │
│                                │
│ [Sign In]                      │
│                                │
│ Forgot password?               │
│                                │
│ ──── Or continue with ────     │
│                                │
│ [Google] [Microsoft]           │
│                                │
│ Don't have an account?         │
│ Sign up free →                 │
└────────────────────────────────┘
```

## Files to Create/Modify
- `/app/signin/page.tsx` - Sign in page
- `/app/forgot-password/page.tsx` - Password reset page
- `/app/reset-password/page.tsx` - Password reset confirmation
- `/components/auth/SignInForm.tsx` - Sign in form component
- `/components/auth/OAuthButtons.tsx` - OAuth button components

## Technical Implementation
```typescript
// Sign in function
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Redirect to dashboard or intended page
  const intended = searchParams.get('redirect') || '/dashboard';
  router.push(intended);
};

// OAuth sign in
const signInWithProvider = async (provider: 'google' | 'azure') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
};
```

## Estimate
**Time:** 4-6 hours  
**Priority:** High  
**Assignee:** Frontend Developer

## Labels
- `frontend`
- `authentication`
- `priority-high`

## Dependencies
- Depends on: #1 (Setup Supabase Authentication)

## Testing
- [ ] Email/password login works
- [ ] OAuth providers redirect correctly
- [ ] Remember me persists session
- [ ] Forgot password sends reset email
- [ ] Error messages display correctly
- [ ] Redirects work as expected