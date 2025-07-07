import { metis } from 'viem/chains'

export const SUPPORTED_CHAINS = [metis]

export const CHAIN_NAME_TO_ID: Record<string, number> = {
  metis: 1088,
}

export const SUPPORTED_CHAIN_NAMES = Object.keys(CHAIN_NAME_TO_ID)

// Reverse lookup: id -> chain name (e.g., 8453 → 'base')
export const CHAIN_ID_TO_NAME: Record<number, string> = Object.fromEntries(
  Object.entries(CHAIN_NAME_TO_ID).map(([name, id]) => [id, name]),
) as Record<number, string>
