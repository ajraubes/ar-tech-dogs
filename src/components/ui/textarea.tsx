import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        [
          'flex field-sizing-content min-h-36 w-full rounded-lg border border-input bg-foreground/[0.03] px-4 py-3 text-base leading-relaxed text-foreground',
          'placeholder:text-muted-foreground/70 transition-[border-color,box-shadow] duration-150',
          'hover:border-border-strong focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
        ].join(' '),
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
