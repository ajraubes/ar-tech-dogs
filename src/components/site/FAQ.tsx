import React from 'react'

/** Native <details> disclosure: keyboard and screen-reader support for free. */
export const FAQ: React.FC<{ items: { question: string; answer: string }[] }> = ({ items }) => {
  if (!items.length) return null
  return (
    <div className="divide-y divide-border">
      {items.map((item) => (
        <details className="faq group" key={item.question} name="faq">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-xl font-semibold tracking-[-0.01em] transition-colors duration-150 hover:text-muted-foreground [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden
              className="relative size-5 shrink-0 text-foreground transition-transform duration-300 ease-[var(--ease-spring)] group-open:rotate-45"
            >
              <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-current" />
              <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current" />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 text-lg leading-relaxed text-muted-foreground">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
