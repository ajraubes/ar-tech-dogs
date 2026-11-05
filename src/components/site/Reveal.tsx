'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Fades and lifts children into view once, when they enter the viewport.
 * Hidden state lives in CSS (html.js [data-reveal]) so no-JS visitors see everything.
 */
export const Reveal: React.FC<{
  as?: 'div' | 'li' | 'section' | 'article'
  children: React.ReactNode
  className?: string
  delay?: number
}> = ({ as: Tag = 'div', children, className, delay = 0 }) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset.visible = 'true'
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      className={className}
      data-reveal=""
      // @ts-expect-error -- ref type is shared across the allowed tags
      ref={ref}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
