import { FC, useMemo } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

const thinkingPhrases = [
  'Mining thoughts from the blockchain',
  'Validating your request on the mempool',
  'Consulting the oracle of DeFi wisdom',
  'Bridging neurons across synapses',
  'Staking my reputation on this answer',
  'Swapping confusion for clarity',
  'Hodling while I process this',
  'Calculating gas fees for brain power',
  'Decentralizing my thought process',
  'Smart contract executing in my mind',
  'Forking my consciousness for better results',
  'Liquidity pooling my knowledge',
  'Yield farming some fresh insights',
  'Minting a new perspective for you',
  'Flashing a loan from the wisdom vault',
  'Wrapping your question in understanding',
  'Governance voting on the best answer',
  'Slashing incorrect thoughts from memory',
  'Airdropping knowledge directly to you',
  'Burning tokens of confusion',
]

const ThinkingIndicator: FC<Props> = ({ className }) => {
  const randomPhrase = useMemo(() => {
    return thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)]
  }, [])

  return (
    <div className={cn('flex w-full mb-4 justify-start', className)}>
      <div
        className={cn(
          'max-w-[80%] px-4 py-3 rounded-xl',
          'typography-md text-text-main',
          'bg-surface-bg border border-card-border rounded-bl-sm',
          'flex items-end gap-2',
          'relative overflow-hidden',
          'after:absolute after:inset-0',
          'after:translate-x-[-100%]',
          'after:animate-[shimmer_2s_infinite]',
          'after:bg-gradient-to-r',
          'after:from-transparent after:via-static-white/10 after:to-transparent',
        )}
      >
        <span className="text-text-secondary relative z-10">{randomPhrase}</span>
        <div className="flex gap-1 relative z-10 pb-[5px]">
          <div className="w-[2px] h-[2px] bg-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-[2px] h-[2px] bg-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-[2px] h-[2px] bg-text-secondary rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export { ThinkingIndicator }
