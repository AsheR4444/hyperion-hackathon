'use client'

import { ConnectKitButton } from 'connectkit'

const Header = () => {
  return (
    <header className="flex justify-end fixed top-0 right-0 w-full z-500 py-10 px-5">
      <ConnectKitButton />
    </header>
  )
}

export { Header }
