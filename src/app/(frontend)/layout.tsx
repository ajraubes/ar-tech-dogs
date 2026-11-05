import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
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

// Barlow, the face of the logo's wordmark. Self-hosted so builds never depend on Google Fonts.
const barlow = localFont({
  src: [
    { path: '../../fonts/Barlow-400.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/Barlow-500.woff2', weight: '500', style: 'normal' },
    { path: '../../fonts/Barlow-600.woff2', weight: '600', style: 'normal' },
    { path: '../../fonts/Barlow-700.woff2', weight: '700', style: 'normal' },
    { path: '../../fonts/Barlow-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-barlow',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

// Render on request (cached via unstable_cache), so builds never connect to the database.
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getSiteSettings()
  const url = getServerSideURL()

  return (
    <html
      className={cn(barlow.variable, GeistMono.variable)}
      data-theme="light"
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
        <link href="/site.webmanifest" rel="manifest" />
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
            logo: `${url}/brand/logo.png`,
            slogan: 'Design. Develop. Deliver, one sip at a time.',
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
  themeColor: '#f2eee3',
  colorScheme: 'light',
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
