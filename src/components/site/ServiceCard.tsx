import Link from 'next/link'
import React from 'react'

import type { Service } from '@/payload-types'

/** Whole card is the link: one tab stop, one large target. */
export const ServiceCard: React.FC<{ service: Service; headingLevel?: 'h2' | 'h3' }> = ({
  service,
  headingLevel: H = 'h3',
}) => (
  <Link
    className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[border-color,transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-card)] md:p-8"
    href={`/solutions/${service.slug}`}
  >
    <div className="flex items-start justify-between gap-4">
      <span className="font-mono text-sm text-muted-foreground tabular">{service.number}</span>
      {service.core && (
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-primary">
          Core
        </span>
      )}
    </div>
    <H className="text-h3 mt-10">{service.title}</H>
    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
      {service.summary}
    </p>
    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
      Explore
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 text-primary"
      >
        →
      </span>
    </span>
  </Link>
)
