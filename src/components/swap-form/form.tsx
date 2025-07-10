'use client'

import { SwapPrepare, SwapFormData, Token } from './components/prepare'
import { TransactionReview } from './components/check'
import { Progress } from './components/progress'
import { TransactionResponseType } from '@/types/api/transaction'
import { FC } from 'react'
import { findChainNameById } from '@/lib/lifi/helpers'

export type SwapFormSteps = 'PREPARE' | 'CHECK' | 'PROGRESS'

type SwapData = SwapFormData & {
  fromToken: Token
  toToken: Token
}

type SwapFormProps = {
  // Form state
  step: SwapFormSteps
  actionType: 'swap'

  // Form data
  fromAmount: string
  toTokenDecimals: number

  // API data (can be null during loading or error)
  data: TransactionResponseType | null
  isLoading: boolean
  isFetching: boolean

  // Button states
  buttonState: {
    text: string
    disabled: boolean
  }
  isOperationInProgress: boolean

  // Callbacks
  onAmountChange: (amount: string) => void
  onPrepareSubmit: () => void
  onConfirm: () => void

  // Transaction state
  txHash?: string
  txStatus?: 'idle' | 'pending' | 'success' | 'error'
  explorer?: string
}

const SwapForm: FC<SwapFormProps> = ({
  step,
  actionType,
  fromAmount,
  toTokenDecimals,
  data,
  isLoading,
  isFetching,
  buttonState,
  isOperationInProgress,
  onAmountChange,
  onPrepareSubmit,
  onConfirm,
  txHash,
  txStatus,
  explorer,
}: SwapFormProps) => {
  if (!data) return <SwapPrepare.Skeleton />

  const { fromToken, toToken } = data

  // Transform API data for components
  const prepareProps = {
    fromToken: {
      name: fromToken.name,
      symbol: fromToken.symbol,
      networkId: Number(data.transaction.data?.chainId || 0),
      amount: Number(fromAmount),
      dollarValue: fromToken.amountUSD || '0',
      logo: fromToken.logoURI || '',
    },
    toToken: {
      name: toToken.name,
      symbol: toToken.symbol,
      networkId: Number(data.transaction.data?.chainId || 0),
      amount: toToken.amount,
      dollarValue: toToken.amountUSD || '0',
      logo: toToken.logoURI || '',
      decimals: toToken.decimals,
    },
    onAmountChange,
    onSubmit: onPrepareSubmit,
    isUpdating: isFetching,
    buttonDisabled: buttonState.disabled,
    actionType,
    isOperationInProgress,
  }

  const reviewProps = {
    fromToken: {
      name: fromToken.name,
      symbol: fromToken.symbol,
      amount: Number(fromAmount),
      logo: fromToken.logoURI,
      decimals: fromToken.decimals,
    },
    toToken: {
      name: toToken.name,
      symbol: toToken.symbol,
      amount: toToken.amount,
      logo: toToken.logoURI,
      decimals: toToken.decimals,
    },
    minReceiveAmount: data.minReceiveAmount,
    slippage: data.slippage || 0,
    isUpdating: isFetching,
    onConfirm,
    gasCosts: data.gasCosts,
    buttonDisabled: buttonState.disabled,
    buttonText: buttonState.text,
  }

  const progressProps = {
    status: (txStatus === 'pending' ? 'pending' : txStatus === 'success' ? 'success' : 'error') as
      | 'pending'
      | 'success'
      | 'error',
    receiveToken: {
      symbol: toToken.symbol,
      amount: toToken.amount,
      logo: toToken.logoURI || '',
      decimals: toToken.decimals,
      chain: findChainNameById(Number(data.transaction.data?.chainId || 0)),
    },
    explorer: explorer || '',
    txHash: txHash as `0x${string}` | undefined,
  }

  return (
    <div>
      <div className="space-y-6">
        {/* Step 1: Always show PREPARE step */}
        <SwapPrepare {...prepareProps} />

        {/* Step 2: Show CHECK step when we're on CHECK or PROGRESS */}
        {(step === 'CHECK' || step === 'PROGRESS') && <TransactionReview {...reviewProps} />}

        {/* Step 3: Show PROGRESS step only when we're on PROGRESS */}
        {step === 'PROGRESS' && <Progress {...progressProps} />}
      </div>
    </div>
  )
}

export { SwapForm }
export type { SwapFormProps, SwapData }
