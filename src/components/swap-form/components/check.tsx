'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Box } from './box'
import { TransactionResponseType } from '@/types/api/transaction'
import { FC } from 'react'
import Image from 'next/image'
import { NumberFormat } from '@/components/ui/number-format'
import { Skeleton } from '@/components/ui/skeleton'
import { formatUnits } from 'viem'

type Props = {
  fromToken: {
    name: string
    symbol: string
    amount: number
    logo?: string
    decimals: number
  }
  toToken: {
    name: string
    symbol: string
    amount: string
    logo?: string
    decimals: number
  }
  minReceiveAmount: string
  slippage: number
  isUpdating: boolean
  onConfirm: () => void
  gasCosts: TransactionResponseType['gasCosts']
  buttonDisabled?: boolean
  buttonText?: string
}

const TransactionReview: FC<Props> = ({
  fromToken,
  toToken,
  onConfirm,
  minReceiveAmount,
  slippage,
  isUpdating,
  gasCosts,
  buttonDisabled,
  buttonText,
}) => {
  console.log(toToken)

  return (
    <Box>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-1">Review transaction</h2>
        <p className="text-gray-400 text-sm">Swapping via LiFi</p>
      </div>

      {/* Token Swap Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-8">
          {/* From Token */}
          <div className="flex items-center gap-3">
            {fromToken.logo ? (
              <Image
                src={fromToken.logo}
                alt={fromToken.symbol}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}
            <div>
              <div className="text-white font-medium">{fromToken.symbol}</div>
              {!isUpdating ? (
                <span className="text-white text-lg font-semibold">
                  <NumberFormat
                    value={Number(formatUnits(BigInt(fromToken.amount || 0), fromToken.decimals))}
                    displayType="text"
                    thousandSeparator=","
                    hideCurrency
                    fixedDecimalScale
                  />
                </span>
              ) : (
                <Skeleton className="w-[60px] h-[21px]" />
              )}
            </div>
          </div>

          {/* Arrow */}
          <div className="size-8 bg-gray-700 rounded-full flex items-center justify-center">
            <ArrowRight className="size-5 text-gray-400" />
          </div>

          {/* To Token */}
          <div className="flex items-center gap-3">
            {toToken.logo ? (
              <Image
                src={toToken.logo}
                alt={toToken.symbol}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}
            <div>
              <div className="text-white font-medium">{toToken.symbol}</div>
              {!isUpdating ? (
                <span className="text-white text-lg font-semibold">
                  <NumberFormat
                    value={Number(formatUnits(BigInt(toToken.amount || 0), toToken.decimals))}
                    displayType="text"
                    thousandSeparator=","
                    hideCurrency
                    fixedDecimalScale
                  />
                </span>
              ) : (
                <Skeleton className="w-[60px] h-[21px]" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        {/* Minimum received */}
        <div className="flex justify-between items-center py-3 border-b border-dotted border-gray-600">
          <span className="text-gray-400">Minimum received</span>
          <span className="text-white font-medium">{minReceiveAmount}</span>
        </div>

        {/* Slippage */}
        <div className="flex justify-between items-center py-3 border-b border-dotted border-gray-600">
          <span className="text-gray-400">Slippage</span>
          <span className="text-white font-medium">{slippage * 100}%</span>
        </div>

        {/* Network fee */}
        <div className="flex justify-between items-center py-3 border-b border-dotted border-gray-600">
          <span className="text-gray-400">Network fee</span>
          <span className="text-white font-medium">
            <NumberFormat
              value={Number(
                formatUnits(BigInt(gasCosts?.[0]?.amount || 0), gasCosts?.[0]?.token.decimals || 0),
              )}
              displayType="text"
              thousandSeparator=","
              fixedDecimalScale
              suffix={gasCosts?.[0]?.token.symbol}
              hideCurrency
            />
          </span>
        </div>

        {/* OrbitAI fee */}
        <div className="flex justify-between items-center py-3">
          <span className="text-gray-400">OrbitAI fee</span>
          <div className="flex items-center gap-2">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">0.0%</span>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <Button
        onClick={onConfirm}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl text-base"
      >
        Confirm
      </Button>
    </Box>
  )
}

export { TransactionReview }
