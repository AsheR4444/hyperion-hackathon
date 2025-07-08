'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SwapInput } from './swap-input'

type SwapFormData = {
  fromAmount: string
  toAmount: string
}

type Token = {
  symbol: string
  name: string
  icon: string
  chain: string
}

const tokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷', chain: 'Mantle' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💰', chain: 'Mantle' },
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', chain: 'Mantle' },
]

export function SwapForm() {
  const [fromToken, setFromToken] = useState<Token>(tokens[0])
  const [toToken, setToToken] = useState<Token>(tokens[1])

  const { register, handleSubmit, watch, setValue } = useForm<SwapFormData>({
    defaultValues: {
      fromAmount: '0.01',
      toAmount: '25.770357',
    },
  })

  const fromAmount = watch('fromAmount')
  const toAmount = watch('toAmount')

  // Simulate exchange rate calculation
  const fromUSD = parseFloat(fromAmount) * 2567.7 || 0
  const toUSD = parseFloat(toAmount) * 0.9999 || 0

  const onSubmit = (data: SwapFormData) => {
    console.log('Swap data:', {
      ...data,
      fromToken,
      toToken,
    })
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-white text-2xl font-semibold mb-6">Swap</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <SwapInput register={register('fromAmount')} token={fromToken} usdValue={fromUSD} />

        {/* Swap Arrow Button */}
        <div className="flex justify-center">
          <ArrowDown className="h-5 w-5 text-gray-400 rounded-full" />
        </div>

        <SwapInput register={register('toAmount')} token={toToken} usdValue={toUSD} readOnly />

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl mt-6"
        >
          Swap
        </Button>
      </form>
    </div>
  )
}
