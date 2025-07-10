import {
  TransactionApiResult,
  TransactionRequest,
  isErrorResponse,
  isSuccessResponse,
} from '@/types/api/transaction'

/**
 * Fetch a LiFi quote through our `/api/transaction` endpoint.
 * Does not throw – always resolves to a discriminated union.
 */
export async function getQuote(body: TransactionRequest): Promise<TransactionApiResult> {
  try {
    const res = await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const json = await res.json()

    if (!res.ok) {
      // API-provided error shape - backend now returns { message }
      if (isErrorResponse(json)) {
        return {
          ok: false,
          error: {
            message: json.message,
            status: res.status,
          },
        }
      }

      // Fallback for unexpected error format
      return {
        ok: false,
        error: {
          message: 'Unknown error format',
          status: res.status,
        },
      }
    }

    // Validate success response
    if (isSuccessResponse(json)) {
      return { ok: true, data: json }
    }

    // Fallback for unexpected success format
    return {
      ok: false,
      error: {
        message: 'Invalid response format',
        status: 200,
      },
    }
  } catch (e) {
    return {
      ok: false,
      error: {
        message: e instanceof Error ? e.message : String(e),
        status: 0, // Network error or other client-side error
      },
    }
  }
}

// Re-export types for frontend use
export type { TransactionApiResult } from '@/types/api/transaction'
