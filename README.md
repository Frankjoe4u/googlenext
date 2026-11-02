# NextCollege Dashboard — Next.js 16 · Auth.js v5 · Prisma 7 (SQLite) · Tailwind CSS v4 · pnpm

Rename the app in `lib/config.ts`. Animations (fade-up, float, shake, gradient) are defined in `app/globals.css` under `@theme` and respect `prefers-reduced-motion`.

## Setup
```bash
pnpm install
cp .env.example .env          # set AUTH_SECRET (pnpm dlx auth secret) + Google keys
pnpm db:generate              # Prisma 7 no longer generates on migrate
pnpm db:migrate               # creates dev.db
pnpm dev
```
Google redirect URI: `http://localhost:3000/api/auth/callback/google`

## Map to the task
1. **Register** – `registerAction` in `lib/actions.ts` (zod validation, bcrypt hash, `prisma.user.create`, auto-login). Page: `/register`.
2. **Login** – Credentials + Google in `auth.ts`; page `/login` (server actions, no client JS needed).
3. **Google → DB** – `signIn` callback in `auth.ts` upserts the Google user (`provider: "google"`, no password).
4. **Callbacks** – `jwt` copies `id/role/provider/createdAt` from DB into the token; `session` exposes them on `session.user` (types in `types/next-auth.d.ts`).

`proxy.ts` (Next 16's replacement for `middleware.ts`) protects `/dashboard`.
Prisma 7 specifics: `prisma.config.ts` holds the DB URL, the client is generated to `generated/prisma`, and `lib/prisma.ts` uses the better-sqlite3 driver adapter. `pnpm-workspace.yaml` allows the native build scripts pnpm blocks by default.

## UI
Tailwind CSS v4 (`app/globals.css` defines the custom animations: fade-up, float, shake, gradient). Rename the app in `lib/config.ts`.
