import React from 'react'

/** Native <details> disclosure: keyboard and screen-reader support for free. */
export const FAQ: React.FC<{ items: { question: string; answer: string }[] }> = ({ items }) => {
  if (!items.length) return null
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details className="faq group" key={item.question} name="faq">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-medium tracking-tight [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden
              className="relative size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:text-brand-text"
            >
              <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />
              <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
