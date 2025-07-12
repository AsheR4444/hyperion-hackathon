import { CircleXIcon, CheckCircle2Icon, Loader2Icon } from 'lucide-react'
import { Button } from './custom-button'
import { Box } from './box'
import { FC } from 'react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

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

const Progress: FC<Props> = ({ status, receiveToken, explorer, txHash }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Loader2Icon className="w-12 h-12 text-blue-400 animate-spin" />,
          title: 'Transaction processing...',
          description: 'Please wait while we execute your transaction',
        }
      case 'success':
        return {
          icon: <CheckCircle2Icon className="w-12 h-12 text-green-400" />,
          title: 'Transaction completed!',
          description: 'Your swap has been successfully executed',
        }
      case 'error':
        return {
          icon: <CircleXIcon className="w-12 h-12 text-red-400" />,
          title: 'Transaction failed',
          description: 'Something went wrong with your transaction',
        }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <Box>
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Status Icon */}
        <div className="flex justify-center">{statusConfig.icon}</div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white">{statusConfig.title}</h2>

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
              {receiveToken.amount} {receiveToken.symbol}
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
