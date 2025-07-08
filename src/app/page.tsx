import { Chat } from '@/components/Chat'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div className="h-screen bg-slate-900 dark p-4 sm:p-6 lg:p-8">
      <Header />
      <div className="flex gap-8 h-full">
        {/* Chat Section */}
        <div className="flex-1">
          <Chat />
        </div>
      </div>
    </div>
  )
}
