import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import type { Service } from '@/payload-types'
import { serviceArt } from './art'

/** Whole tile is the link: one tab stop, one large target. Separated by tone, not by lines. */
export const ServiceCard: React.FC<{ service: Service; headingLevel?: 'h2' | 'h3' }> = ({
  service,
  headingLevel: H = 'h3',
}) => {
  const pic = serviceArt(service.slug)
  return (
    <Link
      className="group relative flex h-full min-h-64 flex-col rounded-[var(--radius-xl)] bg-card p-7 transition-[background-color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-secondary active:scale-[0.99] md:p-9"
      href={`/solutions/${service.slug}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {service.core && (
        <p className="absolute right-7 top-7 rounded-full bg-background px-3 py-1 text-sm font-semibold text-brand-text md:right-9 md:top-9">
          Core service
        </p>
      )}
      <img
        alt=""
        className="h-auto w-40 mix-blend-multiply transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
        decoding="async"
        height={pic.height}
        loading="lazy"
        src={pic.src}
        width={pic.width}
      />
      <H className="text-h3 mt-auto pt-8">{service.title}</H>
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
}
