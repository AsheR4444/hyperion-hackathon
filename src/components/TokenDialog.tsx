'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X, Search } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import supportedTokens from '../../supported-tokens.json'
import { useMemo, useState } from 'react'

interface Token {
  chainId: number
  address: string
  symbol: string
  name: string
  decimals: number
  priceUSD: string
  coinKey?: string
  logoURI?: string
}

interface TokenDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTokenSelect?: (token: Token) => void
}

export function TokenDialog({ open, onOpenChange, onTokenSelect }: TokenDialogProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const tokens = supportedTokens.tokens[1088] || []

  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens

    const query = searchQuery.toLowerCase()
    return tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(query) ||
        token.name.toLowerCase().includes(query) ||
        token.coinKey?.toLowerCase().includes(query),
    )
  }, [searchQuery, tokens])

  const handleTokenSelect = (token: Token) => {
    onTokenSelect?.(token)
    onOpenChange(false)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        setSearchQuery('')
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-100" />
        <Dialog.Content className="fixed left-[50%] top-[50%] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-300 sm:rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-200">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
              Supported tokens
            </Dialog.Title>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-[400px] overflow-y-auto space-y-1">
            {filteredTokens.map((token) => (
              <button
                key={`${token.address}-${token.symbol}`}
                onClick={() => handleTokenSelect(token)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-left"
              >
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  {token.logoURI ? (
                    <Image
                      src={token.logoURI}
                      alt={token.symbol}
                      width={40}
                      height={40}
                      className="rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                  ) : null}
                  <div
                    className={cn(
                      'text-xs font-medium text-muted-foreground',
                      token.logoURI ? 'hidden' : '',
                    )}
                  >
                    {token.symbol.slice(0, 3).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{token.symbol}</div>
                  <div className="text-xs text-muted-foreground truncate">{token.name}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium">
                    ${parseFloat(token.priceUSD).toFixed(4)}
                  </div>
                  <div className="text-xs text-muted-foreground">USD</div>
                </div>
              </button>
            ))}

            {filteredTokens.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Tokens not found</p>
                <p className="text-xs">Try changing the search query</p>
              </div>
            )}
          </div>

          <Dialog.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
