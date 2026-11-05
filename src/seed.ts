/**
 * `pnpm seed` — load AR Tech Dogs starting content into the database.
 * Safe to re-run; see src/endpoints/seed/index.ts for exactly what it replaces.
 */
import config from '@payload-config'
import { createLocalReq, getPayload } from 'payload'

import { seed } from './endpoints/seed'

const payload = await getPayload({ config })
const req = await createLocalReq({}, payload)
await seed({ payload, req })
process.exit(0)
