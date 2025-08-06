# Checkout Troubleshooting Guide

This guide helps you debug and fix the "An error occurred during checkout" issue in the PowerDC web application.

## Quick Diagnosis

Visit `/checkout` and check the "Stripe Debug Info" section that now appears on the page. This will show you exactly what's misconfigured.

## Common Issues & Solutions

### 1. Missing or Invalid Stripe Price IDs

**Symptom**: Error message "Stripe price configuration is incomplete"

**Cause**: Using placeholder price IDs instead of real Stripe price IDs

**Solution**:
1. Set up your Stripe account
2. Add your Stripe keys to `.env.local`
3. Run `npm run setup:stripe` to create test products
4. Copy the generated price IDs to your environment variables

### 2. Missing Environment Variables

**Symptom**: "Stripe is not configured" or "Stripe failed to load"

**Required Variables** (add to `.env.local`):
```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID=price_...
```

### 3. Invalid Price IDs in Stripe

**Symptom**: "The selected plan is not available" or "No such price"

**Solution**:
1. Check your Stripe Dashboard → Products
2. Verify the price IDs exist and are active
3. Ensure they match the IDs in your environment variables

### 4. Database Configuration Issues

**Symptom**: Database-related errors in server logs

**Solution**:
1. Run the SQL commands from `/database/stripe-setup.sql` in Supabase
2. Ensure RLS policies are properly configured

## Step-by-Step Setup

### 1. Stripe Account Setup

1. Create a Stripe account at https://dashboard.stripe.com
2. Go to **Developers** → **API Keys**
3. Copy your **Publishable key** and **Secret key**

### 2. Environment Configuration

Create/update `.env.local`:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (required for user authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Create Stripe Products

Run the automated setup:

```bash
npm run setup:stripe
```

This will create test products and give you the price IDs to add to your environment:

```bash
# Add these to .env.local
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_1234567890abcdef
NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID=price_0987654321fedcba
```

### 4. Database Setup

In your Supabase SQL editor, run:

```sql
-- Copy and paste the contents of /database/stripe-setup.sql
```

### 5. Restart Development Server

```bash
npm run dev
```

## Testing the Fix

1. Go to `/checkout` 
2. The debug info should show all variables as "Configured"
3. Click "Subscribe for $99/month"
4. You should be redirected to Stripe's checkout page

### Test Cards

Use these test card numbers in Stripe's checkout:

- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002` 
- **Requires Authentication**: `4000 0025 0000 3155`

## Debugging Tools

### Browser Console

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for detailed error messages that now include:
   - Price ID validation
   - Stripe configuration status
   - Detailed error context

### Server Logs

The API now logs detailed information:

```bash
npm run dev
```

Check the terminal for detailed logs about:
- Stripe configuration status
- Price validation results
- Checkout session creation details

### Network Tab

In Developer Tools → Network:
1. Filter by "create-checkout-session"
2. Check the response for detailed error information

## Fixed Issues

The following improvements have been made:

✅ **Better Error Messages**: Specific error messages instead of generic "checkout error"
✅ **Price ID Validation**: Validates price IDs exist in Stripe before creating sessions
✅ **Environment Variable Checks**: Clear indicators of missing or misconfigured variables
✅ **Debug Information**: Visual debug panel on checkout page
✅ **Detailed Logging**: Comprehensive server and client-side logging
✅ **Automated Setup**: Script to create Stripe products automatically

## Still Having Issues?

1. Check the debug panel on `/checkout` page
2. Look at browser console errors
3. Check server logs in terminal
4. Verify all environment variables are set correctly
5. Ensure Stripe products exist in your dashboard
6. Make sure your Supabase database has the required tables

## Production Considerations

When deploying to production:

1. Replace test keys with live Stripe keys
2. Update webhook endpoints
3. Set production URLs in environment variables
4. Test with real payment methods

## Contact Support

If you're still experiencing issues, provide:

1. Screenshot of the debug panel from `/checkout`
2. Browser console errors
3. Server log messages
4. Your environment configuration (without revealing secrets)