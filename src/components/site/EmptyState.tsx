import Link from 'next/link'
import React from 'react'

import { LogoMark } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'

export const EmptyState: React.FC<{
  title: string
  body: string
  action?: { label: string; href: string }
}> = ({ title, body, action }) => (
  <div className="flex flex-col items-center rounded-[var(--radius-xl)] bg-card px-6 py-16 text-center md:py-24">
    <LogoMark className="h-16" />
    <h2 className="text-h3 mt-6">{title}</h2>
    <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">{body}</p>
    {action && (
      <Button asChild className="mt-8" variant="outline">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    )}
  </div>
)
