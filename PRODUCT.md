# Product

## Register

brand

## Users

Senior full-stack developers and small product teams starting a new production web app. They have built apps before, they know what boilerplate costs them, and they can spot marketing fluff instantly. Their job: go from zero to a running, typed, authenticated, deployable codebase without spending a week on plumbing.

## Product Purpose

Celestia Starter is a production-ready full-stack monorepo template with a deliberately decoupled architecture: a Hono backend that owns the database and auth, and a Next.js 16 frontend that is pure UI. It ships Better Auth (email/password, Google OAuth, 2FA), Drizzle ORM, an end-to-end typed Hono RPC client, a docs site, and a feature installer (`pnpm add-feature`) that adds only the capability modules you pick. Success: a developer runs `npx celestia-starter my-app`, answers a few prompts, and is building product features the same day.

## Brand Personality

Technical, confident, precise. Speaks in short declarative claims and real commands, never hype. Quiet confidence — it shows the architecture instead of describing it. Mono-spaced details are the voice: terminals, tokens, paths.

## Anti-references

- Generic AI-SaaS landing pages: hero metric counters, identical icon-card grids, gradient text, "Supercharge your workflow" copy.
- Consumer / lifestyle editorial aesthetics: soft serifs, warm cream palettes, anything that does not read immediately as a serious developer tool.

## Design Principles

1. Show, don't tell — render the actual CLI output, the actual architecture boundary, the actual stack; no adjectives doing work that artifacts can do.
2. Expert confidence — assume the reader is senior; claims are short, specific, and verifiable.
3. One ornament — a monochrome surface with a single blue accent gradient; restraint is the identity.
4. Forced dark — the product lives in terminals and editor themes; the landing is always dark, no toggle.

## Accessibility & Inclusion

WCAG AA contrast at minimum (body text ≥ 4.5:1). All motion honors `prefers-reduced-motion` with an instant/static fallback. The hero video is decorative (aria-hidden, muted, no audio content) and content never depends on it loading.
