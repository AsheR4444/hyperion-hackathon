import { UseFormRegisterReturn } from 'react-hook-form'
import { Input } from '../ui/input'

type Token = {
  symbol: string
  name: string
  icon: string
  chain: string
}

type SwapInputProps = {
  register: UseFormRegisterReturn
  token: Token
  usdValue: number
  placeholder?: string
  readOnly?: boolean
}

const SwapInput = ({
  register,
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
            type="text"
            className="bg-transparent border-none text-white text-lg font-medium p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={placeholder}
            readOnly={readOnly}
          />
          <div className="text-gray-400 text-sm mt-2">$ {usdValue.toFixed(4)}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
            <span className="text-lg">{token.icon}</span>
            <span className="text-white font-medium">{token.symbol}</span>
            <span className="text-gray-400 text-sm">{token.chain}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SwapInput }
export type { SwapInputProps, Token }
