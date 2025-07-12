'use client'

import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

import { FullLogo } from '@/assets'

const Header = () => {
  return (
    <header className="flex justify-between items-center fixed top-0 left-0 w-full z-500 pt-10 px-5">
      <Link href="/" className="flex items-center">
        <FullLogo className="h-8 w-auto" />
      </Link>
      <ConnectKitButton />
    </header>
  )
}

export { Header }
