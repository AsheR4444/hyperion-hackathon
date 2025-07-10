'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Box } from './box'

type Token = {
  symbol: string
  amount: string
  icon: string
}

type TransactionDetails = {
  minimumReceived: string
  slippage: string
  networkFee: string
  munarFee: string
}

type TransactionReviewProps = {
  fromToken: Token
  toToken: Token
  details: TransactionDetails
  onConfirm: () => void
  onCancel?: () => void
}

const TransactionReview = ({
  fromToken,
  toToken,
  details,
  onConfirm,
  onCancel,
}: TransactionReviewProps) => {
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
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg">
              {fromToken.icon}
            </div>
            <div>
              <div className="text-white font-medium">{fromToken.symbol}</div>
              <div className="text-white text-lg font-semibold">{fromToken.amount}</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="size-8 bg-gray-700 rounded-full flex items-center justify-center">
            <ArrowRight className="size-5 text-gray-400" />
          </div>

          {/* To Token */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-lg">
              {toToken.icon}
            </div>
            <div>
              <div className="text-white font-medium">{toToken.symbol}</div>
              <div className="text-white text-lg font-semibold">{toToken.amount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        {/* Minimum received */}
        <div className="flex justify-between items-center py-3 border-b border-dotted border-gray-600">
          <span className="text-gray-400">Minimum received</span>
          <span className="text-white font-medium">{details.minimumReceived}</span>
        </div>

        {/* Slippage */}
        <div className="flex justify-between items-center py-3 border-b border-dotted border-gray-600">
          <span className="text-gray-400">Slippage</span>
          <span className="text-white font-medium">{details.slippage}</span>
        </div>

        {/* Network fee */}
        <div className="flex justify-between items-center py-3 border-b border-dotted border-gray-600">
          <span className="text-gray-400">Network fee</span>
          <span className="text-white font-medium">{details.networkFee}</span>
        </div>

        {/* OrbitAI fee */}
        <div className="flex justify-between items-center py-3">
          <span className="text-gray-400">OrbitAI fee</span>
          <div className="flex items-center gap-2">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">
              {details.munarFee}
            </span>
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
export type { TransactionReviewProps, Token as TransactionToken, TransactionDetails }
