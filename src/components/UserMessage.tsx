import React from 'react'
import { Message } from '@/types/chat'

interface UserMessageProps {
  message: Message
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-[80%] sm:max-w-[70%]">
        <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg">
          <p className="text-sm sm:text-base whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
