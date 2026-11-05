'use server'

import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

export type EnquiryField =
  | 'name'
  | 'email'
  | 'company'
  | 'phone'
  | 'service'
  | 'budget'
  | 'timeframe'
  | 'website'
  | 'description'

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<EnquiryField, string>>
  values?: Partial<Record<EnquiryField, string>>
}

const MIN_FILL_MS = 3000
const str = (fd: FormData, key: string, max = 500) =>
  String(fd.get(key) ?? '')
    .trim()
    .slice(0, max)

export async function submitEnquiry(_prev: EnquiryState, fd: FormData): Promise<EnquiryState> {
  const values = {
    name: str(fd, 'name', 120),
    email: str(fd, 'email', 200),
    company: str(fd, 'company', 160),
    phone: str(fd, 'phone', 40),
    service: str(fd, 'service', 120),
    budget: str(fd, 'budget', 60),
    timeframe: str(fd, 'timeframe', 60),
    website: str(fd, 'website', 300),
    description: str(fd, 'description', 5000),
  }

  // Spam signals: a hidden field humans never fill, and a form submitted too fast.
  const honeypot = str(fd, 'fax_number')
  const startedAt = Number(fd.get('started_at') ?? 0)
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    // Pretend success so bots get no signal to adapt to.
    return { status: 'success' }
  }

  const errors: EnquiryState['errors'] = {}
  if (values.name.length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
    errors.email = 'Please enter a valid email address.'
  if (values.phone && !/^[+()\d\s-]{7,}$/.test(values.phone))
    errors.phone = 'Please enter a valid phone number.'
  if (values.website && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(values.website))
    errors.website = 'Please enter a valid web address, e.g. example.co.za.'
  if (values.description.length < 20)
    errors.description = 'Tell us a little more about the project (at least 20 characters).'

  if (Object.keys(errors).length) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors,
      values,
    }
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const h = await headers()
    await payload.create({
      collection: 'enquiries',
      overrideAccess: true,
      data: { ...values, status: 'new', source: h.get('referer')?.slice(0, 300) || 'contact' },
    })
    return { status: 'success' }
  } catch (err) {
    console.error('Enquiry submission failed', err)
    return {
      status: 'error',
      message:
        'Something went wrong on our side and your enquiry was not sent. Please try again in a moment.',
      values,
    }
  }
}
