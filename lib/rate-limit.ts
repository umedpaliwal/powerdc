import { NextRequest, NextResponse } from 'next/server'

// In-memory store for rate limiting (consider Redis for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export interface RateLimitConfig {
  windowMs?: number // Time window in milliseconds
  maxRequests?: number // Maximum requests per window
  message?: string // Error message when rate limited
  skipSuccessfulRequests?: boolean // Don't count successful requests
  keyGenerator?: (req: NextRequest) => string // Function to generate unique key
}

const defaultConfig: Required<RateLimitConfig> = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
  message: 'Too many requests, please try again later.',
  skipSuccessfulRequests: false,
  keyGenerator: (req: NextRequest) => {
    // Use IP address as default key
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    return ip
  },
}

export function createRateLimit(config: RateLimitConfig = {}) {
  const finalConfig = { ...defaultConfig, ...config }
  
  return async function rateLimit(req: NextRequest): Promise<NextResponse | null> {
    const key = finalConfig.keyGenerator(req)
    const now = Date.now()
    
    // Clean up expired entries periodically
    if (Math.random() < 0.01) { // 1% chance to clean up
      cleanupExpiredEntries(now)
    }
    
    // Get or create rate limit entry
    let entry = rateLimitStore.get(key)
    
    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      entry = {
        count: 1,
        resetTime: now + finalConfig.windowMs,
      }
      rateLimitStore.set(key, entry)
      return null // Allow request
    }
    
    // Increment counter
    entry.count++
    
    // Check if limit exceeded
    if (entry.count > finalConfig.maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
      
      return NextResponse.json(
        { error: finalConfig.message },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': finalConfig.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
          },
        }
      )
    }
    
    return null // Allow request
  }
}

function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Pre-configured rate limiters for different use cases
export const rateLimiters = {
  // Strict rate limit for authentication endpoints
  auth: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 requests per 15 minutes
    message: 'Too many authentication attempts, please try again later.',
  }),
  
  // Standard API rate limit
  api: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
    message: 'API rate limit exceeded, please slow down.',
  }),
  
  // Relaxed rate limit for read operations
  read: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200, // 200 requests per minute
    message: 'Too many requests, please try again in a moment.',
  }),
  
  // Strict rate limit for write operations
  write: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20, // 20 requests per minute
    message: 'Too many write operations, please slow down.',
  }),
  
  // Rate limit for Stripe operations
  stripe: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 requests per minute
    message: 'Too many payment requests, please try again later.',
  }),
}

// Helper to apply rate limiting to API routes
export async function withRateLimit(
  req: NextRequest,
  handler: () => Promise<NextResponse>,
  config?: RateLimitConfig
): Promise<NextResponse> {
  const rateLimiter = config ? createRateLimit(config) : rateLimiters.api
  
  const rateLimitResponse = await rateLimiter(req)
  if (rateLimitResponse) {
    return rateLimitResponse
  }
  
  return handler()
}