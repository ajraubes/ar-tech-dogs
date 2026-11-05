import { cn } from '@/utilities/ui'
import React from 'react'

import { Steam } from './Coffee'

/**
 * The team, drawn as the studio's pug. Every portrait is the same mascot from the logo,
 * dressed for the person's role, with one small prop that keeps working while you read:
 * code types itself, a chart grows, a curve gets drawn. Accessories are drawn in the
 * logo's flat style (thick espresso outline, crema and roast fills) on the pug's own
 * 1000 x 1110 grid, so they sit on him at every size.
 */

export type PugLook = 'founder' | 'developer' | 'marketing' | 'design'
export type PugTrait = 'glasses' | 'beard' | 'cap' | 'beanie' | 'headphones'

const INK = '#2a2019'
const ROAST = '#4f3e33'
const CREMA = '#e2c275'
const CREAM = '#f2eee3'

/** Pick a look from the role text, so no CMS field is needed. */
export const lookFor = (type: string | null | undefined, role: string): PugLook => {
  const r = role.toLowerCase()
  if (type === 'founder') return 'founder'
  if (/design|ui|ux/.test(r)) return 'design'
  if (/market|brand|growth|seo/.test(r)) return 'marketing'
  return 'developer'
}

const DEFAULT_TRAITS: Record<PugLook, PugTrait[]> = {
  founder: ['headphones'],
  developer: ['beanie'],
  marketing: [],
  design: [],
}

const TILE: Record<PugLook, string> = {
  founder: 'bg-[linear-gradient(180deg,#ecc97e,#ddb565)]',
  developer: 'bg-[linear-gradient(180deg,#d9c3a0,#c7ab82)]',
  marketing: 'bg-[linear-gradient(180deg,#efd2a6,#e2b98a)]',
  design: 'bg-[linear-gradient(180deg,#e6d8b8,#d4c098)]',
}

/* ---------- Accessories, on the pug's 1000 x 1110 grid ---------- */

const Glasses = () => (
  <g className="pug-glasses">
    <g fill="#fff8e8" fillOpacity="0.18" stroke={INK} strokeLinejoin="round" strokeWidth="22">
      <rect height="122" rx="44" transform="rotate(-9 385 318)" width="176" x="297" y="257" />
      <rect height="122" rx="44" transform="rotate(-9 650 284)" width="176" x="562" y="223" />
    </g>
    <path
      d="M472 292 Q518 268 562 282"
      fill="none"
      stroke={INK}
      strokeLinecap="round"
      strokeWidth="20"
    />
    <path
      className="glint"
      d="M330 300 l40 -26"
      stroke="#fff8e8"
      strokeLinecap="round"
      strokeOpacity="0.9"
      strokeWidth="12"
    />
    <path
      className="glint glint-late"
      d="M596 265 l40 -26"
      stroke="#fff8e8"
      strokeLinecap="round"
      strokeOpacity="0.9"
      strokeWidth="12"
    />
  </g>
)

const Beard = () => (
  <path
    d="M388 520 Q420 600 520 612 Q628 606 676 512 Q640 560 600 566 Q556 590 520 586 Q470 590 436 566 Q404 552 388 520 Z"
    fill={ROAST}
    stroke={INK}
    strokeLinejoin="round"
    strokeWidth="16"
  />
)

const Beanie = () => (
  <g stroke={INK} strokeLinejoin="round" strokeWidth="20">
    <path d="M300 168 Q330 20 520 16 Q706 20 744 150 Z" fill={ROAST} />
    <rect
      fill={CREMA}
      height="70"
      rx="30"
      transform="rotate(-4 520 160)"
      width="490"
      x="275"
      y="124"
    />
    <circle cx="522" cy="10" fill={CREMA} r="34" />
  </g>
)

const Cap = () => (
  <g stroke={INK} strokeLinejoin="round" strokeWidth="20">
    <path d="M296 176 Q316 38 516 30 Q712 34 742 160 Z" fill={ROAST} />
    <path d="M300 172 Q520 120 742 158 Q860 176 900 214 Q760 200 300 200 Z" fill={INK} />
    <circle cx="518" cy="36" fill={CREMA} r="16" />
  </g>
)

const Headphones = () => (
  <g>
    <path
      d="M232 250 Q236 22 520 18 Q806 20 820 228"
      fill="none"
      stroke={INK}
      strokeLinecap="round"
      strokeWidth="46"
    />
    <path
      d="M232 250 Q236 22 520 18 Q806 20 820 228"
      fill="none"
      stroke={ROAST}
      strokeLinecap="round"
      strokeWidth="18"
    />
    <g stroke={INK} strokeWidth="20">
      <rect
        fill={INK}
        height="178"
        rx="52"
        transform="rotate(-14 230 300)"
        width="112"
        x="174"
        y="212"
      />
      <rect
        fill={INK}
        height="178"
        rx="52"
        transform="rotate(12 820 280)"
        width="112"
        x="764"
        y="192"
      />
    </g>
    <rect
      fill={CREMA}
      height="120"
      rx="30"
      transform="rotate(-14 230 300)"
      width="40"
      x="226"
      y="240"
    />
    <rect
      fill={CREMA}
      height="120"
      rx="30"
      transform="rotate(12 820 280)"
      width="40"
      x="774"
      y="220"
    />
  </g>
)

const Bow = () => (
  <g className="pug-bow" stroke={INK} strokeLinejoin="round" strokeWidth="18">
    <path d="M700 96 L630 40 Q606 30 604 60 L610 140 Q616 160 640 150 Z" fill="#c9785f" />
    <path d="M700 96 L780 50 Q806 44 806 72 L792 150 Q786 170 762 158 Z" fill="#c9785f" />
    <circle cx="704" cy="100" fill="#a85c45" r="30" />
  </g>
)

const Beret = () => (
  <g stroke={INK} strokeLinejoin="round" strokeWidth="20">
    <path
      d="M286 170 Q258 70 440 36 Q640 4 760 92 Q800 130 744 162 Q520 120 286 170 Z"
      fill="#7a5f4a"
    />
    <path d="M520 30 q6 -34 30 -40" fill="none" strokeLinecap="round" />
  </g>
)

const TRAIT: Record<PugTrait, React.FC> = {
  glasses: Glasses,
  beard: Beard,
  cap: Cap,
  beanie: Beanie,
  headphones: Headphones,
}

/* ---------- Props: the one thing that keeps moving ---------- */

const CodeWindow = () => (
  <div className="prop-float absolute right-[5%] top-[8%] w-[38%] rounded-xl bg-espresso p-2.5 shadow-[var(--shadow-float)] [--float-delay:0ms]">
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span className="size-1.5 rounded-full bg-cream/30" key={i} />
      ))}
    </div>
    <div className="mt-2 space-y-1.5">
      {[78, 54, 66, 40].map((w, i) => (
        <span
          className="type-line block h-1.5 rounded-full bg-crema"
          key={i}
          style={{ width: `${w}%`, '--i': i } as React.CSSProperties}
        />
      ))}
    </div>
  </div>
)

const Terminal = () => (
  <div className="prop-float absolute left-[5%] top-[10%] w-[36%] rounded-xl bg-espresso px-2.5 py-2 font-mono text-[clamp(0.5rem,0.4rem+0.4vw,0.75rem)] leading-tight text-cream shadow-[var(--shadow-float)] [--float-delay:400ms]">
    <span className="text-crema">$</span> deploy
    <span className="caret ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-crema" />
  </div>
)

const Chart = () => (
  <div className="prop-float absolute left-[5%] top-[9%] flex h-[24%] w-[34%] items-end gap-[8%] rounded-xl bg-cream p-2.5 shadow-[var(--shadow-float)] [--float-delay:200ms]">
    {[38, 56, 48, 82].map((h, i) => (
      <span
        className="bar-grow block flex-1 rounded-t-[3px] bg-roast last:bg-[#c9785f]"
        key={i}
        style={{ height: `${h}%`, '--i': i } as React.CSSProperties}
      />
    ))}
  </div>
)

const Palette = () => (
  <div className="prop-float absolute left-[5%] top-[9%] w-[38%] [--float-delay:300ms]">
    <svg className="w-full overflow-visible" fill="none" viewBox="0 0 160 110">
      <rect fill={CREAM} height="110" rx="14" width="160" />
      <path
        className="draw-curve"
        d="M18 88 C 48 10, 92 112, 142 26"
        pathLength={1}
        stroke={ROAST}
        strokeLinecap="round"
        strokeWidth="7"
      />
      <circle
        className="draw-dot"
        cx="18"
        cy="88"
        fill={CREMA}
        r="8"
        stroke={INK}
        strokeWidth="4"
      />
      <circle
        className="draw-dot draw-dot-late"
        cx="142"
        cy="26"
        fill={CREMA}
        r="8"
        stroke={INK}
        strokeWidth="4"
      />
    </svg>
    <div className="mt-2 flex gap-1.5">
      {['#2d2520', '#725c4c', '#e2c275', '#c9785f'].map((c, i) => (
        <span
          className="swatch-pop size-[22%] rounded-full shadow-[inset_0_0_0_2px_rgba(42,32,25,0.6)]"
          key={c}
          style={{ background: c, '--i': i } as React.CSSProperties}
        />
      ))}
    </div>
  </div>
)

const PROP: Record<PugLook, React.FC> = {
  founder: CodeWindow,
  developer: Terminal,
  marketing: Chart,
  design: Palette,
}

const EXTRA: Partial<Record<PugLook, React.FC>> = {
  marketing: Bow,
  design: Beret,
}

export const TeamPug: React.FC<{
  look: PugLook
  traits?: PugTrait[]
  name: string
  className?: string
}> = ({ look, traits, name, className }) => {
  const worn = traits ?? DEFAULT_TRAITS[look]
  const Prop = PROP[look]
  const Extra = EXTRA[look]
  return (
    <div
      className={cn(
        'team-pug group/pug relative isolate overflow-hidden rounded-[2rem]',
        TILE[look],
        className,
      )}
      role="img"
      aria-label={`${name}, drawn as the AR Tech Dogs pug`}
    >
      <div
        aria-hidden
        className="absolute inset-x-[12%] bottom-[8%] top-[22%] -z-10 rounded-full bg-[#f6e3b4] opacity-60 blur-2xl"
      />
      <div aria-hidden className="pug-tilt relative mx-auto w-[70%] pt-[22%]">
        <div className="pug-breathe relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="h-auto w-full"
            decoding="async"
            height={1110}
            loading="lazy"
            sizes="(min-width: 1024px) 24vw, 70vw"
            src="/brand/pug.webp"
            width={1000}
          />
          <Steam className="absolute left-[49.5%] top-[48.5%] w-[10%] text-[#fff8e8]" />
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            viewBox="0 0 1000 1110"
          >
            {worn.map((t) => {
              const Trait = TRAIT[t]
              return <Trait key={t} />
            })}
            {Extra && <Extra />}
          </svg>
        </div>
      </div>
      <div aria-hidden>
        <Prop />
      </div>
    </div>
  )
}
