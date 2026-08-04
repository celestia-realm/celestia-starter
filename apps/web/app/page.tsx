import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"

import { CopyCommand } from "@/components/landing/copy-command"
import { HeroVideo } from "@/components/landing/hero-video"
import { LogoMark, NavBar } from "@/components/landing/nav-bar"
import { Reveal } from "@/components/landing/reveal"
import { InstallTerminal } from "@/components/landing/terminal"

import "./landing.css"

export const metadata: Metadata = {
  title: "Celestia Starter — Production-ready full-stack monorepo",
  description:
    "Next.js 16 frontend, Hono backend, Better Auth, Drizzle ORM — a decoupled full-stack starter installed in one command.",
}

const GITHUB_URL = "https://github.com/celestia-realm/celestia-starter"

function GithubIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <title>GitHub</title>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function GithubButton({ variant = "outline" }: Readonly<{ variant?: "outline" | "ghost" }>) {
  return (
    <Button
      render={<Link href={GITHUB_URL} target="_blank" rel="noreferrer" />}
      variant={variant}
      size="lg"
      className="h-11 gap-2 px-6"
    >
      <GithubIcon className="size-4" />
      Star on GitHub
    </Button>
  )
}

const STACK = [
  {
    name: "Authentication",
    tag: "better-auth",
    description:
      "Email/password, Google OAuth, and 2FA. Sessions live in PostgreSQL, handled by Better Auth on the backend.",
  },
  {
    name: "Typed API",
    tag: "hono-rpc",
    description:
      "Hono routes with an RPC client — call the backend from React with end-to-end types and no codegen.",
  },
  {
    name: "Data layer",
    tag: "drizzle",
    description:
      "Drizzle ORM over PostgreSQL in a shared workspace package. Type-safe from schema to query.",
  },
  {
    name: "Feature installer",
    tag: "feature-manager",
    description:
      "pnpm add-feature <name> copies templates, wires imports, installs dependencies. Removing is one command too.",
  },
  {
    name: "Documentation",
    tag: "fumadocs",
    description:
      "A Fumadocs site, pre-wired with search, MDX pages, and LLM-friendly text endpoints.",
  },
  {
    name: "Monorepo",
    tag: "turborepo",
    description:
      "Turborepo pipeline and pnpm workspaces. UI, configs, and types shared across apps without duplication.",
  },
]

export default function LandingPage() {
  return (
    // "dark" scope forces the shadcn dark tokens for every component on
    // this page — the landing is always dark, regardless of system theme.
    <main className="dark bg-bg text-text-primary">
      <NavBar />

      {/* ── Hero — full-viewport footage with centered content ── */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
        <HeroVideo />

        <div className="hero-stagger relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <p className="font-mono text-[13px] text-fog">
            <span className="mr-2 inline-block size-1.5 rounded-full align-middle accent-gradient" />
            <span>celestia-starter · production-ready</span>
          </p>

          <h1 className="mt-6 font-semibold text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[1.04] tracking-[-0.03em] text-balance">
            The production stack, installed in one command.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fog text-pretty sm:text-lg">
            Celestia is a full-stack monorepo starter with a real architecture:
            a Next.js 16 frontend that stays pure UI, a Hono backend that owns
            auth and data, and a feature installer so you only carry what you
            use.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              render={<Link href="/sign-up" />}
              variant="default"
              size="lg"
              className="h-11 px-6"
            >
              Get started
            </Button>
            <GithubButton />
            <CopyCommand />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          className="hero-scroll absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex h-9 w-[22px] items-start justify-center overflow-hidden rounded-full border border-stroke bg-bg/40 p-1 backdrop-blur-sm">
            <span className="block h-2.5 w-[3px] rounded-full bg-[#89aacc] animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
              The box comes full.
            </h2>
            <p className="mt-5 max-w-md text-fog leading-relaxed">
              Every piece is a package you can open and read. Nothing is
              generated behind a service, and nothing you remove leaves a hole.
            </p>
          </Reveal>

          <div className="reveal-stagger">
            {STACK.map((item) => (
              <Reveal key={item.tag}>
                <div className="group grid gap-1 border-t border-stroke py-6 transition-colors duration-300 last:border-b hover:bg-surface/60 motion-reduce:transition-none sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-6 sm:px-4">
                  <h3 className="font-medium text-text-primary">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-fog">
                    {item.description}
                  </p>
                  <span className="font-mono text-xs text-fog/80 transition-colors group-hover:text-[#89aacc]">
                    {item.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section
        id="architecture"
        className="border-y border-stroke bg-surface/40"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
              Two apps. One boundary. Enforced by structure.
            </h2>
            <p className="mt-5 max-w-2xl text-fog leading-relaxed">
              The frontend never touches the database. The backend never
              renders a pixel. Requests cross the boundary only through the{" "}
              <code className="font-mono text-sm text-text-primary">
                /api/*
              </code>{" "}
              rewrite — so secrets stay server-side by construction, not by
              convention.
            </p>
          </Reveal>

          <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-[1fr_5.5rem_1fr]">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-stroke bg-bg p-8">
                <p className="font-mono text-xs text-fog">apps/web</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em]">
                  Pure UI
                </h3>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-fog">
                  <li className="flex gap-3">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-stroke" />
                    <span>
                      Next.js 16 App Router — pages, components, client-side
                      auth only
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-stroke" />
                    <span>No database access, no server secrets, ever</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-stroke" />
                    <span>Talks to the API through the same-origin proxy</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Boundary */}
            <div aria-hidden className="hidden items-center justify-center lg:flex">
              <div className="relative h-full w-px bg-stroke">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-stroke bg-bg px-3 py-1 font-mono text-xs whitespace-nowrap text-fog">
                  /api/*
                </span>
                <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 translate-y-8 rounded-full accent-gradient" />
              </div>
            </div>
            <div aria-hidden className="flex justify-center lg:hidden">
              <span className="rounded-full border border-stroke bg-bg px-3 py-1 font-mono text-xs text-fog">
                /api/*
              </span>
            </div>

            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-stroke bg-bg p-8">
                <p className="font-mono text-xs text-fog">apps/api</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em]">
                  Owns the truth
                </h3>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-fog">
                  <li className="flex gap-3">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-stroke" />
                    <span>
                      Hono server on port 4000 — business logic and CRUD
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-stroke" />
                    <span>Better Auth server — sessions, OAuth, 2FA</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-stroke" />
                    <span>Drizzle ORM — the only code that talks to PostgreSQL</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Install ── */}
      <section id="install" className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
              From npx to pnpm dev.
            </h2>
            <p className="mt-5 text-fog leading-relaxed">
              One command clones the template, then walks you through the rest:
              pick features, write env files, install dependencies, push the
              schema. You land in a repository you already understand.
            </p>
            <ul className="mt-8 space-y-4 font-mono text-sm text-fog">
              <li className="flex items-baseline gap-3">
                <span className="text-[#89aacc]">✔</span>
                <span>Features are optional — auth, dashboard, blog</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[#89aacc]">✔</span>
                <span>Dependencies and env vars keyed per package</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[#89aacc]">✔</span>
                <span>Git initialized on the last step</span>
              </li>
            </ul>
          </Reveal>

          <Reveal>
            <InstallTerminal />
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="border-t border-stroke">
        <div className="mx-auto w-full max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <LogoMark className="mx-auto" />
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
              Start from architecture, not setup.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-fog leading-relaxed">
              Create an account and take the dashboard for a spin, or run the
              installer and make it yours.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={<Link href="/sign-up" />}
                variant="default"
                size="lg"
                className="h-11 px-6"
              >
                Get started
              </Button>
              <Button
                render={<Link href="/sign-in" />}
                variant="outline"
                size="lg"
                className="h-11 px-6"
              >
                Sign in
              </Button>
              <GithubButton variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-stroke">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-sm font-medium">Celestia Starter</span>
          </div>
          <p className="font-mono text-xs text-fog">
            Next.js 16 · Hono · Better Auth · Drizzle ORM · MIT
          </p>
        </div>
      </footer>
    </main>
  )
}
