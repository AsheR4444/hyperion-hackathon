import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'flex items-center justify-center rounded-xl transition-all disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-hover-primary',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-xl px-3',
        md: 'h-[30px] p-2',
        lg: 'h-11 rounded-xl px-8',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonAsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asLink?: false
    href?: never
    isExternal?: never
  }

type ButtonAsLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    asLink: true
    href: string
    isExternal?: boolean
    disabled?: boolean
  }

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, asLink, href, isExternal, fullWidth, disabled, ...props }, ref) => {
    if (asLink && href) {
      if (disabled) {
        return (
          <span
            className={cn(
              buttonVariants({ variant, size, fullWidth, className }),
              'pointer-events-none opacity-50',
            )}
            ref={ref as any}
            aria-disabled="true"
            {...(props as any)}
          />
        )
      }

      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref as any}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref as any}
        disabled={disabled}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants, type ButtonProps }
