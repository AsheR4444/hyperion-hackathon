import { z } from 'zod'
import { Agent } from 'alith'
import { NextResponse } from 'next/server'
import { systemPrompt } from '@/lib/alith'

export const InputSchema = z
  .object({
    x: z.number().describe('The number to substract from'),
    y: z.number().describe('The number to substract'),
  })
  .strip()

// @ts-expect-error
const agent = new Agent({
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY,
  preamble: systemPrompt,
  tools: [
    {
      name: 'subtract',
      description: 'Subtract y from x (i.e.: x - y)',
      // @ts-expect-error
      parameters: InputSchema,
      // @ts-expect-error
      handler: (x: number, y: number) => {
        return x - y
      },
    },
  ],
})

// // @ts-expect-error
// const agent = new Agent({
//   model: 'gpt-4',
//   apiKey: process.env.OPENAI_API_KEY,
//   preamble:
//     'You are a calculator here to help the user perform arithmetic operations. Use the tools provided to answer the user question.',
//   tools: [
//     {
//       name: 'subtract',
//       description: 'Subtract y from x (i.e.: x - y)',
//       // @ts-expect-error
//       parameters: InputSchema,
//       // @ts-expect-error
//       handler: (x: number, y: number) => {
//         return x - y
//       },
//     },
//   ],
// })

export async function POST(req: Request) {
  const { message, walletAddress } = await req.json()

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required and must be a string' }, { status: 400 })
  }

  // Get response from the agent
  const newMessage = `USER_WALLET_ADDRESS: ${walletAddress}\n\n${message}`
  const response = await agent.prompt(newMessage)

  console.log(response)

  return NextResponse.json({ response })
}
