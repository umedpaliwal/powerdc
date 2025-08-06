# Create Sign Up Flow with Plan Selection

## Description
Build the complete sign-up flow including plan selection, form validation, and email verification. This will be the primary conversion point for new users.

## Acceptance Criteria
- [ ] Create plan selection step (Explorer/Professional/Enterprise)
- [ ] Build sign-up form with proper validation
- [ ] Implement email/password registration
- [ ] Add OAuth options (Google, Microsoft)
- [ ] Include company and industry fields
- [ ] Integrate with Supabase Auth
- [ ] Handle email verification flow
- [ ] Show appropriate loading states
- [ ] Handle errors gracefully
- [ ] Redirect to dashboard after successful signup

## UI Components

### Step 1: Plan Selection
```
Choose Your Plan
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Explorer      │  │  Professional   │  │   Enterprise    │
│     FREE        │  │   $99/month     │  │    Custom       │
│                 │  │  14-day trial   │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Step 2: Account Creation Form
- Email (required)
- Password (required, min 8 chars)
- Confirm Password
- Company Name (required)
- Industry Type (dropdown)
- Phone (optional)
- Terms acceptance checkbox

## Files to Create/Modify
- `/app/signup/page.tsx` - Main signup page
- `/app/signup/verify-email/page.tsx` - Email verification page
- `/components/auth/SignUpForm.tsx` - Signup form component
- `/components/auth/PlanSelector.tsx` - Plan selection component
- `/lib/validations/auth.ts` - Form validation schemas

## Technical Notes
```typescript
// Plan types
type Plan = 'explorer' | 'professional' | 'enterprise';

// Form validation with Zod
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  companyName: z.string().min(2),
  industryType: z.enum(['datacenter', 'utility', 'developer', 'other']),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true)
});
```

## Estimate
**Time:** 8-12 hours  
**Priority:** High  
**Assignee:** Frontend Developer

## Labels
- `frontend`
- `authentication`
- `priority-high`
- `conversion`

## Dependencies
- Depends on: #1 (Setup Supabase Authentication)

## Testing
- [ ] Plan selection works correctly
- [ ] Form validation shows appropriate errors
- [ ] Email verification is sent
- [ ] OAuth providers work
- [ ] User is redirected after signup
- [ ] User profile is created in database