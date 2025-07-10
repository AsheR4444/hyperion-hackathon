import { FC } from 'react'
import { AlertCircle } from 'lucide-react'

type Props = {
  error: string | null
}

export const SwapFormError: FC<Props> = ({ error }) => {
  if (!error) return null

  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-400 font-medium text-sm">Error</p>
          <p className="text-red-300 text-sm mt-1">{error}</p>
        </div>
      </div>
    </div>
  )
}
