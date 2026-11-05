'use client'

import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

/** Shown if a page fails to load its content (for example, the database is unreachable). */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container flex flex-1 flex-col justify-center py-28">
      <h1 className="text-h1 max-w-2xl">This page did not load.</h1>
      <p className="text-lead mt-5 max-w-xl">
        It is a problem on our side. Try again, or go back to the homepage.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} size="lg">
          Try again
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
