import type { CollectionConfig } from 'payload'

import { orderField, publicContent, textList } from './shared'

export const Packages: CollectionConfig<'packages'> = {
  slug: 'packages',
  labels: { singular: 'Package', plural: 'Packages' },
  ...publicContent('packages'),
  defaultSort: 'order',
  admin: {
    group: 'Agency',
    useAsTitle: 'name',
    defaultColumns: ['name', 'service', 'price', 'billing', 'featured'],
    description: 'Service tiers and starting prices. Prices are shown as "Starting from".',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'tier',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Small label, e.g. "Most popular" or "Growing retailers".',
          },
        },
      ],
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          min: 0,
          admin: { width: '33%', description: 'ZAR. Leave empty for "Custom quote".' },
        },
        {
          name: 'orMore',
          label: 'Show "+" after price',
          type: 'checkbox',
          defaultValue: false,
          admin: { width: '33%' },
        },
        {
          name: 'billing',
          type: 'select',
          required: true,
          defaultValue: 'once-off',
          options: [
            { label: 'Once-off', value: 'once-off' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Custom', value: 'custom' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'includesPrevious',
      type: 'text',
      admin: { description: 'Optional lead-in, e.g. "Everything in Launch, plus".' },
    },
    textList('features', 'Included'),
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Highlights this package in its group.' },
    },
    orderField,
  ],
}
