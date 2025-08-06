import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
})

export async function GET(request: NextRequest) {
  try {
    // Get all products with their prices
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    })

    // Get all prices for these products
    const prices = await stripe.prices.list({
      active: true,
      expand: ['data.product'],
    })

    // Group prices by product
    const productsWithPrices = products.data.map(product => {
      const productPrices = prices.data.filter(
        price => price.product === product.id
      )
      
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        metadata: product.metadata,
        prices: productPrices.map(price => ({
          id: price.id,
          unit_amount: price.unit_amount,
          currency: price.currency,
          recurring: price.recurring,
          type: price.type,
          metadata: price.metadata,
        })),
      }
    })

    return NextResponse.json({ products: productsWithPrices })
  } catch (error: any) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}