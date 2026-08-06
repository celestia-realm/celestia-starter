"use client"

import type * as PageTree from "fumadocs-core/page-tree"
import {
  SidebarItem,
  SidebarSeparator,
} from "fumadocs-ui/components/sidebar/base"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/cn"

/**
 * Enhanced sidebar item — same link behaviour as the default, plus:
 * an accent bar + tinted background on the active page, and a smoother hover transition.
 */
export function EnhancedSidebarItem({
  item,
}: Readonly<{ item: PageTree.Item }>) {
  const pathname = usePathname()
  const active = pathname === item.url

  return (
    <SidebarItem
      href={item.url}
      active={active}
      className={cn(
        "flex gap-2 items-center p-2 relative rounded-md transition-colors duration-150",
        active
          ? "bg-fd-primary/10 text-fd-primary font-medium"
          : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
      )}
    >
      {active && (
        <span
          aria-hidden
          className="bg-fd-primary absolute inset-y-1.5 left-0 w-0.5 rounded-full"
        />
      )}
      {item.name}
    </SidebarItem>
  )
}

/**
 * Enhanced separator — a small brand dot before the section label.
 */
export function EnhancedSidebarSeparator({
  item,
}: Readonly<{ item: PageTree.Separator }>) {
  return (
    <SidebarSeparator className="text-fd-muted-foreground mt-4 mb-1 flex items-center gap-2 px-2 text-xs font-semibold tracking-wide uppercase">
      <span aria-hidden className="bg-fd-primary size-1.5 rounded-full" />
      {item.name}
    </SidebarSeparator>
  )
}

export const sidebarComponents = {
  Item: EnhancedSidebarItem,
  Separator: EnhancedSidebarSeparator,
}

/** Compact footer — version badge pinned below the tree. */
export function DocsSidebarFooter() {
  return (
    <div className="border-fd-border border-t p-3">
      <div className="text-fd-muted-foreground flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-green-500" />
          {"v1.0.0"}
        </span>
        <span>MIT License</span>
      </div>
    </div>
  )
}
