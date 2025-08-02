'use client'

import React, { useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { SearchForm } from './SearchForm'
import { EmptyState } from './empty-state'
import { useAccount } from 'wagmi'
import { SwapContainer } from '@/components/swap-form/container'
import { Message } from '@/components/Message'
import { ThinkingIndicator } from '@/components/ThinkingIndicator'

export function Chat() {
  const { address } = useAccount()
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: _handleSubmit,
    status,
    append,
  } = useChat({
    sendExtraMessageFields: true,
    maxSteps: 1,
  })

  const isNoMessages = messages.length === 0

  const handleSuggestionClick = useCallback(
    (text: string) => {
      append(
        {
          role: 'user',
          content: text,
        },
        {
          body: {
            walletAddress: address ?? null,
          },
        },
      )
    },
    [append, address],
  )

  // Wrap useChat handleSubmit to always include wallet status
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    _handleSubmit(e, {
      body: {
        walletAddress: address ?? null,
      },
    })
  }

  const isLoading = status === 'submitted'

  return (
    <div className="h-full flex flex-col max-w-[768px] w-full mx-auto">
      {/* Сообщения чата - растут сверху вниз */}
      <div className="flex-1 overflow-y-auto pt-4 scrollbar-hide pb-10">
        {/* <ChatMessages messages={messages} isLoading={isLoading} /> */}

        {messages.map((message) => (
          <div key={message.id}>
            {message.parts?.map((part, partIndex) => {
              if (part.type === 'text') {
                return (
                  <Message
                    key={`${message.id}-${partIndex}`}
                    text={part.text}
                    role={message.role === 'user' ? 'user' : 'ai'}
                  />
                )
              }

              if (part.type === 'tool-invocation') {
                const { toolName, toolCallId, state } = part.toolInvocation

                if (state === 'result') {
                  const result = part.toolInvocation.result
                  switch (toolName) {
                    case 'showOnchainUI':
                      return (
                        <SwapContainer
                          key={toolCallId}
                          actionType={result.actionType}
                          amount={result.amount}
                          fromAsset={result.fromAsset}
                          fromChain={result.fromChain}
                          toAsset={result.toAsset}
                          toChain={result.toChain}
                          address={result.address}
                          slippage={result.slippage}
                          fromTokenDecimals={result.fromTokenDecimals}
                          toTokenDecimals={result.toTokenDecimals}
                        />
                      )
                    default:
                      return null
                  }
                }
              }
            })}

            {!message.parts && message.content && (
              <Message text={message.content} role={message.role === 'user' ? 'user' : 'ai'} />
            )}
          </div>
        ))}

        {isNoMessages && <EmptyState />}

        {status === 'submitted' && <ThinkingIndicator />}
      </div>

      {/* Форма ввода - зафиксирована внизу с отступом 30px */}
      <div className="flex-shrink-0 w-full max-w-3xl mx-auto px-3 md:px-0 pb-5">
        <SearchForm
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isNoMessages={isNoMessages}
          onSuggestionClick={handleSuggestionClick}
          value={input}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  )
}
