# PowerDC API Routes Documentation

This document describes the API routes implemented to fix database connection issues and provide proper data management for the PowerDC-Web application.

## Overview

The API routes replace direct Supabase client calls with server-side endpoints that include comprehensive error handling, retry logic, and proper authentication checks.

## API Endpoints

### User Profile Management

#### `GET /api/user/profile`
Retrieve the current user's profile information.

**Response:**
```json
{
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "company_name": "Company Name",
    "industry_type": "datacenter",
    "phone": "+1234567890",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### `POST /api/user/profile`
Create a new user profile.

**Request Body:**
```json
{
  "company_name": "Required Company Name",
  "industry_type": "datacenter|utility|developer|other",
  "phone": "+1234567890"
}
```

#### `PUT /api/user/profile`
Update an existing user profile.

**Request Body:**
```json
{
  "company_name": "Updated Company Name",
  "industry_type": "datacenter",
  "phone": "+1234567890"
}
```

### Subscription Management

#### `GET /api/subscriptions`
Get the current user's active subscription.

**Response:**
```json
{
  "subscription": {
    "id": "uuid",
    "user_id": "uuid",
    "plan_type": "explorer|professional|enterprise",
    "status": "active|trialing|canceled|past_due",
    "trial_ends_at": "2024-01-01T00:00:00Z",
    "current_period_start": "2024-01-01T00:00:00Z",
    "current_period_end": "2024-02-01T00:00:00Z",
    "stripe_customer_id": "cus_xxx",
    "stripe_subscription_id": "sub_xxx",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "isDefault": false
}
```

#### `POST /api/subscriptions`
Create a new subscription.

#### `PUT /api/subscriptions`
Update an existing subscription.

### Usage Tracking

#### `GET /api/usage`
Get current month usage statistics.

**Query Parameters:**
- `month` (optional): YYYY-MM format, defaults to current month

**Response:**
```json
{
  "usage": {
    "id": "uuid",
    "user_id": "uuid",
    "month": "2024-01",
    "reports_generated": 5,
    "api_calls": 150,
    "data_exports": 2,
    "last_access": "2024-01-15T10:30:00Z",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

#### `POST /api/usage`
Increment usage counter.

**Request Body:**
```json
{
  "usage_type": "reports|api|exports",
  "increment": 1
}
```

#### `PUT /api/usage`
Get usage history (pagination supported).

**Query Parameters:**
- `limit`: Number of months to return (default: 12)
- `offset`: Offset for pagination (default: 0)

### Saved Searches

#### `GET /api/saved-searches`
Get all saved searches for the current user.

**Query Parameters:**
- `limit`: Number of searches to return (default: 50)
- `offset`: Offset for pagination (default: 0)

#### `POST /api/saved-searches`
Create a new saved search.

**Request Body:**
```json
{
  "name": "My Search Name",
  "filters": {
    "state": "CA",
    "capacity_min": 100
  },
  "saved_sites": ["site1", "site2"]
}
```

#### `GET /api/saved-searches/[id]`
Get a specific saved search by ID.

#### `PUT /api/saved-searches/[id]`
Update a saved search.

#### `DELETE /api/saved-searches/[id]`
Delete a saved search.

## Utility Functions

### Usage Tracking (`/lib/usage-tracking.ts`)
- `incrementUsage(type, increment)`: Increment usage counter
- `getCurrentUsage()`: Get current month usage
- `getUsageHistory(limit, offset)`: Get usage history
- `checkUsageLimit(current, limit, threshold)`: Check usage limits

### Saved Searches (`/lib/saved-searches.ts`)
- `getSavedSearches(limit, offset)`: Get all saved searches
- `getSavedSearch(id)`: Get specific search
- `createSavedSearch(params)`: Create new search
- `updateSavedSearch(id, params)`: Update search
- `deleteSavedSearch(id)`: Delete search
- `searchNameExists(name, excludeId)`: Check name uniqueness

### Database Utilities (`/lib/database-utils.ts`)
- `withDatabaseRetry(operation, options)`: Retry wrapper
- `checkDatabaseHealth()`: Connection health check
- `getDatabaseConfig()`: Configuration status
- `DatabaseOperation` class: Advanced operation wrapper

## Error Handling

All API routes include comprehensive error handling:

- **401 Unauthorized**: User not authenticated
- **400 Bad Request**: Invalid request data
- **404 Not Found**: Resource not found
- **409 Conflict**: Duplicate resource (e.g., duplicate search name)
- **500 Internal Server Error**: Database or server error

### Retry Logic

- Automatic retry with exponential backoff for server errors
- Maximum 3 retry attempts by default
- Configurable retry options in database utilities
- Different retry strategies for different error types

## Authentication

All API routes require user authentication via Supabase Auth. The routes automatically:

1. Verify the user session
2. Extract user ID from authenticated session
3. Apply Row Level Security (RLS) policies
4. Return appropriate error responses for unauthenticated requests

## Testing

Run the test script to verify all routes are properly configured:

```bash
node scripts/test-api-routes.js
```

## Database Schema Requirements

Ensure the following tables exist in Supabase:

- `user_profiles`
- `subscriptions` 
- `usage_tracking`
- `saved_searches`

See `/Users/umedpaliwal/My Drive/Projects/PowerDC/PowerDC-Web/.github/issues/10-subscription-database-schema.md` for complete schema definitions.

## Environment Variables

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```