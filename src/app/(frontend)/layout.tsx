import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { JsonLd } from '@/components/site/JsonLd'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { getSiteSettings } from '@/lib/data'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getSiteSettings()
  const url = getServerSideURL()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      data-theme="dark"
      lang="en-ZA"
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide scroll-reveal content only when JS can reveal it again. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header />
          <main className="flex flex-1 flex-col" id="main">
            {children}
          </main>
          <Footer />
        </Providers>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: settings?.siteName || 'AR Tech Dogs',
            description: settings?.defaultDescription || undefined,
            url,
            logo: `${url}/favicon.svg`,
            email: settings?.contact?.email || undefined,
            telephone: settings?.contact?.phone || undefined,
            areaServed: ['ZA', 'Worldwide'],
            address: { '@type': 'PostalAddress', addressCountry: 'ZA' },
            sameAs: (settings?.social ?? []).map((s) => s.url),
          }}
        />
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  themeColor: '#0e0e11',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteName = settings?.siteName || 'AR Tech Dogs'
  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: `${siteName} · ${settings?.tagline || 'Digital experiences. Engineered to grow.'}`,
      template: `%s · ${siteName}`,
    },
    description: settings?.defaultDescription || undefined,
    openGraph: mergeOpenGraph({ siteName }),
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: './' },
  }
}
