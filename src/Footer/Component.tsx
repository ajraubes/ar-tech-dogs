import Link from 'next/link'
import React from 'react'

import { Logo, TAGLINE } from '@/components/Logo/Logo'
import { footerNavigation, navigation } from '@/content/seedData'
import { getServices, getSiteSettings } from '@/lib/data'
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
    <footer className="mt-auto" data-theme="dark">
      <div className="container grid gap-14 pb-16 pt-20 md:grid-cols-12 md:pb-24 md:pt-24">
        <div className="md:col-span-5">
          <Link aria-label="AR Tech Dogs home" className="-m-2 inline-flex rounded-lg p-2" href="/">
            <Logo />
          </Link>
          <p className="mt-3 max-w-xs text-muted-foreground">{TAGLINE}</p>
          <h2 className="mt-10 text-[0.9375rem] font-semibold">Say hello</h2>
          <ul className="mt-4 space-y-1">
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

        <nav aria-label="Solutions" className="md:col-span-3 md:col-start-6">
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
      </div>

      <div className="container">
        <div className="flex flex-col gap-x-8 gap-y-1 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} AR Tech Dogs. All rights reserved.</p>
          <p>Made in Cape Town, one sip at a time.</p>
        </div>
      </div>
    </footer>
  )
}
