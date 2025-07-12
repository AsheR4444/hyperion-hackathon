# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

This project uses pnpm as the package manager (specified in package.json).

## Architecture Overview

This is a Next.js 15 application called "OrbitAI" - an AI-powered copilot for the Metis blockchain that specializes in token swaps.

### Core Technologies
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form + Zod** for form validation
- **Wagmi + ConnectKit** for Web3 wallet integration (Metis chain)
- **LiFi SDK** for cross-chain swap functionality
- **Alith** for AI agent functionality
- **Tanstack Query** for data fetching

### Key Architecture Components

**AI Agent System:**
- Located in `src/lib/alith/` - handles AI interactions
- System prompt in `src/lib/alith/system-prompt.ts` defines OrbitAI's behavior
- Chat API endpoint at `src/app/api/chat/route.ts` processes user messages
- Uses OpenAI GPT-4 model with custom system prompt

**Blockchain Integration:**
- Focused on Metis blockchain network
- Wallet connection handled via `src/providers/global.provider.tsx`
- Transaction processing through LiFi SDK at `src/app/api/transaction/route.ts`
- Chain mappings and helpers in `src/lib/lifi/`

**UI Structure:**
- Main layout in `src/app/layout.tsx` with global providers
- Home page displays Header + Chat interface
- Swap form components in `src/components/swap-form/`
- Chat components handle AI conversation flow

**Form Handling:**
- Swap form validation schema in `src/components/swap-form/schema.ts`
- Transaction validation in `src/app/api/transaction/validation.ts`
- Uses React Hook Form with Zod validation

### Environment Variables Required
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect integration
- `OPENAI_API_KEY` - AI agent functionality
- `LIFI_API_KEY` - Cross-chain swap functionality

### Key Patterns
- API routes follow Next.js App Router conventions
- Components use TypeScript with proper type definitions
- Zod schemas for runtime validation
- Error handling with proper status codes
- Caching for LiFi SDK configuration to avoid re-initialization