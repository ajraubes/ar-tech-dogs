import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidateSite'

const cta = (name: string, label: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [
    {
      type: 'row' as const,
      fields: [
        { name: 'label', type: 'text' as const, admin: { width: '50%' } },
        { name: 'url', type: 'text' as const, admin: { width: '50%' } },
      ],
    },
  ],
})

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: { group: 'Settings' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal('global_homepage')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroEyebrow', type: 'text' },
            { name: 'heroHeading', type: 'text', required: true },
            { name: 'heroSubheading', type: 'textarea' },
            cta('primaryCta', 'Primary button'),
            cta('secondaryCta', 'Secondary button'),
          ],
        },
        {
          label: 'Sections',
          fields: [
            {
              name: 'positioning',
              type: 'textarea',
              admin: { description: 'Statement under the hero.' },
            },
            { name: 'finalCtaHeading', type: 'text' },
            { name: 'finalCtaBody', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
