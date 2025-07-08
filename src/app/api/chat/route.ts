import { systemPrompt } from '@/lib/alith'
import { Agent } from 'alith'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const InputSchema = z
  .object({
    x: z.number().describe('The number to substract from'),
    y: z.number().describe('The number to substract'),
  })
  .strip()

const agent = new Agent({
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY,
  preamble: systemPrompt,
})

export async function POST(req: Request) {
  const { message, id, walletAddress } = await req.json()

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required and must be a string' }, { status: 400 })
  }

  // Get response from the agent
  const newMessage = `USER_WALLET_ADDRESS: ${walletAddress}\n\n${message}`
  const response = await agent.prompt(newMessage)

  console.log(response)

  return NextResponse.json({ response })
}
