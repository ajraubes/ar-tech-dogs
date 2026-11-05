import React from 'react'

import type { Company } from '@/payload-types'
import { Reveal } from './Reveal'

export const ProcessSteps: React.FC<{ steps: NonNullable<Company['process']> }> = ({ steps }) => {
  if (!steps.length) return null
  return (
    <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
      {steps.map((step, i) => (
        <Reveal
          as="li"
          className="relative border-t border-border pt-6"
          delay={(i % 3) * 80}
          key={step.title}
        >
          <span aria-hidden className="absolute -top-px left-0 h-px w-12 bg-primary" />
          <p className="font-mono text-xs text-muted-foreground tabular">
            Step {String(i + 1).padStart(2, '0')}
          </p>
          <h3 className="text-h3 mt-3">{step.title}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {step.description}
          </p>
          {step.deliverable && (
            <p className="mt-4 text-sm">
              <span className="text-muted-foreground">Deliverable: </span>
              {step.deliverable}
            </p>
          )}
        </Reveal>
      ))}
    </ol>
  )
}
