// Shared types between frontend and backend

import { LiFiStep } from '@lifi/sdk'

export type TransactionApiErrorResponse = {
  message: string
}

export type TransactionApiError = {
  message: string
  status: number
}

// LiFi response structure (based on actual API shape)
export type TransactionResponseType = {
  fromToken: LiFiStep['action']['fromToken'] & {
    amount: LiFiStep['action']['fromAmount']
    amountUSD: LiFiStep['estimate']['fromAmountUSD']
  }
  toToken: LiFiStep['action']['toToken'] & {
    amount: LiFiStep['estimate']['toAmount']
    amountUSD: LiFiStep['estimate']['toAmountUSD']
  }
  slippage: LiFiStep['action']['slippage']
  tool: LiFiStep['toolDetails']
  id: LiFiStep['id']
  executionDuration: LiFiStep['estimate']['executionDuration']
  minReceiveAmount: LiFiStep['estimate']['toAmountMin']
  gasCosts: LiFiStep['estimate']['gasCosts']
  transaction: {
    approvalAddress: string
    data: LiFiStep['transactionRequest']
  }
  explorer: string
}

export type TransactionApiResult =
  | { ok: true; data: TransactionResponseType }
  | { ok: false; error: TransactionApiError }

// Request types
export type SwapData = {
  amount: string
  fromAsset: string
  fromChain: string
  toAsset: string
  toChain: string
  eoaAddress: string
  toAddress: string
  slippage?: string | undefined
}

export type PipelineItem = {
  actionType: 'swap' | 'bridge'
  swapData: SwapData
}

export type TransactionRequest = {
  transaction: PipelineItem
}

// Type Guards (no runtime dependencies)
export function isErrorResponse(obj: unknown): obj is TransactionApiErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    typeof (obj as any).message === 'string'
  )
}

export function isSuccessResponse(obj: unknown): obj is TransactionResponseType {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'fromToken' in obj &&
    'toToken' in obj &&
    'transaction' in obj
  )
}
