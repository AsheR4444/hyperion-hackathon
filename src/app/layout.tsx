import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Geist, Geist_Mono } from 'next/font/google'
import { GlobalProvider, wagmiConfig } from '@/providers/global.provider'
import { cookieToInitialState } from 'wagmi'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'OrbitAI | Metis',
  description: 'Your AI Metis Copilot',
  icons: {
    icon: '/logo.ico',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(wagmiConfig, (await headers()).get('cookie'))

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalProvider initialState={initialState}>{children}</GlobalProvider>
      </body>
    </html>
  )
}
