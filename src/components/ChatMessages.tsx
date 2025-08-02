import React, { useEffect, useRef } from 'react'

import { UserMessage } from './UserMessage'
import { AgentMessage } from './AgentMessage'
import { Message } from 'ai'

interface ChatMessagesProps {
  messages: Message[] | undefined
  isLoading?: boolean
}

export function ChatMessages({ messages, isLoading = false }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Автоскролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  if (messages?.length === 0 && !isLoading) {
    return null
  }

  return (
    <div className="space-y-1">
      {messages.map((message) => (
        <div key={message.id}>
          {message.type === 'user' ? (
            <UserMessage message={message} />
          ) : (
            <AgentMessage message={message} />
          )}
        </div>
      ))}

      {/* Индикатор загрузки */}
      {isLoading && (
        <AgentMessage
          message={{
            id: 'loading',
            type: 'agent',
            content: '',
          }}
          isLoading={true}
        />
      )}

      {/* Элемент для автоскролла */}
      <div ref={messagesEndRef} />
    </div>
  )
}
