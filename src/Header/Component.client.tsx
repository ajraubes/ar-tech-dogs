'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useId, useRef, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export type NavLink = { label: string; href: string }

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

export const HeaderClient: React.FC<{ links: NavLink[]; cta: NavLink }> = ({ links, cta }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [tucked, setTucked] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    // Tuck the bar away while reading down; bring it back on any upward scroll.
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (Math.abs(y - last) > 6) {
        setTucked(y > last && y > 240)
        last = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    // Focus stays on the toggle (disclosure pattern); Tab moves straight into the panel.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.matchMedia('(min-width: 64rem)').matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 bg-background transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)]',
          scrolled && !open ? 'shadow-[0_1px_0_var(--border)]' : 'shadow-none',
          tucked && !open && 'header-hide',
        )}
      >
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          href="#main"
        >
          Skip to content
        </a>
        <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            aria-label="AR Tech Dogs home"
            className="-m-2 flex min-h-11 items-center rounded-lg p-2"
            href="/"
          >
            <Logo priority tagline />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative inline-flex h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.97]',
                        active
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:bg-card hover:text-foreground',
                      )}
                      href={link.href}
                    >
                      {link.label}
                      {active && (
                        <span
                          aria-hidden
                          className="absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
            <button
              aria-controls={menuId}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative -mr-2 inline-flex size-11 items-center justify-center rounded-full text-foreground transition-[background-color,transform] duration-150 hover:bg-card active:scale-95 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              ref={toggleRef}
              type="button"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-[2px] w-5 rounded bg-current transition-transform duration-300 ease-[var(--ease-out-expo)]',
                    open && 'translate-y-[5px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-[2px] w-5 rounded bg-current transition-transform duration-300 ease-[var(--ease-out-expo)]',
                    open && '-translate-y-[5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: full-height sheet, primary action pinned to the thumb zone.
          Rendered outside <header>: its backdrop-filter would otherwise become the
          containing block for this fixed panel and collapse it to the header's height. */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col bg-background md:top-20 lg:hidden',
          'transition-[opacity,transform,visibility] ease-[var(--ease-out-expo)]',
          open
            ? 'visible opacity-100 duration-300'
            : 'invisible -translate-y-2 opacity-0 duration-200',
        )}
        id={menuId}
        inert={!open}
      >
        <nav
          aria-label="Mobile"
          className="container flex-1 overflow-y-auto overscroll-contain pt-4"
        >
          <ul>
            {[{ label: 'Home', href: '/' }, ...links].map((link, i) => {
              const active = isActive(pathname, link.href)
              return (
                <li
                  className={cn(
                    'transition-[opacity,transform] duration-400 ease-[var(--ease-out-expo)]',
                    open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  )}
                  key={link.href}
                  style={{ transitionDelay: open ? `${60 + i * 30}ms` : '0ms' }}
                >
                  <Link
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-14 items-center justify-between text-[2rem] font-bold leading-none tracking-[-0.02em] transition-colors duration-150 active:text-muted-foreground',
                      active ? 'text-foreground' : 'text-foreground/75',
                    )}
                    href={link.href}
                  >
                    {link.label}
                    {active && <span aria-hidden className="size-2.5 rounded-full bg-brand" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="container py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button asChild className="w-full" size="lg">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
