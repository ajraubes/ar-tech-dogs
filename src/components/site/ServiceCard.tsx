import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import type { Service } from '@/payload-types'

/** Whole tile is the link: one tab stop, one large target. Separated by tone, not by lines. */
export const ServiceCard: React.FC<{ service: Service; headingLevel?: 'h2' | 'h3' }> = ({
  service,
  headingLevel: H = 'h3',
}) => (
  <Link
    className="group relative flex h-full min-h-64 flex-col rounded-[var(--radius-xl)] bg-card p-7 transition-[background-color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-secondary active:scale-[0.99] md:p-9"
    href={`/solutions/${service.slug}`}
  >
    {service.core && <p className="text-sm font-semibold text-brand-text">Core service</p>}
    <H className="text-h3 mt-auto pt-10">{service.title}</H>
    <p className="mt-3 leading-relaxed text-muted-foreground">{service.summary}</p>
    <span className="mt-8 inline-flex items-center gap-2 font-semibold">
      Explore
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
      >
        <ArrowRight className="size-[1.05em]" strokeWidth={2.25} />
      </span>
    </span>
  </Link>
)
