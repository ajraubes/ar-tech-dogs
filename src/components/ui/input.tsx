import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      data-slot="input"
      className={cn(
        [
          'flex h-12 w-full min-w-0 rounded-lg border border-input bg-foreground/[0.03] px-4 text-base text-foreground',
          'placeholder:text-muted-foreground/70 transition-[border-color,box-shadow,background-color] duration-150',
          'hover:border-border-strong focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
        ].join(' '),
        className,
      )}
      type={type}
      {...props}
    />
  )
}

export { Input }
