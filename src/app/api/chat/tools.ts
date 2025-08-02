import { getToken } from '@lifi/sdk'
import { tool } from 'ai'
import { z } from 'zod'

import { CHAIN_NAME_TO_ID, SUPPORTED_CHAIN_NAMES } from '@/lib/lifi'

const showOnchainUI = tool({
  description: `Show onchain UI for swap. Use this tool when user wants to swap or bridge tokens. You can use this tool multiple times for different swaps. You can use this tool only for supported chains. If user mention only one chain it is swap, if user mention two chains it is bridge.
  Display the on-chain swap/bridge interface.
  ─ Swap ─
  • Trigger when the user mentions EXACTLY ONE blockchain
    (e.g. “swap 0.001 ETH to USDC on Metis).
  • In this case set both fromChain and toChain to that same chain (Metis).
  • Do NOT infer “Ethereum” just because the token is called ETH; the chain
    is determined solely by the chain names the user explicitly provides.
  • Here fromChain and toChain must be different.
  • You may call this tool multiple times within a single conversation.
  • Supported chains: ${SUPPORTED_CHAIN_NAMES}. Other chains are not supported yet you can tell user that we are working on it.
  • If the user requests another chain, apologise and inform them we’re working on it.
`,
  parameters: z.object({
    fromChain: z.string(),
    fromToken: z.string(),
    toChain: z.string(),
    toToken: z.string(),
    fromAmount: z.string(),
    toAmount: z.string(),
    fromAddress: z.string(),
    toAddress: z.string(),
    //slippage: z.string(),
  }),
  execute: async (params) => {
    const fromChainId = CHAIN_NAME_TO_ID[params.fromChain]
    const toChainId = CHAIN_NAME_TO_ID[params.toChain]

    const fromToken = await getToken(fromChainId, params.fromToken)

    // FIXME: убрать это отсюда и вынести в форму
    const toToken = await getToken(toChainId, params.toToken)

    return {
      actionType: 'swap',
      amount: params.fromAmount,
      fromAsset: params.fromToken,
      fromChain: params.fromChain,
      toAsset: params.toToken,
      toChain: params.toChain,
      address: params.fromAddress,
      //slippage: params.slippage,
      fromTokenDecimals: fromToken.decimals,
      toTokenDecimals: toToken.decimals,
    }
  },
})

export { showOnchainUI }
