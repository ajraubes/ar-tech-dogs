import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Agency content (services, packages, projects, team, partners, settings) appears on
 * many pages at once, so a change revalidates the whole site layout plus the data tag.
 */
const revalidateAll = (tag: string, context: Record<string, unknown>) => {
  if (context.disableRevalidate) return
  try {
    revalidateTag(tag, 'max')
    revalidateTag('pages-sitemap', 'max')
    revalidatePath('/', 'layout')
  } catch {
    // Not inside a Next.js request (for example `pnpm seed`). Safe to ignore.
  }
}

export const revalidateCollection =
  (tag: string): CollectionAfterChangeHook =>
  ({ doc, req: { context } }) => {
    revalidateAll(tag, context)
    return doc
  }

export const revalidateCollectionDelete =
  (tag: string): CollectionAfterDeleteHook =>
  ({ doc, req: { context } }) => {
    revalidateAll(tag, context)
    return doc
  }

export const revalidateGlobal =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc, req: { context } }) => {
    revalidateAll(tag, context)
    return doc
  }
