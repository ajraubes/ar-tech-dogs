'use client'

import React, { useEffect, useRef } from 'react'

type RevealTag = 'div' | 'li' | 'section' | 'article' | 'ul' | 'ol'

/**
 * Lifts content into view once, as it enters the viewport.
 * The hidden state lives in CSS (html.js [data-reveal]), so visitors without JS see everything.
 * With `stagger`, direct children arrive one after another (heading, then text, then the rest).
 */
export const Reveal: React.FC<{
  as?: RevealTag
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: boolean
  id?: string
  /** Switch this block to the espresso tokens (for a featured card on a light page). */
  dark?: boolean
}> = ({ as: Tag = 'div', children, className, delay = 0, stagger, id, dark }) => {
  const ref = useRef<HTMLElement | null>(null)

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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return React.createElement(
    Tag,
    {
      className,
      'data-reveal': stagger ? 'stagger' : '',
      'data-theme': dark ? 'dark' : undefined,
      id,
      ref: (node: HTMLElement | null) => {
        ref.current = node
      },
      style: delay ? ({ '--delay': `${delay}ms` } as React.CSSProperties) : undefined,
    },
    children,
  )
}
