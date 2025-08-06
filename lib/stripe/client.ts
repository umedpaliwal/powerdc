import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    
    if (!publishableKey) {
      console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
      stripePromise = Promise.resolve(null)
    } else {
      console.log('Loading Stripe with publishable key:', publishableKey.substring(0, 20) + '...')
      stripePromise = loadStripe(publishableKey)
    }
  }
  return stripePromise
}

export default getStripe