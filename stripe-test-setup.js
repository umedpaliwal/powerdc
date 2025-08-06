// Stripe Test Setup Script
// Run this script to create test products in your Stripe Dashboard

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function setupTestProducts() {
  try {
    // Create Professional Plan Product
    const product = await stripe.products.create({
      name: 'PowerDC Professional',
      description: 'Advanced features for power system analysis and renewable energy integration',
      metadata: {
        plan_type: 'professional',
        features: JSON.stringify([
          'Access to 1,000+ sites',
          'Real-time capacity data',
          'Detailed site analytics',
          'API access (1000 calls/month)',
          'Export data (CSV/JSON)',
          'Monthly market reports',
          'Email support'
        ])
      }
    });

    // Create Monthly Price
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 9900, // $99.00 in cents
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        billing_period: 'monthly'
      }
    });

    // Create Annual Price
    const annualPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 99000, // $990.00 in cents
      currency: 'usd',
      recurring: {
        interval: 'year',
      },
      metadata: {
        billing_period: 'annual'
      }
    });

    console.log('✅ Test products created successfully!');
    console.log('\n📋 Update these values in your code:');
    console.log(`Monthly Price ID: ${monthlyPrice.id}`);
    console.log(`Annual Price ID: ${annualPrice.id}`);
    console.log('\n📝 Update /app/checkout/CheckoutContent.tsx:');
    console.log(`const PRICE_IDS = {`);
    console.log(`  monthly: '${monthlyPrice.id}',`);
    console.log(`  annual: '${annualPrice.id}',`);
    console.log(`}`);

  } catch (error) {
    console.error('❌ Error setting up test products:', error.message);
  }
}

// Only run if called directly
if (require.main === module) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ Please set STRIPE_SECRET_KEY environment variable');
    process.exit(1);
  }
  
  console.log('🚀 Setting up Stripe test products...');
  setupTestProducts();
}

module.exports = { setupTestProducts };