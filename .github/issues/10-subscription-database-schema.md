# Create Subscription Database Schema

## Description
Set up Supabase database tables for subscription management, user profiles, and usage tracking. This will support the freemium model with Explorer and Professional tiers.

## Acceptance Criteria
- [ ] Create user_profiles table with company information
- [ ] Create subscriptions table for plan management
- [ ] Create usage_tracking table for monitoring limits
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create database functions for common operations
- [ ] Add indexes for performance
- [ ] Create migration scripts
- [ ] Set up triggers for updated_at timestamps

## Database Schema

```sql
-- User profiles extension
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  company_name TEXT NOT NULL,
  industry_type TEXT CHECK (industry_type IN ('datacenter', 'utility', 'developer', 'other')),
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT CHECK (plan_type IN ('explorer', 'professional', 'enterprise')) DEFAULT 'explorer',
  status TEXT CHECK (status IN ('active', 'trialing', 'canceled', 'past_due')) DEFAULT 'active',
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ DEFAULT NOW(),
  current_period_end TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Usage tracking table
CREATE TABLE usage_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  reports_generated INTEGER DEFAULT 0,
  api_calls INTEGER DEFAULT 0,
  data_exports INTEGER DEFAULT 0,
  last_access TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Saved searches/sites
CREATE TABLE saved_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  filters JSONB,
  saved_sites TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_usage_tracking_user_month ON usage_tracking(user_id, month);
CREATE INDEX idx_saved_searches_user_id ON saved_searches(user_id);
```

## Row Level Security Policies

```sql
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Subscriptions policies  
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Usage tracking policies
CREATE POLICY "Users can view own usage" ON usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

-- Saved searches policies
CREATE POLICY "Users can manage own searches" ON saved_searches
  FOR ALL USING (auth.uid() = user_id);
```

## Database Functions

```sql
-- Function to check if user has professional access
CREATE OR REPLACE FUNCTION has_professional_access(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM subscriptions 
    WHERE user_id = user_uuid 
    AND plan_type IN ('professional', 'enterprise')
    AND status IN ('active', 'trialing')
  );
END;
$$ LANGUAGE plpgsql;

-- Function to increment usage
CREATE OR REPLACE FUNCTION increment_usage(
  user_uuid UUID,
  usage_type TEXT
) RETURNS void AS $$
BEGIN
  INSERT INTO usage_tracking (user_id, month, reports_generated)
  VALUES (user_uuid, date_trunc('month', NOW()), 
    CASE WHEN usage_type = 'report' THEN 1 ELSE 0 END)
  ON CONFLICT (user_id, month) 
  DO UPDATE SET
    reports_generated = usage_tracking.reports_generated + 
      CASE WHEN usage_type = 'report' THEN 1 ELSE 0 END,
    last_access = NOW();
END;
$$ LANGUAGE plpgsql;
```

## Triggers

```sql
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Estimate
**Time:** 4-6 hours  
**Priority:** High  
**Assignee:** Backend Developer

## Labels
- `backend`
- `database`
- `subscription`
- `priority-high`

## Dependencies
- Depends on: #1 (Setup Supabase Authentication)

## Testing
- [ ] All tables created successfully
- [ ] RLS policies work correctly
- [ ] Functions execute properly
- [ ] Triggers fire on updates
- [ ] Indexes improve query performance
- [ ] Migration scripts run cleanly