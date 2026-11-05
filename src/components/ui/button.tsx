'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold select-none',
    'transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out-quart)]',
    'active:scale-[0.97] active:duration-100',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'btn-pour isolate overflow-hidden rounded-full bg-primary text-primary-foreground',
        destructive: 'rounded-full bg-destructive text-white hover:bg-destructive/90',
        outline:
          'rounded-full border-[1.5px] border-foreground/80 bg-transparent text-foreground hover:bg-foreground hover:text-background',
        secondary: 'rounded-full bg-card text-secondary-foreground hover:bg-secondary',
        ghost: 'rounded-full text-foreground hover:bg-card',
        link: 'text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground active:scale-100',
      },
      size: {
        clear: '',
        sm: 'h-11 px-5 text-[0.9375rem]',
        default: 'h-12 px-6 text-base',
        lg: 'h-14 px-7 text-[1.0625rem]',
        icon: 'size-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
