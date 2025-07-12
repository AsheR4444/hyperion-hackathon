import { createConfig, HTTPError, SDKError, ChainType, getChains, SDKBaseConfig } from '@lifi/sdk'
import { NextResponse } from 'next/server'

import { CHAIN_NAME_TO_ID } from '@/lib/lifi'

import { getTransaction } from './lifi'
import { TransactionRequestSchema } from './validation'

function resolveChainId(chain: string): number | undefined {
  return CHAIN_NAME_TO_ID[chain.toLowerCase()]
}

// Кешируем конфигурацию
let configCache: SDKBaseConfig | null = null
let configPromise: Promise<SDKBaseConfig> | null = null

const getConfig = async () => {
  const chains = (await getChains({ chainTypes: [ChainType.EVM] })).filter((chain) =>
    Object.values(CHAIN_NAME_TO_ID).includes(chain.id),
  )

  return createConfig({
    integrator: 'testimggggg',
    apiKey: process.env.LIFI_API_KEY,
    chains,
  })
}

const getOrCreateConfig = async () => {
  // Если уже есть кеш - возвращаем его
  if (configCache) {
    return configCache
  }

  // Если промис уже выполняется - ждем его
  if (configPromise) {
    return configPromise
  }

  // Создаем новый промис
  configPromise = getConfig()

  try {
    configCache = await configPromise
    return configCache
  } catch (error) {
    // Сбрасываем промис при ошибке, чтобы можно было повторить
    configPromise = null
    throw error
  }
}

export async function POST(req: Request) {
  let payload: unknown

  try {
    payload = await req.json()
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = TransactionRequestSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Invalid payload',
        details: parsed.error.format(),
      },
      { status: 400 },
    )
  }

  // --------- Build LiFi Quote ------------------------------------------
  const swap = parsed.data.transaction.swapData

  const fromChainId = resolveChainId(swap.fromChain)
  const toChainId = resolveChainId(swap.toChain)

  if (!fromChainId || !toChainId) {
    return NextResponse.json(
      {
        error: 'Unsupported chain',
        details: { from_chain: swap.fromChain, to_chain: swap.toChain },
      },
      { status: 400 },
    )
  }

  try {
    // Получаем конфигурацию лениво
    const config = await getOrCreateConfig()

    const quote = await getTransaction({
      fromAddress: swap.eoaAddress,
      fromChain: fromChainId.toString(),
      toChain: toChainId.toString(),
      fromToken: swap.fromAsset,
      toToken: swap.toAsset,
      fromAmount: swap.amount,
      slippage: swap.slippage,
    })

    return NextResponse.json(quote)
  } catch (e: any) {
    const error = e as SDKError
    const cause = error.cause as HTTPError

    return NextResponse.json(
      {
        message: cause.responseBody?.message,
      },
      { status: cause.status },
    )
  }
}
