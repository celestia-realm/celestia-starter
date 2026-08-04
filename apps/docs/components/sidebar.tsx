'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type * as PageTree from 'fumadocs-core/page-tree';
import {
  SidebarItem,
  SidebarSeparator,
} from 'fumadocs-ui/components/sidebar/base';
import {
  ArticleIcon,
  BookOpenIcon,
  CaretRightIcon,
  CubeIcon,
  DatabaseIcon,
  FileCodeIcon,
  GithubLogoIcon,
  HouseIcon,
  LockIcon,
  PackageIcon,
  PlugsIcon,
  RocketIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from '@phosphor-icons/react';
import { cn } from '@/lib/cn';

/**
 * Map `icon` frontmatter strings to Phosphor icons so the sidebar
 * renders real icons instead of raw text.
 */
const ICONS: Record<string, React.ComponentType<{ className?: string; weight?: 'fill' | 'regular' }>> = {
  home: HouseIcon,
  docs: BookOpenIcon,
  terminal: TerminalIcon,
  auth: LockIcon,
  security: ShieldCheckIcon,
  backend: PlugsIcon,
  database: DatabaseIcon,
  dashboard: ArticleIcon,
  components: CubeIcon,
  package: PackageIcon,
  blog: FileCodeIcon,
  features: CaretRightIcon,
  access: ShieldCheckIcon,
  cli: TerminalIcon,
};

function resolveIcon(icon: React.ReactNode): React.ReactNode {
  if (typeof icon !== 'string') return icon;
  const Icon = ICONS[icon.toLowerCase()];
  return Icon ? <Icon className="size-4 shrink-0" /> : null;
}

/**
 * Enhanced sidebar item — same link behaviour as the default, plus:
 * icon support from frontmatter, an accent bar + tinted background on
 * the active page, and a smoother hover transition.
 */
export function EnhancedSidebarItem({ item }: Readonly<{ item: PageTree.Item }>) {
  const pathname = usePathname();
  const active = pathname === item.url;

  return (
    <SidebarItem
      href={item.url}
      active={active}
      icon={resolveIcon(item.icon)}
      className={cn(
        'relative rounded-md transition-colors duration-150',
        active
          ? 'bg-fd-primary/10 font-medium text-fd-primary'
          : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
      )}
    >
      {active && (
        <span
          aria-hidden
          className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-fd-primary"
        />
      )}
      {item.name}
    </SidebarItem>
  );
}

/**
 * Enhanced separator — a small brand dot before the section label.
 */
export function EnhancedSidebarSeparator({ item }: Readonly<{ item: PageTree.Separator }>) {
  return (
    <SidebarSeparator className="mt-4 mb-1 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
      <span aria-hidden className="size-1.5 rounded-full bg-fd-primary" />
      {item.name}
    </SidebarSeparator>
  );
}

export const sidebarComponents = {
  Item: EnhancedSidebarItem,
  Separator: EnhancedSidebarSeparator,
};

/** Compact banner — project identity and quick links above the tree. */
export function DocsSidebarBanner() {
  return (
    <div className="border-b border-fd-border p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4 text-fd-primary" weight="fill" />
          <span className="text-sm font-semibold">Celestia Starter</span>
        </div>
        <Link
          href="https://github.com/celestia-realm/celestia-starter"
          target="_blank"
          rel="noreferrer"
          aria-label="Star on GitHub"
          className="rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          <GithubLogoIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}

/** Compact footer — version badge pinned below the tree. */
export function DocsSidebarFooter() {
  return (
    <div className="border-t border-fd-border p-3">
      <div className="flex items-center justify-between text-xs text-fd-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-green-500" />
          {'v1.0.0'}
        </span>
        <span>MIT License</span>
      </div>
    </div>
  );
}
