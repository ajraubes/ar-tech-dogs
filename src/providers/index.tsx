import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'

// The site has one brand theme (charcoal, with warm-white sections set per element),
// so there is no user theme switcher.
export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <HeaderThemeProvider>{children}</HeaderThemeProvider>
}
