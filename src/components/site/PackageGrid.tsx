import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { formatPrice, values } from '@/lib/data'
import type { Package } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Reveal } from './Reveal'

const billingLabel: Record<Package['billing'], string> = {
  'once-off': 'Once-off',
  monthly: 'per month',
  custom: '',
}

const Price = ({ pkg }: { pkg: Package }) => {
  if (pkg.price == null || pkg.billing === 'custom') {
    return <p className="text-h2 tabular">Custom</p>
  }
  return (
    <div>
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-h2 tabular">
          {formatPrice(pkg.price)}
          {pkg.orMore && <span className="text-brand-text">+</span>}
        </span>
        <span className="text-sm text-muted-foreground">{billingLabel[pkg.billing]}</span>
      </p>
    </div>
  )
}

export const PackageGrid: React.FC<{
  packages: Package[]
  serviceTitle?: string
  note?: string | null
}> = ({ packages, serviceTitle, note }) => {
  if (!packages.length) return null
  return (
    <div>
      <ul
        className={cn(
          'grid gap-4 md:gap-6',
          packages.length >= 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3',
        )}
      >
        {packages.map((pkg, i) => (
          <Reveal
            as="li"
            className={cn(
              'relative flex flex-col rounded-[var(--radius-xl)] p-7 md:p-9',
              !pkg.featured && 'bg-card',
            )}
            dark={pkg.featured ?? false}
            delay={i * 60}
            key={pkg.id}
          >
            <div className="flex min-h-6 items-center justify-between gap-3">
              {pkg.tier && <p className="eyebrow">{pkg.tier}</p>}
              {pkg.featured && (
                <span className="text-sm font-semibold text-brand-text">Most chosen</span>
              )}
            </div>
            <h3 className="text-h3 mt-4">{pkg.name}</h3>
            <p className="mt-2 min-h-12 leading-relaxed text-muted-foreground">{pkg.description}</p>
            <div className="mt-8">
              <Price pkg={pkg} />
            </div>
            <div className="mt-6 flex-1">
              {pkg.includesPrevious && (
                <p className="mb-3 text-[0.9375rem] font-semibold">{pkg.includesPrevious}</p>
              )}
              <ul className="space-y-3">
                {values(pkg.features).map((f) => (
                  <li className="flex gap-3" key={f}>
                    <svg
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-brand-text"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="m3.5 8.5 3 3 6-7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                      />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild className="mt-8 w-full" variant={pkg.featured ? 'default' : 'outline'}>
              <Link
                href={`/contact?service=${encodeURIComponent(serviceTitle ?? '')}&package=${encodeURIComponent(pkg.name)}`}
              >
                {pkg.billing === 'custom' ? 'Request a quote' : 'Enquire'}
                <span className="sr-only"> about {pkg.name}</span>
              </Link>
            </Button>
          </Reveal>
        ))}
      </ul>
      {note && (
        <p className="mt-10 max-w-3xl text-[0.9375rem] leading-relaxed text-muted-foreground">
          {note}
        </p>
      )}
    </div>
  )
}
