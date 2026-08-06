import type { Metadata } from "next"

import { ArchitectureSection } from "@/components/landing/architecture-section"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { InstallSection } from "@/components/landing/install-section"
import { NavBar } from "@/components/landing/nav-bar"
import { StackSection } from "@/components/landing/stack-section"

import "./landing.css"

export const metadata: Metadata = {
  title: "Celestia Starter — Production-ready full-stack monorepo",
  description:
    "Next.js 16 frontend, Hono backend, Better Auth, Drizzle ORM — a decoupled full-stack starter installed in one command.",
}

export default function LandingPage() {
  return (
    // "dark" scope forces the shadcn dark tokens for every component on
    // this page — the landing is always dark, regardless of system theme.
    <main className="dark bg-bg text-text-primary">
      <NavBar />
      <HeroSection />
      <StackSection />
      <ArchitectureSection />
      <InstallSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
