'use client'

import React, { useActionState, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utilities/ui'
import { type EnquiryField, type EnquiryState, submitEnquiry } from './actions'

type Options = { services: string[]; budgets: string[]; timeframes: string[] }

const Field: React.FC<{
  name: EnquiryField
  label: string
  optional?: boolean
  error?: string
  hint?: string
  className?: string
  children: (props: {
    id: string
    name: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
  }) => React.ReactNode
}> = ({ name, label, optional, error, hint, className, children }) => {
  const id = `enquiry-${name}`
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children({
        id,
        name,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy || undefined,
      })}
      {hint && !error && (
        <p className="text-xs text-muted-foreground" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="fade-up text-sm text-destructive-foreground" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const Chevron = () => (
  <svg
    aria-hidden
    className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      d="m4 6 4 4 4-4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
)

const selectClass = cn(
  'h-12 w-full appearance-none rounded-lg border border-input bg-foreground/[0.03] px-4 pr-11 text-base text-foreground',
  'transition-[border-color,box-shadow] duration-150 hover:border-border-strong focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
  'aria-invalid:border-destructive',
)

export const EnquiryForm: React.FC<{
  options: Options
  defaultService?: string
  defaultMessage?: string
}> = ({ options, defaultService, defaultMessage }) => {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, {
    status: 'idle',
  })
  const [startedAt, setStartedAt] = useState(0)
  const statusRef = useRef<HTMLDivElement>(null)
  const e = state.errors ?? {}
  const v = state.values ?? {}

  useEffect(() => setStartedAt(Date.now()), [])

  // Move focus to the result so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (state.status !== 'idle') statusRef.current?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <div
        className="fade-up rounded-2xl border border-border bg-card p-8 outline-none md:p-12"
        ref={statusRef}
        role="status"
        tabIndex={-1}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-brand-text">
          <svg aria-hidden className="size-6" fill="none" viewBox="0 0 24 24">
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
        <h2 className="text-h3 mt-6">Thanks, your enquiry is in.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
          We read every enquiry personally and will reply by email with next steps.
        </p>
      </div>
    )
  }

  const service =
    v.service ?? (defaultService && options.services.includes(defaultService) ? defaultService : '')

  return (
    <form action={action} className="grid gap-6 sm:grid-cols-2">
      {state.status === 'error' && state.message && (
        <div
          className="fade-up rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm outline-none sm:col-span-2"
          ref={statusRef}
          role="alert"
          tabIndex={-1}
        >
          {state.message}
        </div>
      )}

      <Field error={e.name} label="Name" name="name">
        {(p) => <Input autoComplete="name" defaultValue={v.name} required {...p} />}
      </Field>
      <Field error={e.email} label="Email" name="email">
        {(p) => (
          <Input
            autoComplete="email"
            defaultValue={v.email}
            inputMode="email"
            required
            type="email"
            {...p}
          />
        )}
      </Field>
      <Field error={e.company} label="Company" name="company" optional>
        {(p) => <Input autoComplete="organization" defaultValue={v.company} {...p} />}
      </Field>
      <Field error={e.phone} label="Phone" name="phone" optional>
        {(p) => (
          <Input autoComplete="tel" defaultValue={v.phone} inputMode="tel" type="tel" {...p} />
        )}
      </Field>
      <Field error={e.service} label="Service required" name="service">
        {(p) => (
          <div className="relative">
            <select className={selectClass} defaultValue={service} {...p}>
              <option value="">Choose a service</option>
              {options.services.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <Chevron />
          </div>
        )}
      </Field>
      <Field error={e.budget} label="Project budget" name="budget">
        {(p) => (
          <div className="relative">
            <select className={selectClass} defaultValue={v.budget ?? ''} {...p}>
              <option value="">Choose a range</option>
              {options.budgets.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <Chevron />
          </div>
        )}
      </Field>
      <Field error={e.timeframe} label="Preferred timeframe" name="timeframe">
        {(p) => (
          <div className="relative">
            <select className={selectClass} defaultValue={v.timeframe ?? ''} {...p}>
              <option value="">Choose a timeframe</option>
              {options.timeframes.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <Chevron />
          </div>
        )}
      </Field>
      <Field error={e.website} label="Existing website" name="website" optional>
        {(p) => (
          <Input
            autoComplete="url"
            defaultValue={v.website}
            inputMode="url"
            placeholder="example.co.za"
            {...p}
          />
        )}
      </Field>
      <Field
        className="sm:col-span-2"
        error={e.description}
        hint="Goals, must-have features, integrations and anything we should know."
        label="Project description"
        name="description"
      >
        {(p) => (
          <Textarea
            defaultValue={v.description ?? defaultMessage}
            minLength={20}
            required
            rows={6}
            {...p}
          />
        )}
      </Field>

      {/* Spam protection: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="fax_number">Fax number</label>
        <input autoComplete="off" id="fax_number" name="fax_number" tabIndex={-1} type="text" />
      </div>
      <input name="started_at" type="hidden" value={startedAt || ''} />

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We only use your details to respond to this enquiry.
        </p>
        <Button
          aria-disabled={pending}
          className="w-full sm:w-auto"
          disabled={pending}
          size="lg"
          type="submit"
        >
          {pending ? (
            <>
              <span
                aria-hidden
                className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
              />
              Sending…
            </>
          ) : (
            <>
              Send enquiry <span aria-hidden>→</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
