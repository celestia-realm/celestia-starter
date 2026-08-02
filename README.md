# Celestia Starter

A production-ready full-stack monorepo template with a decoupled architecture: a Hono backend that owns the data and auth, and a Next.js frontend that is pure UI. Built with Next.js 16, Hono, Better Auth, Drizzle ORM, and shadcn/ui.

## Tech Stack

- **Next.js 16** — Frontend (pure UI), App Router
- **Hono** — Standalone backend API (owns DB + auth + business logic)
- **Better Auth** — Email/password + Google OAuth + 2FA (runs on the backend)
- **Drizzle ORM** — Type-safe PostgreSQL queries
- **Hono RPC** — End-to-end typed API calls from frontend to backend
- **Tailwind CSS + shadcn/ui** — Utility-first styling with accessible components
- **Fumadocs** — Documentation site
- **Turborepo + pnpm** — Fast monorepo builds and workspace management

## Project Structure

```
celestia-starter/
├── apps/
│   ├── web/              # Next.js frontend (pure UI, no database access)
│   ├── api/              # Hono backend (auth + data + business logic)
│   └── docs/             # Documentation site (Fumadocs)
├── packages/
│   ├── db/               # Drizzle schema + client (backend-only)
│   ├── ui/               # Shared shadcn/ui component library
│   ├── eslint-config/    # Shared ESLint flat-config presets
│   ├── typescript-config/# Reusable tsconfig profiles
│   └── feature-manager/  # CLI for installing features
├── features/             # Installable feature modules
└── turbo.json            # Turborepo task pipeline
```

## Getting Started

```bash
pnpm install
pnpm --filter @workspace/db db:push   # create the database schema
pnpm dev                               # starts web + api + docs
```

This starts the frontend at `http://localhost:3000` and the API at `http://localhost:4000`. The frontend proxies every `/api/*` request to the backend (see `apps/web/next.config.ts`).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint the entire workspace |
| `pnpm format` | Format with Prettier |
| `pnpm typecheck` | Type-check all packages |
| `pnpm docs` | Start the docs site |
| `pnpm add-feature <name>` | Install a feature into `apps/web` |
| `pnpm list-features` | List available and installed features |

## Adding UI Components

Add shadcn/ui components to the shared `@workspace/ui` package:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Then import them anywhere in the monorepo:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Features

Features are self-contained modules installed via the feature manager. Each feature declares its files, dependencies, env vars, and post-install steps in a `feature.json` manifest.

```bash
pnpm add-feature auth
```

### Installed Features

- **auth** — Email/password + Google OAuth with Better Auth, Drizzle ORM, and 2FA
- **dashboard** — Protected dashboard with sidebar navigation, route protection, and user settings

> The canonical setup is the decoupled architecture described in the [Backend API docs](apps/docs/content/docs/backend.mdx): auth and data live in `apps/api`, and the frontend is pure UI. The `features/auth` template predates this separation; see the docs for the current layout.

## Environment Variables

The backend owns all secrets. Configure `apps/api/.env`:

```bash
PORT=4000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<openssl rand -base64 32>
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/celestia
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

The frontend only needs the backend URL in `apps/web/.env`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Documentation

Run the docs site locally:

```bash
pnpm docs
```

Content lives in `apps/docs/content/docs/` as MDX files.
