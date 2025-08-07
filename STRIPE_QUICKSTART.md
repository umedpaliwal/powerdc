# Quick Stripe Setup Guide for WattCanvas

## Step 1: Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign in or create a new account
3. Make sure you're in **Test mode** (toggle in the top right)
4. Go to [API Keys](https://dashboard.stripe.com/test/apikeys)
5. Copy the following keys to your `.env.local` file:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

## Step 2: Create Your Subscription Products

1. Go to [Products](https://dashboard.stripe.com/test/products)
2. Click **"+ Add product"**
3. Create a product called "WattCanvas Professional"
4. Add pricing:
   - **Monthly Price**: $99/month
   - **Annual Price**: $990/year (save $198)
5. After creating, copy the price IDs to your `.env.local`:
   - Monthly price ID → `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID`
   - Annual price ID → `NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID`

## Step 3: Update Your .env.local File

Replace the placeholder values in your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51ABC...xyz
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...xyz

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_1ABC123...
NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID=price_1ABC456...
```

## Step 4: Restart Your Development Server

```bash
npm run dev
```

## Step 5: Test the Checkout

1. Go to your pricing page
2. Click "Upgrade to Pro"
3. You should be redirected to Stripe checkout
4. Use test card: `4242 4242 4242 4242`
5. Any future expiry date, any CVC, any ZIP

## For Production (Vercel)

Add the same environment variables to your Vercel project:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add all the Stripe variables
5. Redeploy your application

## Need Help?

- Check the [Stripe Documentation](https://stripe.com/docs)
- Review `/STRIPE_SETUP.md` for detailed setup
- Check `/CHECKOUT_TROUBLESHOOTING.md` for common issues