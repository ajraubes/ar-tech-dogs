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
            {
              name: 'tagline',
              type: 'text',
              admin: {
                description:
                  'Home page title in Google and in shared links, after the site name. Say what you do and where, in under 45 characters, e.g. "Web & Shopify Development, Cape Town".',
              },
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              admin: {
                description:
                  'Home page description in Google and in shared links. Aim for 120 to 155 characters so it is not cut off.',
              },
            },
            {
              name: 'ogImage',
              label: 'Default social image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Optional. Shown when the home page is shared (1200 × 630). If empty, a branded card is generated. Other pages always get their own card with their headline.',
              },
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
                      'Where new project enquiries are emailed. Falls back to the contact email above. Sending needs the SMTP_* variables set on the server.',
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
