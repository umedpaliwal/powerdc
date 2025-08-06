/**
 * Database utility functions for error handling and connection management
 */

import { createClient } from '@/lib/supabase/server'

export interface DatabaseError {
  code?: string
  message: string
  details?: string
  hint?: string
}

export interface RetryOptions {
  maxRetries: number
  baseDelay: number
  maxDelay: number
  backoffMultiplier: number
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
}

/**
 * Wrap database operations with error handling and retry logic
 */
export async function withDatabaseRetry<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options }
  let lastError: DatabaseError

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const result = await operation()
      return result
    } catch (error: any) {
      lastError = normalizeError(error)
      
      // Don't retry on certain error types
      if (shouldNotRetry(lastError)) {
        throw lastError
      }

      // If this was the last attempt, throw the error
      if (attempt === config.maxRetries) {
        throw lastError
      }

      // Calculate delay for next retry
      const delay = Math.min(
        config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
        config.maxDelay
      )

      console.log(`Database operation failed (attempt ${attempt + 1}/${config.maxRetries + 1}), retrying in ${delay}ms...`, lastError.message)
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

/**
 * Normalize different types of errors into a consistent format
 */
function normalizeError(error: any): DatabaseError {
  if (error && typeof error === 'object') {
    return {
      code: error.code || error.error_code || 'UNKNOWN_ERROR',
      message: error.message || error.error_description || 'Unknown database error',
      details: error.details || error.error_details,
      hint: error.hint || error.error_hint,
    }
  }

  if (typeof error === 'string') {
    return {
      message: error,
      code: 'STRING_ERROR',
    }
  }

  return {
    message: 'Unknown error occurred',
    code: 'UNKNOWN_ERROR',
  }
}

/**
 * Determine if an error should not be retried
 */
function shouldNotRetry(error: DatabaseError): boolean {
  // Don't retry on authentication errors
  if (error.code === 'PGRST301' || error.code === 'PGRST302') {
    return true
  }

  // Don't retry on permission errors
  if (error.code === 'PGRST101' || error.code === 'PGRST103') {
    return true
  }

  // Don't retry on constraint violations
  if (error.code?.startsWith('23')) {
    return true
  }

  // Don't retry on syntax errors
  if (error.code?.startsWith('42')) {
    return true
  }

  // Don't retry on "no rows returned" (expected in some cases)
  if (error.code === 'PGRST116') {
    return true
  }

  return false
}

/**
 * Check database connection health
 */
export async function checkDatabaseHealth(): Promise<{
  healthy: boolean
  latency?: number
  error?: string
}> {
  const startTime = Date.now()
  
  try {
    const supabase = await createClient()
    
    // Simple query to test connection
    const { error } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1)

    if (error && error.code !== 'PGRST116') {
      return {
        healthy: false,
        error: error.message,
      }
    }

    const latency = Date.now() - startTime
    
    return {
      healthy: true,
      latency,
    }
  } catch (error: any) {
    return {
      healthy: false,
      error: error.message || 'Connection test failed',
    }
  }
}

/**
 * Get connection configuration status
 */
export function getDatabaseConfig(): {
  configured: boolean
  missingVars: string[]
} {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ]

  const missingVars = requiredVars.filter(varName => !process.env[varName])

  return {
    configured: missingVars.length === 0,
    missingVars,
  }
}

/**
 * Database operation wrapper with built-in error handling
 */
export class DatabaseOperation {
  private retryOptions: RetryOptions

  constructor(options: Partial<RetryOptions> = {}) {
    this.retryOptions = { ...DEFAULT_RETRY_OPTIONS, ...options }
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    return withDatabaseRetry(operation, this.retryOptions)
  }

  async safeExecute<T>(
    operation: () => Promise<T>,
    fallback: T
  ): Promise<T> {
    try {
      return await this.execute(operation)
    } catch (error) {
      console.error('Database operation failed, using fallback:', error)
      return fallback
    }
  }
}

/**
 * Default database operation instance
 */
export const dbOperation = new DatabaseOperation()

/**
 * Quick database operation for simple cases
 */
export const safeDbOperation = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> => {
  return dbOperation.safeExecute(operation, fallback)
}