import type { CollectionConfig } from 'payload'

import { orderField, publicContent, slugField, textList } from './shared'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  ...publicContent('services'),
  defaultSort: 'order',
  admin: {
    group: 'Agency',
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'core', 'order'],
    description: 'Each service gets its own page under /solutions.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'number', type: 'text', required: true, admin: { width: '20%' } },
        { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'shortTitle',
          type: 'text',
          admin: { width: '30%', description: 'Used in menus.' },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One sentence shown on cards.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page',
          fields: [
            { name: 'heroHeading', type: 'text', required: true },
            { name: 'overview', type: 'textarea', required: true },
            textList('audience', 'Who it is for'),
            {
              name: 'problems',
              label: 'Problems solved',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            textList('features', 'Key features'),
            textList('deliverables', 'Deliverables'),
            textList('technologies', 'Technologies'),
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqs',
              label: 'FAQs',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'core',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Marks a core service on cards.' },
    },
    orderField,
    slugField({ useAsSlug: 'title' }),
  ],
}
