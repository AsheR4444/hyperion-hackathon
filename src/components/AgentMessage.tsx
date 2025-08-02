import React from 'react'
import { Bot } from 'lucide-react'

interface AgentMessageProps {
  message: string
}

export function AgentMessage({ message }: AgentMessageProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%] sm:max-w-[70%]">
        <div className="flex items-start gap-3">
          {/* Аватар агента */}
          <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mt-1">
            <Bot className="w-4 h-4 text-gray-300" />
          </div>

          {/* Контент сообщения */}
          <div className="flex-1">
            <div className="bg-gray-800 text-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg border border-gray-700">
              <p className="text-sm sm:text-base whitespace-pre-wrap break-words">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
