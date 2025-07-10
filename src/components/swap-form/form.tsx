'use client'

import { SwapPrepare, SwapFormData, Token } from './components/prepare'
import { TransactionReview } from './components/check'
import { Progress, ProgressProps } from './components/progress'

type SwapStep = 'PREPARE' | 'CHECK' | 'PROGRESS'

type SwapData = SwapFormData & {
  fromToken: Token
  toToken: Token
}

type SwapFormProps = {
  currentStep: SwapStep
  swapData: SwapData | null
  onPrepareNext: (data: SwapData) => void
  onReviewConfirm: () => void
  progressProps?: ProgressProps
}

const SwapForm = ({
  currentStep,
  swapData,
  onPrepareNext,
  onReviewConfirm,
  progressProps,
}: SwapFormProps) => {
  // Convert SwapData to TransactionReview format
  const getTransactionReviewData = () => {
    if (!swapData) return null

    return {
      fromToken: {
        symbol: swapData.fromToken.symbol,
        amount: swapData.fromAmount,
        icon: swapData.fromToken.icon,
      },
      toToken: {
        symbol: swapData.toToken.symbol,
        amount: swapData.toAmount,
        icon: swapData.toToken.icon,
      },
      details: {
        minimumReceived: `${(parseFloat(swapData.toAmount) * 0.999).toFixed(6)} ${
          swapData.toToken.symbol
        }`,
        slippage: '0.01%',
        networkFee: `${(parseFloat(swapData.fromAmount) * 0.0001).toFixed(12)} ${
          swapData.fromToken.symbol
        }`,
        munarFee: '0.0%',
      },
    }
  }

  return (
    <div>
      <div className="space-y-6">
        {/* Step 1: Always show PREPARE step */}
        <SwapPrepare onNext={onPrepareNext} />

        {/* Step 2: Show CHECK step when we're on CHECK or PROGRESS */}
        {(currentStep === 'CHECK' || currentStep === 'PROGRESS') && swapData && (
          <TransactionReview
            fromToken={getTransactionReviewData()!.fromToken}
            toToken={getTransactionReviewData()!.toToken}
            details={getTransactionReviewData()!.details}
            onConfirm={onReviewConfirm}
          />
        )}

        {/* Step 3: Show PROGRESS step only when we're on PROGRESS */}
        {currentStep === 'PROGRESS' && progressProps && <Progress {...progressProps} />}
      </div>
    </div>
  )
}

export { SwapForm }
export type { SwapFormProps, SwapData, SwapStep }
