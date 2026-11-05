import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import localFont from 'next/font/local'
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

// Self-hosted so builds never depend on Google Fonts being reachable.
const lexend = localFont({
  src: '../../fonts/Lexend.woff2',
  variable: '--font-lexend',
  weight: '400 700',
  display: 'swap',
})
const lexendExa = localFont({
  src: '../../fonts/Lexend-Exa.woff2',
  variable: '--font-lexend-exa',
  weight: '600 800',
  display: 'swap',
})

// Render on request (cached via unstable_cache), so builds never connect to the database.
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getSiteSettings()
  const url = getServerSideURL()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, lexend.variable, lexendExa.variable)}
      data-theme="dark"
      lang="en-ZA"
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide scroll-reveal content only when JS can reveal it again. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <link href="/favicon.ico" rel="icon" sizes="16x16 32x32 48x48" />
        <link href="/favicon-64.png" rel="icon" sizes="64x64" type="image/png" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
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
            logo: `${url}/brand/logo-light.png`,
            slogan: 'Build · Innovate · Scale',
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
  themeColor: '#070c14',
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
