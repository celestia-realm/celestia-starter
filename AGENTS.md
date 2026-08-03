<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:architecture-agent-rules -->
# Frontend / Backend Split (mandatory)

This project uses a **separated architecture**. All new features MUST respect the boundary between frontend and backend.

## Architecture

| Layer | Location | Runtime | Responsibility |
|-------|----------|---------|----------------|
| Backend API | `apps/api` | Hono (port 4000) | Auth server, business logic, CRUD routes, database access |
| Frontend | `apps/web` | Next.js (port 3000) | Pure UI — pages, components, client-side auth via `better-auth/react` |
| Shared DB | `packages/db` | — | Drizzle ORM schema + client (`@workspace/db`) |
| Shared UI | `packages/ui` | — | Reusable shadcn/ui components (`@workspace/ui`) |

## Rules

1. **Never run server logic in `apps/web`.** No direct DB access, no Better Auth server instance, no secret env vars. The web app is a pure UI client.
2. **All API routes live in `apps/api`** (Hono). The frontend reaches them via the `/api/*` rewrite proxy in `next.config.ts`.
3. **Auth server** (`betterAuth(...)`) belongs in `apps/api/src/auth.ts`. The frontend only imports the auth *client* (`better-auth/react`).
4. **Database access** uses the shared `@workspace/db` package — never create a local `db.ts` or `Pool` inside an app.
5. **Env vars with secrets** (`DATABASE_URL`, `BETTER_AUTH_SECRET`, OAuth secrets) go in `apps/api/.env` only.

## Feature template structure (`features/<name>/`)

Features MUST organize template files by target:

```
features/<name>/
├── api/          → files copied into apps/api  (routes, services)
├── web/          → files copied into apps/web  (pages, components, hooks)
├── ui/           → files copied into packages/ui (shared components)
├── docs/         → files copied into apps/docs/content/docs/
├── snippets/     → insertion snippets for marker-based edits
└── feature.json  → manifest using `copies` / `insertions` format
```

- Use the **`copies`** array (not the legacy `files` map) in `feature.json`.
- Each copy entry: `{ "from": "<relative to feature dir>", "to": "<relative to repo root>" }`.
- Dependencies and env vars are **keyed by target package dir** (e.g. `"apps/api": { ... }`).
- Backend code must never import from `apps/web`; frontend code must never import server auth or DB directly.
<!-- END:architecture-agent-rules -->

<!-- BEGIN:docs-agent-rules -->
# Documentation is mandatory

When a new feature is developed or an existing feature is modified, you MUST update the documentation site (`apps/docs/content/docs/`).

## Requirements

1. **New feature** — Create a new `.mdx` page in `apps/docs/content/docs/` covering:
   - What the feature does
   - Environment variables it requires
   - File overview (where the code lives)
   - Server and client usage examples
   - Setup / install instructions
2. **Modified feature** — Update the corresponding `.mdx` page to reflect any API, config, or dependency changes.
3. **Sidebar ordering** — Add the new page to `apps/docs/content/docs/meta.json` so it appears in navigation.
4. **Landing page cards** — Add a `<Card>` link on `index.mdx` for each new feature page.
5. **README** — Update the root `README.md` "Installed Features" section when a feature is added or removed.

## Conventions

- Use MDX with Fumadocs components (`<Cards>`, `<Card>`).
- Use `bash` for shell/env code fences (Shiki does not support `env`).
- Keep code examples copy-pasteable and consistent with the actual implementation.
<!-- END:docs-agent-rules -->
