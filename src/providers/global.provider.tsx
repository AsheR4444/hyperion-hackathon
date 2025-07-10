'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { cookieStorage, createConfig, createStorage, http, type State, WagmiProvider } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'

import { metis } from 'wagmi/chains'

type Props = {
  children: ReactNode
  initialState: State | undefined
}

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: [metis],

    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [metis.id]: http(),
    },

    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: 'OrbitAI',
  }),
)

const queryClient = new QueryClient()

export function GlobalProvider({ children, initialState }: Props) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
