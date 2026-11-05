'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out',
    'active:scale-[0.97] active:duration-75',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'rounded-full bg-primary text-primary-foreground shadow-[0_1px_0_0_rgb(255_255_255/0.25)_inset,0_8px_24px_-8px_color-mix(in_oklch,var(--primary)_60%,transparent)] hover:bg-[color-mix(in_oklch,var(--primary)_88%,white)]',
        destructive: 'rounded-full bg-destructive text-white hover:bg-destructive/90',
        outline:
          'rounded-full border border-border-strong bg-transparent text-foreground hover:bg-foreground/[0.06] hover:border-foreground/30',
        secondary: 'rounded-full bg-secondary text-secondary-foreground hover:bg-accent',
        ghost: 'rounded-full text-foreground hover:bg-foreground/[0.06]',
        link: 'text-foreground underline-offset-4 decoration-primary/60 hover:underline active:scale-100',
      },
      size: {
        clear: '',
        sm: 'h-10 px-4 text-sm',
        default: 'h-11 px-5 text-[0.9375rem]',
        lg: 'h-12 px-6 text-base md:h-14 md:px-7',
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
