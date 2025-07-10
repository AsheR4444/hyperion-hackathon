'use client'

import { FC, useRef, useState } from 'react'
import { SwapForm, SwapData, SwapStep } from './form'
import { ProgressProps } from './components/progress'
import { useChainId, useSendTransaction, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi'
import {
  TransactionApiResult,
  TransactionRequest,
  TransactionResponseType,
} from '@/types/api/transaction'
import { useDebounce, useTokenApproval } from '@/hooks'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { parseUnits } from 'viem'
import { getQuote } from '@/lib/lifi'
import { SwapFormError } from './components/error'

type Props = {
  actionType: 'swap'
  amount: string
  fromAsset: string
  fromChain: string
  toAsset: string
  toChain: string
  address: string
  slippage?: string | void
  fromTokenDecimals: number
  toTokenDecimals: number
}

const SwapContainer: FC<Props> = ({
  actionType,
  amount,
  fromAsset,
  fromChain,
  toAsset,
  toChain,
  address,
  slippage,
  fromTokenDecimals,
  toTokenDecimals,
}) => {
  //
  const [currentStep, setCurrentStep] = useState<SwapStep>('PREPARE')
  const chainId = useChainId()
  const { switchChainAsync } = useSwitchChain()
  const [isSwapping, setIsSwapping] = useState(false)
  const [fromAmount, setFromAmount] = useState<string>(amount)
  const [lastValidData, setLastValidData] = useState<TransactionResponseType | null>(null)
  const [currentError, setCurrentError] = useState<string | null>(null)
  const lastAmountRef = useRef<string>('')
  const debouncedAmount = useDebounce(fromAmount, 300)

  const {
    data: hash,
    isPending,
    isError,
    failureReason,
    sendTransactionAsync,
  } = useSendTransaction({
    mutation: {
      onMutate: () => {
        setIsSwapping(true)
        setCurrentStep('PROGRESS')
      },
    },
  })

  const { status: receiptStatus, error: receiptError } = useWaitForTransactionReceipt({
    hash,
    confirmations: 3,
    query: {
      refetchOnWindowFocus: false,
      gcTime: Infinity,
      staleTime: Infinity,
    },
  })

  const txPayload: TransactionRequest = {
    transaction: {
      actionType,
      swapData: {
        amount: parseUnits(debouncedAmount, fromTokenDecimals).toString(),
        fromAsset,
        fromChain,
        toAsset,
        toChain,
        toAddress: address,
        eoaAddress: address,
        //slippage,
      },
    },
  }

  const { data, isLoading, isFetching } = useQuery<TransactionApiResult>({
    queryKey: ['transaction', 'quote', txPayload.transaction],
    queryFn: () => getQuote(txPayload),
    enabled: Number(debouncedAmount) > 0 && !isSwapping,
    refetchOnWindowFocus: !isSwapping && !isError,
    refetchInterval: 10000,
    placeholderData: keepPreviousData,
  })

  const { needsApproval, approve, isApproving, isApproveError, approveError } = useTokenApproval(
    lastValidData?.fromToken.address || '',
    lastValidData?.transaction.approvalAddress || undefined,
    debouncedAmount,
    fromTokenDecimals,
    address,
  )

  // Handle approval errors
  const approvalError = isApproveError
    ? (approveError as any)?.shortMessage || 'Approval failed'
    : null

  // Combined error message
  const errorMessage = currentError || approvalError

  // Transaction status
  const txStatus = isError || isApproveError ? 'error' : receiptStatus
  const txFailureReason =
    (failureReason as any)?.shortMessage || (receiptError as any)?.shortMessage || approvalError

  // END

  const [swapData, setSwapData] = useState<SwapData | null>(null)

  const handlePrepareNext = (data: SwapData) => {
    setSwapData(data)

    // Only advance to CHECK if we're currently on PREPARE
    if (currentStep === 'PREPARE') {
      setCurrentStep('CHECK')
    }
  }

  const handleReviewConfirm = () => {
    if (swapData) {
      handleTransaction(swapData)
    }
    setCurrentStep('PROGRESS')
  }

  const handleTransaction = async (data: SwapData) => {
    console.log('🚀 Starting transaction with data:', data)
  }

  // Create progress props based on current state
  const getProgressProps = (): ProgressProps | undefined => {
    if (!swapData) return undefined

    return {
      status: 'pending',
      receiveToken: {
        symbol: swapData.toToken.symbol,
        amount: swapData.toAmount,
        logo: swapData.toToken.icon,
        decimals: 6, // TODO: Get from actual token data
        chain: swapData.toToken.chain,
      },
      explorer: 'https://basescan.org', // TODO: Get from chain config
      txHash: undefined,
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

      <SwapFormError error={errorMessage || txFailureReason} />
    </Wrapper>
  )
}

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-y-4 max-w-[500px]">{children}</div>
}

export { SwapContainer }
