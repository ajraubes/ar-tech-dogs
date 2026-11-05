import Link from 'next/link'
import React from 'react'

import { Logo, Pug, TAGLINE } from '@/components/Logo/Logo'
import { Steam } from '@/components/site/Coffee'
import { Reveal } from '@/components/site/Reveal'
import { footerNavigation, navigation } from '@/content/seedData'
import { getPublishedPostCount, getServices, getSiteSettings } from '@/lib/data'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { linkHref } from '@/utilities/linkHref'

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      className="inline-flex min-h-11 items-center text-[0.9375rem] text-muted-foreground transition-colors duration-150 hover:text-foreground md:min-h-9"
      href={href}
    >
      {children}
    </Link>
  </li>
)

export async function Footer() {
  const [footer, services, settings, postCount] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getServices(),
    getSiteSettings(),
    getPublishedPostCount().catch(() => 0),
  ])

  const extra = (footer?.navItems ?? [])
    .map(({ link }) => ({ label: link.label, href: linkHref(link) }))
    .filter((l): l is { label: string; href: string } => Boolean(l.href && l.label))
  // Skip links the Company column already has, and Insights until something is published.
  const inNav = new Set(navigation.map((n) => n.url))
  const moreLinks = (
    extra.length ? extra : footerNavigation.map((n) => ({ label: n.label, href: n.url }))
  ).filter((l) => !inNav.has(l.href) && (postCount > 0 || !l.href.startsWith('/posts')))
  const contact = settings?.contact
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto overflow-hidden"
      data-theme="dark"
      // One tone deeper than the espresso sections above it, so the close reads as its own surface.
      style={{ '--background': '#231c18' } as React.CSSProperties}
    >
      <div className="container grid grid-cols-2 gap-x-8 gap-y-14 pb-16 pt-20 md:grid-cols-12 md:pb-20 md:pt-24">
        <div className="col-span-2 md:col-span-5">
          <Link aria-label="AR Tech Dogs home" className="-m-2 inline-flex rounded-lg p-2" href="/">
            <Logo />
          </Link>
          <p className="mt-3 max-w-xs text-muted-foreground">{TAGLINE}</p>
          <h2 className="sr-only">Contact</h2>
          <ul className="mt-8 space-y-1">
            {contact?.email && (
              <li>
                <a
                  className="inline-flex min-h-11 items-center break-all text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold tracking-[-0.02em] text-brand-text underline decoration-transparent underline-offset-[0.18em] transition-[text-decoration-color] duration-200 hover:decoration-current"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </li>
            )}
            {contact?.phone && (
              <li>
                <a
                  className="inline-flex min-h-11 items-center text-xl font-semibold hover:text-brand-text"
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                >
                  {contact.phone}
                </a>
              </li>
            )}
            {contact?.location && (
              <li className="pt-2 text-muted-foreground">{contact.location}</li>
            )}
          </ul>
        </div>

        <nav
          aria-label="Solutions"
          className="col-span-2 sm:col-span-1 md:col-span-3 md:col-start-6"
        >
          <h2 className="mb-3 text-[0.9375rem] font-semibold">Solutions</h2>
          <ul>
            {services.map((s) => (
              <FooterLink href={`/solutions/${s.slug}`} key={s.id}>
                {s.title}
              </FooterLink>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <h2 className="mb-3 text-[0.9375rem] font-semibold">Company</h2>
          <ul>
            {navigation
              .filter((n) => n.url !== '/solutions')
              .map((n) => (
                <FooterLink href={n.url} key={n.url}>
                  {n.label}
                </FooterLink>
              ))}
          </ul>
        </nav>

        {moreLinks.length > 0 && (
          <nav aria-label="More" className="md:col-span-2">
            <h2 className="mb-3 text-[0.9375rem] font-semibold">More</h2>
            <ul>
              {moreLinks.map((n) => (
                <FooterLink href={n.href} key={n.href}>
                  {n.label}
                </FooterLink>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* The stacked logo, set at full width: the pug sits on the wordmark, as on the brand board. */}
      <Reveal className="container select-none">
        <div aria-hidden className="relative">
          <div className="land-late absolute bottom-[78%] right-[1.5%] w-[13%] min-w-16">
            <div className="pug-breathe relative">
              <Pug className="h-auto w-full" sizes="(min-width: 1024px) 180px, 16vw" />
              <Steam className="absolute left-[49.5%] top-[48.5%] w-[10%] text-cream/80" />
            </div>
          </div>
          <p className="rise-letters -ml-[0.04em] whitespace-nowrap text-[min(14.2vw,12.75rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.035em] text-crema">
            {'AR Tech Dogs'.split('').map((ch, i) => (
              <span key={i} style={{ '--i': i } as React.CSSProperties}>
                {ch === ' ' ? '\u00a0' : ch}
              </span>
            ))}
          </p>
        </div>
      </Reveal>

      <div className="container">
        <div className="flex flex-col gap-x-8 gap-y-1 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} AR Tech Dogs. All rights reserved.</p>
          <p>Made in Cape Town, one sip at a time.</p>
        </div>
      </div>
    </footer>
  )
}
