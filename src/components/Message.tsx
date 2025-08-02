import { FC } from 'react'
import { AgentMessage } from '@/components/AgentMessage'

type Props = {
  role: 'user' | 'ai'
  text: string
}

const Message: FC<Props> = ({ role, text }) => {
  if (role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] sm:max-w-[70%]">
          <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg">
            <p className="text-sm sm:text-base whitespace-pre-wrap break-words">{text}</p>
          </div>
        </div>
      </div>
    )
  }

  return <AgentMessage message={text} />
}

export { Message }
