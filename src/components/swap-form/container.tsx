'use client'

import { FC, useState } from 'react'
import { SwapForm, SwapData, SwapStep } from './form'
import { ProgressProps } from './components/progress'

type SwapContainerProps = {
  className?: string
}

const SwapContainer = ({ className }: SwapContainerProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)

  // Step management logic moved from form.tsx
  const [currentStep, setCurrentStep] = useState<SwapStep>('PREPARE')
  const [swapData, setSwapData] = useState<SwapData | null>(null)

  const handlePrepareNext = (data: SwapData) => {
    console.log('📋 Prepare step completed with data:', data)
    setSwapData(data)

    // Only advance to CHECK if we're currently on PREPARE
    if (currentStep === 'PREPARE') {
      setCurrentStep('CHECK')
    }
  }

  const handleReviewConfirm = () => {
    console.log('✅ Review confirmed, starting transaction...')
    if (swapData) {
      handleTransaction(swapData)
    }
    setCurrentStep('PROGRESS')
  }

  const handleTransaction = async (data: SwapData) => {
    console.log('🚀 Starting transaction with data:', data)

    setIsLoading(true)
    setError(null)
    setTxHash(undefined)

    try {
      // TODO: Implement actual API calls here

      // Simulate API call for getting quote
      console.log('📋 Getting quote...', {
        fromToken: data.fromToken,
        toToken: data.toToken,
        amount: data.fromAmount,
      })

      // Simulate quote API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate transaction execution
      console.log('⚡ Executing transaction...')

      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful transaction
      setTxHash('0x1234567890abcdef1234567890abcdef12345678')
      console.log('✅ Transaction completed successfully!')
    } catch (err) {
      console.error('❌ Transaction failed:', err)
      setError(err instanceof Error ? err.message : 'Transaction failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Create progress props based on current state
  const getProgressProps = (): ProgressProps | undefined => {
    if (!swapData) return undefined

    const status = error ? 'error' : isLoading ? 'pending' : 'success'

    return {
      status,
      receiveToken: {
        symbol: swapData.toToken.symbol,
        amount: swapData.toAmount,
        logo: swapData.toToken.icon,
        decimals: 6, // TODO: Get from actual token data
        chain: swapData.toToken.chain,
      },
      explorer: 'https://basescan.org', // TODO: Get from chain config
      txHash,
    }
  }

  return (
    <Wrapper>
      <SwapForm
        currentStep={currentStep}
        swapData={swapData}
        onPrepareNext={handlePrepareNext}
        onReviewConfirm={handleReviewConfirm}
        progressProps={getProgressProps()}
      />
    </Wrapper>
  )
}

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-y-4 max-w-[500px]">{children}</div>
}

export { SwapContainer }
export type { SwapContainerProps }
