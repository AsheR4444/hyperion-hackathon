'use client'

import { FC, useMemo } from 'react'

import { formatUnits } from 'viem'

import { Skeleton } from '@/components/ui/skeleton'
import { NumberFormat } from '@/components/ui/number-format'

import { TokenSelector } from './token-selector'
import { _NumericInput } from '@/components/ui/numeric-input'

type TokenInputProps = {
  readOnly?: boolean
  name: string
  label?: string
  dollarValue?: string
  value?: string | number
  onChange?: (value: string) => void
  token: {
    icon?: string
    symbol?: string
    network?: string
  }
  decimals?: number
}

const TokenInput: FC<TokenInputProps> = ({
  name,
  label,
  dollarValue,
  value,
  token,
  readOnly = false,
  onChange,
  decimals,
}) => {
  const visibleValue = useMemo(() => {
    if (decimals) {
      return Number(formatUnits(BigInt(value || 0), decimals))
    }

    return value
  }, [value, decimals])

  return (
    <div className="flex bg-card-bg w-full justify-between items-center gap-y-2 rounded-xl p-4 border-card-border border">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="flex flex-col gap-y-2">
        {/* Editable numeric input */}
        {onChange ? (
          <_NumericInput
            value={visibleValue}
            placeholder="0.1"
            readOnly={readOnly}
            className="w-full outline-none bg-transparent"
            onValueChange={({ value }) => onChange(value)}
          />
        ) : value ? (
          /* Read-only numeric value */
          <_NumericInput
            value={visibleValue}
            placeholder="0.1"
            decimalScale={7}
            readOnly={true}
            className="w-full outline-none bg-transparent"
          />
        ) : (
          <Skeleton className="w-[100px] h-[21px]" />
        )}

        {dollarValue ? (
          <span className="text-gray-400 text-sm">
            <NumberFormat
              value={Number(dollarValue)}
              displayType="text"
              thousandSeparator=","
              decimalScale={4}
              fixedDecimalScale
              currency="$"
            />
          </span>
        ) : (
          <Skeleton className="w-[80px] h-[21px]" />
        )}
      </div>
      <TokenSelector icon={token.icon} symbol={token.symbol} network={token.network} />
    </div>
  )
}

export { TokenInput }
