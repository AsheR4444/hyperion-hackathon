'use client'

import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'
import { useState } from 'react'
import { Coins } from 'lucide-react'

import { FullLogo } from '@/assets'
import { TokenDialog } from './TokenDialog'
import { Button } from './ui/button'

const Header = () => {
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false)

  return (
    <header className="justify-between items-center fixed top-0 left-0 w-full z-10 pt-10 pb-5 px-5 bg-slate-900 hidden md:flex">
      <Link href="/" className="flex items-center">
        <FullLogo className="h-8 w-auto" />
      </Link>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTokenDialogOpen(true)}
          className="flex items-center gap-2 text-white h-10"
        >
          <Coins className="h-4 w-4" />
          Supported tokens
        </Button>
        <ConnectKitButton />
      </div>

      <TokenDialog
        open={tokenDialogOpen}
        onOpenChange={setTokenDialogOpen}
        onTokenSelect={(token) => {
          console.log('Selected token:', token)
        }}
      />
    </header>
  )
}

export { Header }
