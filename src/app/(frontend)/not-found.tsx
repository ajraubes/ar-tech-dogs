import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex flex-1 flex-col justify-center py-28">
      <h1 className="text-h1 max-w-2xl">This page could not be found.</h1>
      <p className="text-lead mt-5 max-w-xl">
        The link may be out of date, or the page has moved. These are good places to start:
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/solutions">View solutions</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  )
}
