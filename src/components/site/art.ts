/**
 * Spot illustrations from the brand asset library: Jinx at work, one scene per service.
 * They are drawn on warm white, so on any other light field use `mix-blend-multiply`.
 */
export type Art = { src: string; width: number; height: number; alt: string }

const ART = {
  website: {
    src: '/brand/art/website.webp',
    width: 442,
    height: 336,
    alt: 'Jinx beside a code editor and a coffee',
  },
  commerce: {
    src: '/brand/art/commerce.webp',
    width: 494,
    height: 340,
    alt: 'Jinx at a laptop showing code and a shopping cart',
  },
  care: {
    src: '/brand/art/care.webp',
    width: 472,
    height: 260,
    alt: 'Jinx resting, paws on the desk, keeping watch',
  },
  growth: {
    src: '/brand/art/growth.webp',
    width: 408,
    height: 306,
    alt: 'Jinx beside a rising bar chart',
  },
  plan: {
    src: '/brand/art/plan.webp',
    width: 530,
    height: 338,
    alt: 'Jinx sketching a page layout on a laptop',
  },
  build: {
    src: '/brand/art/build.webp',
    width: 480,
    height: 356,
    alt: 'Jinx at a code screen with a coffee and plants',
  },
  launch: {
    src: '/brand/art/launch.webp',
    width: 500,
    height: 348,
    alt: 'Jinx in front of an online storefront',
  },
} satisfies Record<string, Art>

const BY_SERVICE: Record<string, keyof typeof ART> = {
  'custom-web-development': 'website',
  'shopify-development': 'commerce',
  'shopify-plus-enterprise': 'launch',
  'business-websites': 'plan',
  'landing-pages': 'growth',
  'support-and-maintenance': 'care',
}

export const art = (name: keyof typeof ART): Art => ART[name]

/** The illustration for a service, by its slug. Unknown services get the build scene. */
export const serviceArt = (slug?: string | null): Art => ART[BY_SERVICE[slug ?? ''] ?? 'build']
