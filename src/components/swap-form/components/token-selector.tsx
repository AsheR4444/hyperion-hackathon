import { FC } from 'react'

import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

interface TokenSelectorProps {
  icon?: string
  symbol?: string
  network?: string
}

const TokenSelector: FC<TokenSelectorProps> = ({ icon, symbol, network }) => {
  return (
    <div className="flex items-center gap-x-4">
      {icon ? (
        <Image src={icon} alt={`${symbol} logo`} width={40} height={40} className="rounded-full" />
      ) : (
        <Skeleton className="size-10 rounded-full" />
      )}
      <div className="flex flex-col text-end">
        {symbol ? (
          <span className="text-white font-medium">{symbol}</span>
        ) : (
          <Skeleton className="w-[60px] h-[20px]" />
        )}

        {network ? (
          <span className="text-gray-400 text-sm">{network}</span>
        ) : (
          <Skeleton className="w-[50px] h-[20px] ms-auto mt-1" />
        )}
      </div>
    </div>
  )
}

export { TokenSelector }
