import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidateSite'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal('global_site-settings')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & SEO',
          fields: [
            { name: 'siteName', type: 'text', required: true, defaultValue: 'AR Tech Dogs' },
            { name: 'tagline', type: 'text' },
            {
              name: 'defaultDescription',
              type: 'textarea',
              admin: { description: 'Default meta description for pages without their own.' },
            },
            {
              name: 'ogImage',
              label: 'Default social image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional. A branded image is generated if empty.' },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                { name: 'email', type: 'email' },
                { name: 'phone', type: 'text' },
                {
                  name: 'whatsapp',
                  type: 'text',
                  admin: { description: 'International format without +, e.g. 27821234567.' },
                },
                { name: 'location', type: 'text' },
                {
                  name: 'bookingUrl',
                  type: 'text',
                  admin: {
                    description:
                      'Calendly, Cal.com or similar. The "Book a consultation" button only shows when set.',
                  },
                },
                {
                  name: 'notificationEmail',
                  type: 'email',
                  admin: {
                    description:
                      'Where new project enquiries are emailed. Needs an email adapter configured in payload.config.ts.',
                  },
                },
              ],
            },
            {
              name: 'social',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              name: 'pricingNote',
              type: 'textarea',
              admin: { description: 'Shown under every pricing table.' },
            },
          ],
        },
      ],
    },
  ],
}
