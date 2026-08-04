"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

const LINKS = [
  { href: "#stack", label: "Stack" },
  { href: "#architecture", label: "Architecture" },
  { href: "#install", label: "Install" },
]

export function LogoMark({ className }: Readonly<{ className?: string }>) {
  return (
    <span
      aria-hidden
      className={cn(
        "accent-gradient grid size-7 place-items-center rounded-full",
        className,
      )}
    >
      <span className="grid size-[22px] place-items-center rounded-full bg-bg">
        <span className="size-1.5 rounded-full bg-[#89aacc]" />
      </span>
    </span>
  )
}

export function NavBar() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 motion-reduce:transition-none",
        scrolled
          ? "border-b border-stroke bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-text-primary"
        >
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            Celestia Starter
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-fog transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/sign-in" />}
            variant="ghost"
            size="lg"
            className="text-fog hover:text-text-primary"
          >
            Sign in
          </Button>
          <Button render={<Link href="/sign-up" />} variant="default" size="lg">
            Get started
          </Button>
        </div>
      </nav>
    </header>
  )
}
