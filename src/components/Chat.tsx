'use client'

import React, { useState } from 'react'
import { Message } from '@/types/chat'
import { ChatMessages } from './ChatMessages'
import { SearchForm } from './SearchForm'
import { EmptyState } from './empty-state'

// Симуляция ответа агента
const simulateAgentResponse = async (userMessage: string): Promise<string> => {
  // Простые ответы для демонстрации
  const responses = [
    `Интересный вопрос о "${userMessage}". Позвольте мне подумать...`,
    `Вы спросили: "${userMessage}". Это действительно важная тема.`,
    `Относительно "${userMessage}" - есть несколько аспектов, которые стоит рассмотреть.`,
    `Спасибо за вопрос о "${userMessage}". Вот что я могу сказать по этому поводу...`,
    `"${userMessage}" - отличная тема для обсуждения. Давайте разберем это подробнее.`,
  ]

  // Случайная задержка 1-3 секунды
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

  return responses[Math.floor(Math.random() * responses.length)]
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const isNoMessages = messages.length === 0

  const handleSendMessage = async (content: string) => {
    // Создаем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
    }

    // Добавляем сообщение пользователя
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Получаем ответ агента
      const agentResponse = await simulateAgentResponse(content)

      // Создаем сообщение агента
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: agentResponse,
      }

      // Добавляем ответ агента
      setMessages((prev) => [...prev, agentMessage])
    } catch (error) {
      console.error('Ошибка при получении ответа:', error)

      // Сообщение об ошибке
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'Извините, произошла ошибка. Попробуйте еще раз.',
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col max-w-[768px] w-full mx-auto">
      {/* Сообщения чата - растут сверху вниз */}
      <div className="flex-1 overflow-y-auto pt-4 scrollbar-hide pb-10">
        <ChatMessages messages={messages} isLoading={isLoading} />
        {isNoMessages && <EmptyState />}

        {/* <SwapContainer
          actionType="swap"
          amount="0.01"
          fromAsset="metis"
          fromChain="metis"
          toAsset="m.USDT"
          toChain="metis"
          address="0x72D2Af8EF64196F8A9267803b775Bf2342910083"
          fromTokenDecimals={18}
          toTokenDecimals={6}
        /> */}
      </div>

      {/* Форма ввода - зафиксирована внизу с отступом 30px */}
      <div className="flex-shrink-0 w-full max-w-3xl mx-auto px-3 md:px-0 pb-5">
        <SearchForm
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isNoMessages={isNoMessages}
        />
      </div>
    </div>
  )
}
