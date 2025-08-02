'use client'

import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SwapInput } from './swap-input'
import { Skeleton as SkeletonUI } from '../../ui/skeleton'
import { Box } from './box'
import { SwapFormSchema, SwapFormValues } from '../schema'
import React from 'react'

type SwapFormData = {
  fromAmount: string
  toAmount: string
}

enum SwapFormFields {
  FROM_AMOUNT = 'fromAmount',
  TO_AMOUNT = 'toAmount',
}

type Token = {
  symbol: string
  name: string
  icon: string
  chain: string
}

type Props = {
  fromToken: {
    name: string
    symbol: string
    networkId: number
    amount: number
    dollarValue: string
    logo: string
  }
  toToken: {
    name: string
    symbol: string
    networkId: number
    amount: string
    dollarValue: string
    logo: string
    decimals: number
  }
  onAmountChange: (value: string) => void
  onSubmit: () => void
  isUpdating?: boolean
  buttonDisabled?: boolean
  actionType: 'swap'
  isOperationInProgress?: boolean
}

const SwapPrepare: FC<Props> = ({
  fromToken,
  toToken,
  onAmountChange,
  onSubmit,
  isUpdating,
  buttonDisabled,
  actionType,
  isOperationInProgress,
}) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { isValid },
  } = useForm<SwapFormValues>({
    resolver: zodResolver(SwapFormSchema),
    mode: 'onChange',
    defaultValues: {
      fromAmount: String(fromToken.amount ?? ''),
    },
  })

  // Sync form with external onAmountChange
  const fromAmount = watch('fromAmount')
  React.useEffect(() => {
    onAmountChange(fromAmount || '')
  }, [fromAmount, onAmountChange])

  // Calculate USD values
  const fromUSD = Number(fromToken.dollarValue) || 0
  const toUSD = Number(toToken.dollarValue) || 0

  return (
    <Box>
      <h1 className="text-white text-2xl font-semibold mb-6">Swap</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Controller
          name={SwapFormFields.FROM_AMOUNT}
          control={control}
          render={({ field }) => (
            <SwapInput
              register={register('fromAmount')}
              value={field.value}
              onChange={field.onChange}
              readOnly={isOperationInProgress}
              token={{
                symbol: fromToken.symbol,
                name: fromToken.name,
                icon: fromToken.logo,
                chain: String(fromToken.networkId),
              }}
              usdValue={isUpdating ? void 0 : fromUSD}
            />
          )}
        />

        {/* Swap Arrow Button */}
        <div className="size-8 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
          <ArrowDown className="size-5 text-gray-400" />
        </div>

        <SwapInput
          register={{} as any}
          value={toToken.amount}
          token={{
            symbol: toToken.symbol,
            name: toToken.name,
            icon: toToken.logo,
            chain: String(toToken.networkId),
          }}
          usdValue={isUpdating ? void 0 : toUSD}
          readOnly
          decimals={toToken.decimals}
        />

        <Button
          type="submit"
          disabled={buttonDisabled || isOperationInProgress || !isValid}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl mt-6"
        >
          Continue
        </Button>
      </form>
    </Box>
  )
}

const Skeleton = () => {
  return (
    <Box>
      <h1 className="text-white text-2xl font-semibold mb-6">Swap</h1>

      <div className="space-y-3">
        <SwapInput.Skeleton />

        {/* Swap Arrow Button */}
        <div className="flex justify-center">
          <ArrowDown className="size-10 text-gray-400 rounded-full" />
        </div>

        <SwapInput.Skeleton />

        <SkeletonUI className="w-full h-[36px]" />
      </div>
    </Box>
  )
}

const Component = Object.assign(SwapPrepare, {
  Skeleton,
})

export { Component as SwapPrepare }
export type { Props as SwapPrepareProps, SwapFormData, Token }
