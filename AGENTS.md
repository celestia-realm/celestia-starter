<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

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
