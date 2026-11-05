# Deploying to Dokploy

The site ships as one Docker image (see `Dockerfile`) plus a PostgreSQL database. The build needs no database. Migrations run when the container starts.

## 1. Create the database

In the **AR Tech Dogs** project, open the **production** environment and choose **Create Service → Database → PostgreSQL**.

- Name: `artechdogs-db`
- Version: 16 or newer
- Pick a strong password, then **Deploy**.

When it is running, copy the **Internal Connection URL**. It looks like `postgresql://postgres:<password>@artechdogs-db-xxxx:5432/postgres`.

## 2. Create the application

**Create Service → Application**, named `artechdogs-web`.

- **Provider:** GitHub, repository `ajraubes/ar-tech-dogs`, branch `main`.
  - If the repository isn't listed, connect GitHub first under **Settings → Git**.
- **Build type:** Dockerfile, path `Dockerfile`, context `.`

## 3. Environment

Under **Environment**, set these variables:

| Variable                 | Value                                                     |
| ------------------------ | --------------------------------------------------------- |
| `DATABASE_URL`           | The internal connection URL from step 1                   |
| `PAYLOAD_SECRET`         | A random string, e.g. the output of `openssl rand -hex 32` |
| `NEXT_PUBLIC_SERVER_URL` | `https://artechdogs.co.za` (no trailing slash)            |
| `PREVIEW_SECRET`         | Another random string                                     |
| `CRON_SECRET`            | Another random string                                     |

Under **Build-time arguments**, also set `NEXT_PUBLIC_SERVER_URL=https://artechdogs.co.za`. Next.js bakes public variables into the build.

## 4. Keep uploaded images

Under **Advanced → Volumes**, add a volume mount:

- Name: `artechdogs-media`
- Mount path: `/app/public/media`

Without it, images uploaded in the admin are lost on each redeploy.

## 5. Domain

1. At your DNS provider, add an `A` record for `artechdogs.co.za` (and `www` if wanted) pointing to `72.60.23.30`.
2. In Dokploy, go to **Domains → Add Domain**:
   - Host `artechdogs.co.za`, path `/`, container port `3000`.
   - Turn on HTTPS with the Let's Encrypt certificate.

Until DNS is ready, you can use Dokploy's generated `traefik.me` domain to test.

## 6. Deploy and load content

1. Click **Deploy**. The first build takes a few minutes. The logs should end with `Migrated: 20261105_172611_initial` and `Ready`.
2. Open `https://artechdogs.co.za/admin` and create the first admin user.
3. On the admin dashboard, click **Seed** to load the services, packages, team and copy from the project plan.
4. Turn on **Auto Deploy** so each push to `main` redeploys.

## Notes

- Don't run `pnpm payload migrate` or a dev server against the production database. Migrations apply on their own at startup.
- Email isn't configured yet, so enquiries are saved in **Agency → Enquiries** and email is only written to the logs. Add an email adapter in `src/payload.config.ts` when you choose a provider.
- The container health check requests `/og`, which doesn't touch the database.
