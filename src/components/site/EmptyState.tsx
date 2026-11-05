import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export const EmptyState: React.FC<{
  title: string
  body: string
  action?: { label: string; href: string }
}> = ({ title, body, action }) => (
  <div className="rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center md:py-24">
    <h2 className="text-h3">{title}</h2>
    <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
      {body}
    </p>
    {action && (
      <Button asChild className="mt-8" variant="outline">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    )}
  </div>
)
