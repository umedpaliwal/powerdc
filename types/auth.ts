export type UserProfile = {
  id: string
  email?: string
  company_name?: string
  industry_type?: 'datacenter' | 'utility' | 'developer' | 'other'
  phone?: string
  created_at?: string
  updated_at?: string
}

export type Subscription = {
  id: string
  user_id: string
  plan_type: 'explorer' | 'professional' | 'enterprise'
  status: 'active' | 'trialing' | 'canceled' | 'past_due'
  trial_ends_at?: string
  current_period_start?: string
  current_period_end?: string
  cancel_at_period_end?: boolean
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at?: string
  updated_at?: string
}

export type UsageTracking = {
  id: string
  user_id: string
  month: string
  reports_generated: number
  api_calls: number
  data_exports: number
  last_access?: string
  created_at?: string
  updated_at?: string
}