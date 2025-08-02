'use client'

import { FC, useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { SwapForm, SwapFormSteps } from './form'
import { useChainId, useSendTransaction, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi'
import {
  TransactionApiResult,
  TransactionRequest,
  TransactionResponseType,
} from '@/types/api/transaction'
import { isNativeToken, useDebounce, useTokenApproval } from '@/hooks'
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
  const [currentStep, setCurrentStep] = useState<SwapFormSteps>('PREPARE')
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
    confirmations: 2,
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

  const onAmountChange = useCallback((newAmount: string) => {
    setFromAmount(newAmount)
  }, [])

  const onPrepareSubmit = useCallback(() => {
    setCurrentStep('CHECK')
  }, [])

  const onConfirm = useCallback(async () => {
    if (!lastValidData || !lastValidData.transaction.data) return

    try {
      // Step 1: Switch chain if needed
      if (lastValidData.transaction.data.chainId !== chainId) {
        await switchChainAsync({
          chainId: lastValidData.transaction.data.chainId!,
        })
      }

      // Step 2: Handle token approval for ERC-20 tokens
      if (!isNativeToken(fromAsset)) {
        if (needsApproval) {
          await approve()
        }
      }

      // Step 3: Execute the swap transaction
      await sendTransactionAsync(lastValidData.transaction.data as any)
    } catch (error) {
      console.error('Error in onConfirm:', error)
      setIsSwapping(false)
    }
  }, [
    chainId,
    lastValidData,
    fromAsset,
    sendTransactionAsync,
    switchChainAsync,
    needsApproval,
    approve,
  ])

  const isOperationInProgress = isSwapping || isPending || isApproving

  // Determine button text and disabled state
  const buttonState = useMemo(() => {
    // Check if transaction is completed (success or error)
    const isTransactionCompleted =
      receiptStatus === 'success' || receiptStatus === 'error' || isError

    if (isTransactionCompleted) return { text: 'Confirm', disabled: true }
    if (isApproving) return { text: 'Confirm', disabled: true }
    if (isSwapping || isPending) return { text: 'Confirm', disabled: true }
    if (needsApproval && !isNativeToken(fromAsset))
      return { text: 'Approve & Swap', disabled: false }
    if (!lastValidData) return { text: 'Confirm', disabled: true }
    if (currentError) return { text: 'Confirm', disabled: true }
    return { text: 'Confirm', disabled: false }
  }, [
    currentError,
    fromAsset,
    isApproving,
    isPending,
    isSwapping,
    lastValidData,
    needsApproval,
    receiptStatus,
    isError,
  ])
  // END

  // Clear error when amount changes
  useEffect(() => {
    if (fromAmount !== lastAmountRef.current) {
      setCurrentError(null)
      lastAmountRef.current = fromAmount
    }
  }, [fromAmount])

  // Update lastValidData when API data changes
  useEffect(() => {
    if (data?.ok && data.data) {
      setLastValidData(data.data)
      setCurrentError(null)
    } else if (data && !data.ok) {
      setCurrentError(data.error.message)
    }
  }, [data])

  return (
    <Wrapper>
      <SwapForm
        step={currentStep}
        actionType={actionType}
        fromAmount={fromAmount}
        toTokenDecimals={toTokenDecimals}
        data={lastValidData}
        isLoading={isLoading}
        isFetching={isFetching}
        buttonState={buttonState}
        isOperationInProgress={isOperationInProgress}
        onAmountChange={onAmountChange}
        onPrepareSubmit={onPrepareSubmit}
        onConfirm={onConfirm}
        txHash={hash}
        txStatus={txStatus}
        explorer={lastValidData?.explorer}
      />

      <SwapFormError error={errorMessage || txFailureReason} />
    </Wrapper>
  )
}

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-y-4 max-w-[500px]">{children}</div>
}

export { SwapContainer }
