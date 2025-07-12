import { CircleXIcon, CheckCircle2Icon, Loader2Icon } from 'lucide-react'
import { Button } from './custom-button'
import { Box } from './box'
import { FC } from 'react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { NumberFormat } from '@/components/ui/number-format'
import { formatUnits } from 'viem'

type Props = {
  status: 'pending' | 'success' | 'error'
  receiveToken: {
    symbol: string
    amount: string
    logo: string
    decimals: number
    chain: string
  }
  explorer: string
  txHash: `0x${string}` | undefined
}

const ProgressStatus: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <Loader2Icon className="size-10 animate-spin" />

      <span className="text-white text-lg font-medium">Transaction processing...</span>
    </div>
  )
}

const ProgressSuccess: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <CheckCircle2Icon className="size-10 text-success" />

      <span className="text-white text-lg font-medium">Transaction successful</span>
    </div>
  )
}

const ProgressError: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <CircleXIcon className="size-10 text-error" />

      <span className="text-white text-lg font-medium">Transaction failed</span>
    </div>
  )
}

const Progress: FC<Props> = ({ status, receiveToken, explorer, txHash }) => {
  return (
    <Box>
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Status Icon */}
        <div className="flex justify-center">
          {status === 'pending' && <ProgressStatus />}
          {status === 'success' && <ProgressSuccess />}
          {status === 'error' && <ProgressError />}
        </div>

        {/* Token Info */}
        <div className="flex items-center gap-3 bg-gray-800 rounded-xl p-4">
          {receiveToken.logo ? (
            <Image
              src={receiveToken.logo}
              alt={receiveToken.symbol}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <Skeleton className="size-10 rounded-full" />
          )}
          <div className="text-left">
            <div className="text-white font-semibold text-lg">
              <NumberFormat
                value={Number(formatUnits(BigInt(receiveToken.amount || 0), receiveToken.decimals))}
                displayType="text"
                thousandSeparator=","
                fixedDecimalScale
                suffix={receiveToken.symbol}
              />
            </div>
            <div className="text-gray-400 text-sm">on {receiveToken.chain}</div>
          </div>
        </div>

        <Button
          asLink
          isExternal
          href={`${explorer}/tx/${txHash}`}
          variant="default"
          size="sm"
          fullWidth
          disabled={!txHash || status === 'pending'}
        >
          View transaction
        </Button>
      </div>
    </Box>
  )
}

export { Progress }
