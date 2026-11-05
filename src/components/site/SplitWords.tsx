import React from 'react'

/**
 * Splits a heading into words, each inside its own mask, so the words rise out of the
 * baseline one after another. Inside a <Reveal> they play when the block scrolls into view;
 * with `onLoad` they play as soon as the page paints (heroes). The text stays one readable
 * string for screen readers and search engines.
 */
export const SplitWords: React.FC<{
  text: string
  onLoad?: boolean
  step?: number
  /** Index of the first word, to continue a stagger across lines. */
  start?: number
}> = ({ text, onLoad, step = 45, start = 0 }) => (
  <span className={onLoad ? 'split split-load' : 'split'}>
    {text.split(/\s+/).map((word, i, all) => (
      <React.Fragment key={i}>
        <span className="split-mask">
          <span style={{ '--i': start + i, '--step': `${step}ms` } as React.CSSProperties}>
            {word}
          </span>
        </span>
        {i < all.length - 1 && ' '}
      </React.Fragment>
    ))}
  </span>
)
