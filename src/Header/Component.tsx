import React from 'react'

import { navigation } from '@/content/seedData'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { linkHref } from '@/utilities/linkHref'
import { HeaderClient, type NavLink } from './Component.client'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  const fromCms: NavLink[] = (header?.navItems ?? [])
    .map(({ link }) => ({ label: link.label, href: linkHref(link) }))
    .filter((l): l is NavLink => Boolean(l.href && l.label))

  // Before the CMS is seeded, fall back to the planned navigation so the site is usable.
  const links = fromCms.length ? fromCms : navigation.map((n) => ({ label: n.label, href: n.url }))

  const cta = {
    label: header?.cta?.label || 'Start a Project',
    href: header?.cta?.url || '/contact',
  }

  return <HeaderClient cta={cta} links={links} />
}
