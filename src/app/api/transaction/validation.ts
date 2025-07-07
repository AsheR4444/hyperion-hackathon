import { z } from 'zod'

const SwapDataSchema = z
  .object({
    amount: z.string(),
    fromAsset: z.string(),
    fromChain: z.string(),
    toAsset: z.string(),
    toChain: z.string(),
    eoaAddress: z.string(),
    toAddress: z.string(),
    slippage: z.string(),
    //provider: z.string(),
  })
  .strict()

const PipelineItemSchema = z
  .object({
    actionType: z.enum(['swap']),
    swapData: SwapDataSchema,
  })
  .strict()

const TransactionRequestSchema = z
  .object({
    transaction: PipelineItemSchema,
  })
  .strict()

export { TransactionRequestSchema }
