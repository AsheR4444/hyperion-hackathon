import { UseFormRegisterReturn } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Skeleton } from '../../ui/skeleton'
import Image from 'next/image'

type Token = {
  symbol: string
  name: string
  icon: string
  chain: string
}

type SwapInputProps = {
  register: UseFormRegisterReturn
  value?: string
  onChange?: (value: string) => void
  token: Token
  usdValue: number
  placeholder?: string
  readOnly?: boolean
}

const SwapInput = ({
  register,
  value,
  onChange,
  token,
  usdValue,
  placeholder = '0.0',
  readOnly = false,
}: SwapInputProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <Input
            {...register}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            type="text"
            className="bg-transparent border-none text-white text-lg font-medium p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={placeholder}
            readOnly={readOnly}
          />
          <div className="text-gray-400 text-sm mt-2">$ {usdValue.toFixed(4)}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
            {token.icon ? (
              <Image
                src={token.icon}
                alt={token.symbol}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <Skeleton className="size-5 rounded-full" />
            )}
            <span className="text-white font-medium">{token.symbol}</span>
            <span className="text-gray-400 text-sm">{token.chain}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const LoadingSwapInput = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

const Component = Object.assign(SwapInput, {
  Skeleton: LoadingSwapInput,
})

export { Component as SwapInput }
export type { SwapInputProps, Token }
