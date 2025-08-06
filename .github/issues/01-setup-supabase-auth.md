# Setup Supabase Authentication

## Description
Initialize Supabase in the project and configure authentication for the PowerDC platform. This is the foundation for all authentication features.

## Acceptance Criteria
- [ ] Install Supabase client libraries (`@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`)
- [ ] Create Supabase project and obtain credentials
- [ ] Setup environment variables in `.env.local`
- [ ] Create Supabase client singleton
- [ ] Setup auth context/provider for Next.js
- [ ] Configure email templates in Supabase dashboard
- [ ] Setup database schema for user profiles
- [ ] Configure OAuth providers (Google, Microsoft)

## Technical Implementation
```typescript
// Required environment variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Database Schema
```sql
-- User profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  company_name TEXT,
  industry_type TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

## Files to Create/Modify
- `/lib/supabase/client.ts` - Supabase client
- `/lib/supabase/server.ts` - Server-side client
- `/contexts/AuthContext.tsx` - Auth context provider
- `/types/auth.ts` - TypeScript types
- `.env.local` - Environment variables

## Estimate
**Time:** 4-6 hours  
**Priority:** High  
**Assignee:** Backend Developer

## Labels
- `backend`
- `authentication`
- `priority-high`
- `setup`

## Dependencies
None - This is the foundation issue

## Testing
- [ ] Supabase client connects successfully
- [ ] Environment variables are properly loaded
- [ ] Auth context provides user state
- [ ] Database tables are created with proper RLS