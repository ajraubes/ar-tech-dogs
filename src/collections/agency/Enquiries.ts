import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

const notify: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  try {
    const settings = await req.payload.findGlobal({ slug: 'site-settings', depth: 0, req })
    const to = settings?.contact?.notificationEmail
    if (!to) return doc
    const lines = [
      ['Name', doc.name],
      ['Email', doc.email],
      ['Company', doc.company],
      ['Phone', doc.phone],
      ['Service', doc.service],
      ['Budget', doc.budget],
      ['Timeframe', doc.timeframe],
      ['Website', doc.website],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    await req.payload.sendEmail({
      to,
      replyTo: doc.email,
      subject: `New project enquiry: ${doc.name}${doc.company ? ` (${doc.company})` : ''}`,
      text: `${lines}\n\n${doc.description}`,
    })
  } catch (err) {
    // An email failure must never lose the enquiry; it is already stored.
    req.payload.logger.error({ err, msg: 'Could not send enquiry notification' })
  }
  return doc
}

export const Enquiries: CollectionConfig<'enquiries'> = {
  slug: 'enquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  // Public submissions go through the contact page's server action, which validates
  // input and checks spam signals before writing with overrideAccess.
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-createdAt',
  admin: {
    group: 'Leads',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'service', 'budget', 'status', 'createdAt'],
  },
  hooks: { afterChange: [notify] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text', admin: { width: '50%' } },
        { name: 'phone', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'service', type: 'text', admin: { width: '33%' } },
        { name: 'budget', type: 'text', admin: { width: '33%' } },
        { name: 'timeframe', type: 'text', admin: { width: '33%' } },
      ],
    },
    { name: 'website', label: 'Existing website', type: 'text' },
    { name: 'description', label: 'Project description', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Won', value: 'won' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Internal only.' },
    },
    { name: 'source', type: 'text', admin: { position: 'sidebar', readOnly: true } },
  ],
}
