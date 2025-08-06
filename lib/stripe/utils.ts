import Stripe from 'stripe'

export interface PriceWithProduct extends Stripe.Price {
  product: Stripe.Product
}

export const formatPrice = (price: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price / 100)
}

export const getURL = (): string => {
  let url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL

  // Make sure to include `https://` when not localhost.
  url = url?.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url?.charAt(url.length - 1) === '/' ? url : `${url}/`
  
  return url || 'http://localhost:3000/'
}

export const postData = async ({
  url,
  data,
}: {
  url: string
  data?: { [key: string]: any }
}) => {
  console.log('posting,', url, data)

  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    console.log('Error in postData', { url, data, res })
    throw new Error(res.statusText)
  }

  return res.json()
}

export const toDateTime = (secs: number): string => {
  const t = new Date('1970-01-01T00:30:00Z') // Unix epoch start.
  t.setSeconds(secs)
  return t.toISOString()
}

// Define subscription statuses
export type SubscriptionStatus = 
  | 'trialing'
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'unpaid'
  | 'paused'

// Helper to check if subscription is active
export const isSubscriptionActive = (status: SubscriptionStatus): boolean => {
  return status === 'active' || status === 'trialing'
}

// Helper to check if subscription needs attention
export const subscriptionNeedsAttention = (status: SubscriptionStatus): boolean => {
  return status === 'past_due' || status === 'incomplete' || status === 'unpaid'
}

export interface StripeProduct {
  id: string
  name: string
  description: string | null
  images: string[]
  metadata: Stripe.Metadata
  prices: StripePrice[]
}

export interface StripePrice {
  id: string
  unit_amount: number | null
  currency: string
  recurring: Stripe.Price.Recurring | null
  type: 'one_time' | 'recurring'
  metadata: Stripe.Metadata
}