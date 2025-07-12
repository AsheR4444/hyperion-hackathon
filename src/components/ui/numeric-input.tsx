import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import { NumericFormat, type NumericFormatProps } from 'react-number-format'

type Props = Omit<NumericFormatProps, 'inputRef'> & { currency?: string }

const _NumericInput = forwardRef<ElementRef<'input'>, Props>(
  (
    {
      inputMode = 'decimal',
      allowLeadingZeros = false,
      allowNegative = false,
      thousandSeparator = ',',
      allowedDecimalSeparators = [',', '.'],
      readOnly,
      ...props
    },
    ref,
  ) => {
    return (
      <NumericFormat
        allowedDecimalSeparators={allowedDecimalSeparators}
        inputMode={inputMode}
        allowLeadingZeros={allowLeadingZeros}
        allowNegative={allowNegative}
        thousandSeparator={thousandSeparator}
        getInputRef={ref}
        readOnly={readOnly}
        {...props}
      />
    )
  },
)

_NumericInput.displayName = '_NumericInput'

type _ExternalNumericInputProps = Omit<
  ComponentPropsWithoutRef<typeof _NumericInput>,
  'value' | 'onValueChange' | 'onChange' | 'size'
>

export { _NumericInput }
export type { _ExternalNumericInputProps }
