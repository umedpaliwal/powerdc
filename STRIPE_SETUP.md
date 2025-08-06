# Stripe Payment Integration Setup Guide

This guide explains how to complete the Stripe payment integration setup for PowerDC-Web.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Your Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_... # Your webhook endpoint secret

# Supabase Service Role Key (for webhooks)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Stripe Dashboard Setup

### 1. Create Products and Prices

In your Stripe Dashboard:

1. Go to **Products** → **Add product**
2. Create a "Professional Plan" product
3. Add two prices:
   - Monthly: `price_monthly_professional` ($99/month)
   - Annual: `price_annual_professional` ($990/year)

### 2. Update Price IDs

Update the price IDs in `/app/checkout/CheckoutContent.tsx`:

```typescript
const PRICE_IDS = {
  monthly: 'price_1234567890', // Replace with actual monthly price ID
  annual: 'price_0987654321',  // Replace with actual annual price ID
}
```

### 3. Configure Webhooks

1. Go to **Developers** → **Webhooks** in your Stripe Dashboard
2. Add endpoint: `https://yourdomain.com/api/stripe/webhooks`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Database Setup

Run the SQL commands in `/database/stripe-setup.sql` in your Supabase SQL editor to create the necessary tables and policies.

## Testing

### Test Cards

Use these test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

All test cards accept:
- Any future expiry date
- Any 3-digit CVC
- Any postal code

### Test Webhooks Locally

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/stripe/webhooks`
4. Use the webhook signing secret from the CLI output

## Features Implemented

### ✅ Checkout Flow
- Stripe Checkout session creation
- Redirect to secure Stripe payment page
- Success/cancel URL handling
- Subscription creation

### ✅ Webhook Handlers
- Payment success/failure handling
- Subscription lifecycle management
- Customer portal integration
- Database synchronization

### ✅ Customer Portal
- Subscription management
- Payment method updates
- Invoice history
- Cancel/reactivate subscriptions

### ✅ Frontend Integration
- React hooks for subscription management
- Real-time subscription status
- Feature access control
- Usage tracking integration

## API Endpoints

The following API endpoints have been created:

- `POST /api/stripe/create-checkout-session` - Create checkout session
- `POST /api/stripe/webhooks` - Handle Stripe webhooks
- `POST /api/stripe/create-portal-session` - Create customer portal session
- `GET /api/stripe/products` - List products and prices
- `POST /api/stripe/cancel-subscription` - Cancel subscription
- `POST /api/stripe/reactivate-subscription` - Reactivate subscription

## Security Notes

- All sensitive operations use server-side API routes
- Webhook endpoints verify Stripe signatures
- Database operations use RLS policies
- Service role key is only used in secure webhook handlers

## Next Steps

1. Set up actual Stripe products in your dashboard
2. Update price IDs in the code
3. Configure webhook endpoints for production
4. Test the complete flow in Stripe's test mode
5. Deploy and switch to live mode when ready

## Troubleshooting

### Common Issues

1. **Webhook failures**: Check signing secret and endpoint URL
2. **Database errors**: Ensure tables are created and RLS is configured
3. **Authentication errors**: Verify environment variables
4. **Price not found**: Update price IDs to match your Stripe dashboard

### Debug Tips

- Check browser network tab for API errors
- Monitor Stripe Dashboard logs
- Check Supabase logs for database issues
- Use Stripe CLI for local webhook testing