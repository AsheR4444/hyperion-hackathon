import { systemPrompt } from '@/lib/alith'
import { Agent } from 'alith'
import { NextResponse } from 'next/server'

const agent = new Agent({
  model: 'deepseek-chat',
  apiKey: process.env.DEEPSEEK_API_KEY,
  preamble: systemPrompt,
  baseUrl: 'api.deepseek.com',
})

export async function POST(req: Request) {
  const { message, id, walletAddress } = await req.json()

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required and must be a string' }, { status: 400 })
  }

  // Inject wallet status so the LLM can decide if it should ask the user to connect
  const walletInfoMessage = {
    role: 'system' as const,
    content: walletAddress ? `USER_WALLET_ADDRESS: ${walletAddress}` : 'USER_WALLET_ADDRESS: none',
  }

  // Get response from the agent
  const response = await agent.prompt(message)

  console.log(response)

  return NextResponse.json({ response })
}
