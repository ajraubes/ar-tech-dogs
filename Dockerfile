# AR Tech Dogs — production image (works as-is with Dokploy's "Dockerfile" build type).
#
# The build does not need a database: pages render on request and read content from
# Payload at runtime. Database migrations run automatically when the app starts.
#
# Runtime environment variables: DATABASE_URL, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL,
# PREVIEW_SECRET, CRON_SECRET. Mount a persistent volume at /app/public/media for uploads.

FROM node:22.23.4-alpine AS base
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* values are baked into the client bundle, so pass the public URL at build time.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
# Placeholders so Payload's config loads during the build; real values come at runtime.
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build \
    PAYLOAD_SECRET=build-time-placeholder
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Uploads live here; mount a volume on this path so they survive redeploys.
RUN mkdir -p .next public/media && chown -R nextjs:nodejs .next public/media

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/og >/dev/null || exit 1

CMD ["node", "server.js"]
