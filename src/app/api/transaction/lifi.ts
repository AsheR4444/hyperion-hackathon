import { getQuote } from '@lifi/sdk'

import { SUPPORTED_CHAINS } from '@/lib/lifi'
import { TransactionResponseType } from '@/types/api/transaction'

type SwapData = {
  fromAddress: string
  fromChain: string
  toChain: string
  fromToken: string
  toToken: string
  fromAmount: string
  slippage?: string | undefined
}

export const getTransaction = async (swapData: SwapData): Promise<TransactionResponseType> => {
  const quote = await getQuote({
    fromAddress: swapData.fromAddress,
    fromChain: swapData.fromChain,
    toChain: swapData.toChain,
    fromToken: swapData.fromToken,
    toToken: swapData.toToken,
    fromAmount: swapData.fromAmount,
    //slippage: swapData.slippage,
    //fee: '0.02', // 2%
  })

  const transformedQuote = {
    fromToken: {
      ...quote.action.fromToken,
      amount: quote.action.fromAmount,
      amountUSD: quote.estimate.fromAmountUSD,
    },
    toToken: {
      ...quote.action.toToken,
      amount: quote.estimate.toAmount,
      amountUSD: quote.estimate.toAmountUSD,
    },
    slippage: quote.action.slippage,
    tool: quote.toolDetails,
    id: quote.id,
    minReceiveAmount: quote.estimate.toAmountMin,
    executionDuration: quote.estimate.executionDuration,
    gasCosts: quote.estimate.gasCosts,
    transaction: {
      approvalAddress: quote.estimate.approvalAddress,
      data: { ...quote.transactionRequest },
    },
    explorer:
      SUPPORTED_CHAINS.find((chain) => chain.id === Number(quote.action.fromChainId))
        ?.blockExplorers?.default.url ?? '',
  }

  return transformedQuote
}
