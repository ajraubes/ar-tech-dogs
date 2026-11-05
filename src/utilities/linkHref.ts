import type { Header } from '@/payload-types'

type LinkField = NonNullable<Header['navItems']>[number]['link']

/** Resolve a Payload link field (internal reference or custom URL) to an href. */
export const linkHref = (link?: LinkField | null): string | null => {
  if (!link) return null
  if (link.type === 'reference' && link.reference && typeof link.reference.value === 'object') {
    const { relationTo, value } = link.reference
    if (!value?.slug) return null
    if (relationTo === 'pages') return value.slug === 'home' ? '/' : `/${value.slug}`
    return `/${relationTo}/${value.slug}`
  }
  return link.url || null
}
