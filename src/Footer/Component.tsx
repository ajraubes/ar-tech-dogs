import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'
import { footerNavigation, navigation } from '@/content/seedData'
import { getServices, getSiteSettings } from '@/lib/data'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { linkHref } from '@/utilities/linkHref'

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:min-h-8"
      href={href}
    >
      {children}
    </Link>
  </li>
)

export async function Footer() {
  const [footer, services, settings] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getServices(),
    getSiteSettings(),
  ])

  const extra = (footer?.navItems ?? [])
    .map(({ link }) => ({ label: link.label, href: linkHref(link) }))
    .filter((l): l is { label: string; href: string } => Boolean(l.href && l.label))
  const moreLinks = extra.length
    ? extra
    : footerNavigation.map((n) => ({ label: n.label, href: n.url }))
  const contact = settings?.contact
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link
            aria-label="AR Tech Dogs home"
            className="inline-flex min-h-11 items-center"
            href="/"
          >
            <Logo tagline />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {settings?.tagline || 'Digital experiences. Engineered to grow.'}
          </p>
          <ul className="mt-6 space-y-1 text-sm">
            {contact?.email && (
              <li>
                <a
                  className="inline-flex min-h-10 items-center hover:text-brand-text"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </li>
            )}
            {contact?.phone && (
              <li>
                <a
                  className="inline-flex min-h-10 items-center hover:text-brand-text"
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                >
                  {contact.phone}
                </a>
              </li>
            )}
            {contact?.location && <li className="text-muted-foreground">{contact.location}</li>}
          </ul>
        </div>

        <nav aria-label="Solutions" className="md:col-span-3">
          <h2 className="eyebrow mb-3">Solutions</h2>
          <ul>
            {services.map((s) => (
              <FooterLink href={`/solutions/${s.slug}`} key={s.id}>
                {s.title}
              </FooterLink>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <h2 className="eyebrow mb-3">Company</h2>
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

        <nav aria-label="More" className="md:col-span-2">
          <h2 className="eyebrow mb-3">More</h2>
          <ul>
            {moreLinks.map((n) => (
              <FooterLink href={n.href} key={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} AR Tech Dogs. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.2em]">Build · Innovate · Scale</p>
        </div>
      </div>
    </footer>
  )
}
