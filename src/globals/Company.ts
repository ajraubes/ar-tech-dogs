import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidateSite'

const titled = (name: string, label: string, extra: { name: string; type: 'text' }[] = []) => ({
  name,
  label,
  type: 'array' as const,
  admin: { initCollapsed: true },
  fields: [
    { name: 'title', type: 'text' as const, required: true },
    { name: 'description', type: 'textarea' as const, required: true },
    ...extra,
  ],
})

export const Company: GlobalConfig = {
  slug: 'company',
  label: 'Company',
  admin: { group: 'Settings', description: 'About page, values, process and team model.' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal('global_company')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'About',
          fields: [
            { name: 'intro', type: 'textarea' },
            {
              name: 'story',
              type: 'textarea',
              admin: { description: 'Blank lines start new paragraphs.' },
            },
            { name: 'mission', type: 'textarea' },
            { name: 'vision', type: 'textarea' },
            { name: 'philosophy', type: 'textarea' },
          ],
        },
        {
          label: 'Values & approach',
          fields: [
            titled('values', 'Core values'),
            titled('differentiators', 'Why AR Tech Dogs'),
            titled('process', 'Delivery process', [{ name: 'deliverable', type: 'text' }]),
          ],
        },
        {
          label: 'Team model',
          fields: [
            {
              name: 'teamModel',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'How projects are staffed. Roles, not invented people.',
              },
              fields: [
                { name: 'role', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
