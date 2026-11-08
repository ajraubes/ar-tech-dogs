import Link from 'next/link'
import React from 'react'

import { CollieTile } from '@/components/site/Coffee'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container grid flex-1 items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <h1 className="text-h1 fade-up max-w-[16ch]">This page could not be found.</h1>
        <p
          className="text-lead fade-up mt-5 max-w-xl"
          style={{ '--delay': '80ms' } as React.CSSProperties}
        >
          The link may be out of date, or the page has moved. These are good places to start:
        </p>
        <div
          className="fade-up mt-10 flex flex-col gap-3 sm:flex-row"
          style={{ '--delay': '160ms' } as React.CSSProperties}
        >
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
      <div className="mx-auto w-full max-w-xs lg:col-span-4 lg:col-start-9">
        <CollieTile className="aspect-[4/4.4]" sizes="320px" />
      </div>
    </div>
  )
}
