import Link from 'next/link'
import { XLogo } from '@/assets'
import { Chat } from '@/components/Chat'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div className="h-screen bg-slate-900 dark pt-20">
      <Header />
      <div className="flex gap-8 h-full">
        {/* Chat Section */}
        <div className="flex-1">
          <Chat />
        </div>
      </div>
      <footer className="fixed bottom-0 start-0 p-6 hidden lg:block">
        <Link href="https://x.com/orbit_agent" target="_blank" rel="noopener noreferrer">
          <XLogo />
        </Link>
        <Link
          href="https://forms.gle/Ak9JDxZhQ6zudhTA9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 mt-3 block"
        >
          Found a bug ?
        </Link>
      </footer>
    </div>
  )
}
