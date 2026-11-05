'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Tilts its child a few degrees toward the pointer and lets the pug inside drift a little
 * further than his tile, so the hero reads as layered rather than flat. The values ease
 * toward the pointer every frame (a light spring), so it never snaps. Only with a real
 * mouse, and never under prefers-reduced-motion.
 */
export const HeroTilt: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || calm.matches) return

    const target = { x: 0, y: 0 }
    const now = { x: 0, y: 0 }
    let frame = 0

    const tick = () => {
      now.x += (target.x - now.x) * 0.08
      now.y += (target.y - now.y) * 0.08
      el.style.setProperty('--rx', `${(now.x * 6).toFixed(3)}deg`)
      el.style.setProperty('--ry', `${(-now.y * 5).toFixed(3)}deg`)
      el.style.setProperty('--px', `${(now.x * 14).toFixed(2)}px`)
      el.style.setProperty('--py', `${(now.y * 10).toFixed(2)}px`)
      const settled = Math.abs(target.x - now.x) < 0.001 && Math.abs(target.y - now.y) < 0.001
      frame = settled ? 0 : requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    // Track the pointer across the whole hero, not just the tile, so it responds early.
    const area = el.closest('section') ?? el
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 1.2)))
      target.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.2)))
      kick()
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
      kick()
    }
    area.addEventListener('pointermove', onMove as EventListener, { passive: true })
    area.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      area.removeEventListener('pointermove', onMove as EventListener)
      area.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className={className ? `tilt ${className}` : 'tilt'} ref={ref}>
      {children}
    </div>
  )
}
