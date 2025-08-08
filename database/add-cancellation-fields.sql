-- Migration to add missing cancellation fields to subscriptions table
-- This fixes the subscription cancellation tracking issue

-- Add cancel_at_period_end field (critical for tracking pending cancellations)
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN DEFAULT FALSE;

-- Add canceled_at timestamp (when the cancellation was initiated)
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS canceled_at TIMESTAMPTZ;

-- Add cancel_at timestamp (future cancellation date if scheduled)
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS cancel_at TIMESTAMPTZ;

-- Add cancellation_details for storing reason/feedback
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS cancellation_details JSONB;

-- Create index for better query performance on cancellation status
CREATE INDEX IF NOT EXISTS idx_subscriptions_cancel_at_period_end 
ON subscriptions(cancel_at_period_end) 
WHERE cancel_at_period_end = TRUE;

-- Update any existing subscriptions that might be in a canceled state
-- but don't have cancel_at_period_end set properly
UPDATE subscriptions
SET cancel_at_period_end = TRUE
WHERE status = 'canceled' 
AND cancel_at_period_end IS NULL;

COMMENT ON COLUMN subscriptions.cancel_at_period_end IS 'Whether the subscription will be canceled at the end of the current period';
COMMENT ON COLUMN subscriptions.canceled_at IS 'Timestamp when the cancellation was initiated';
COMMENT ON COLUMN subscriptions.cancel_at IS 'Future timestamp when the subscription will be canceled';
COMMENT ON COLUMN subscriptions.cancellation_details IS 'JSON object containing cancellation reason, feedback, and comment';