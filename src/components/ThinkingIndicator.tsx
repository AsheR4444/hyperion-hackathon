import { FC, useMemo } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

const thinkingPhrases = [
  'Alith framework orchestrating AI agents',
  'OrbitAI protocols analyzing your request',
  'Sequencer mining insights from the neural pool',
  'Staking METIS on this answer',
  'Metis executing AI-native computations',
  'Hyperion-speed parallel execution engaged',
  'Generative UI rendering perfect responses',
  'On-chain tools executing seamlessly',
  'Cross-chain bridging problems to solutions',
  'Hyperion hackathon mode: $200K thinking',
]

const ThinkingIndicator: FC<Props> = ({ className }) => {
  const randomPhrase = useMemo(() => {
    return thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)]
  }, [])

  return (
    <div className={cn('flex w-full mb-4 justify-start animate-pulse', className)}>
      <div
        className={cn(
          'max-w-[80%] px-4 py-3 rounded',
          'typography-md text-white',
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
        <span className="text-white relative z-10">{randomPhrase}</span>
        <div className="flex gap-1 relative z-10 pb-[5px]">
          <div className="w-[2px] h-[2px] bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-[2px] h-[2px] bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-[2px] h-[2px] bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export { ThinkingIndicator }
