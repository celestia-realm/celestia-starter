# celestia-starter

Interactive CLI that scaffolds a **Next.js + Hono + Better Auth + Drizzle** monorepo with only the features you need.

## Usage

```bash
npx celestia-starter my-app
```

The installer will:

1. Ask which features you want (`auth`, `dashboard`, `blog`, `access`) — dependencies are resolved automatically
2. Clone the template and run `pnpm install`
3. Add/remove features through the feature manager (`features.json` stays in sync)
4. Write `apps/api/.env` and `apps/web/.env`, including a generated `BETTER_AUTH_SECRET`
5. Optionally push the database schema and initialize git

## Non-interactive

```bash
npx celestia-starter my-app --features auth,dashboard
```

| Flag | Description |
| --- | --- |
| `--features <a,b>` | Features to install; `requires` are added automatically |
| `--repo <url\|path>` | Template repository to clone (also accepts a local git path) |
| `-h`, `--help` | Show help |

## Requirements

- Node.js ≥ 20, `pnpm`, and `git` on your PATH
- A running PostgreSQL if you let the installer push the schema

## Related

- [`@celestia-project/ui`](https://www.npmjs.com/package/@celestia-project/ui) — the shadcn-style component primitives used by the template
