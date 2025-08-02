import { streamText } from 'ai'

import { systemPrompt } from '@/lib/alith'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { showOnchainUI } from '@/app/api/chat/tools'

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

const chatModel = openrouter.chat('openai/gpt-4.1-mini')

export async function POST(req: Request) {
  const { messages, walletAddress } = await req.json()

  const walletInfoMessage = {
    role: 'system' as const,
    content: walletAddress ? `USER_WALLET_ADDRESS: ${walletAddress}` : 'USER_WALLET_ADDRESS: none',
  }

  const result = streamText({
    model: chatModel,
    system: systemPrompt,
    tools: {
      showOnchainUI,
    },
    messages: [walletInfoMessage, ...messages],
    onError: (error) => {
      console.error('🔴 StreamText Error:', error)
    },
    async onFinish({ response }) {
      // Optionally persist chat with wallet info
    },
  })

  return result.toDataStreamResponse()
}
