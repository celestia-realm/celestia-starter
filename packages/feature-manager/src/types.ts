export interface FeatureNavItem {
  label: string
  href: string
  icon?: string
}

export interface Feature {
  id: string
  name: string
  version: string
  description?: string
  navItems?: FeatureNavItem[]
  settingsRoutes?: string[]
}

/** A file copied from the feature directory into the repository. */
export interface FeatureCopy {
  /** Path relative to the feature directory. */
  from: string
  /** Path relative to the repo root, e.g. "apps/web/...", "apps/api/...", "packages/db/...". */
  to: string
}

/** A snippet inserted into a managed marker region of a target file. */
export interface FeatureInsertion {
  /** Target file relative to the repo root. */
  file: string
  /** Marker id; the target file must already contain an empty region for it. */
  marker: string
  /** Snippet file (relative to the feature directory) whose content is inserted. */
  snippet: string
}

/** Appends a value to a JSON array — for files that cannot hold comment markers (e.g. meta.json). */
export interface FeatureJsonAppend {
  /** Target JSON file relative to the repo root. */
  file: string
  /** Dot path to the array, e.g. "pages". */
  path: string
  /** Value to append. */
  value: string
}

export interface FeatureManifest {
  name: string
  version: string
  description: string
  requires?: string[]
  /** Files copied into the repo (multi-target). */
  copies?: FeatureCopy[]
  /** Snippets inserted into managed marker regions. */
  insertions?: FeatureInsertion[]
  /** Values appended to JSON arrays. */
  jsonAppends?: FeatureJsonAppend[]
  /** Dependencies keyed by target package dir, e.g. { "apps/api": { "drizzle-orm": "^0.45.2" } }. */
  dependencies?: Record<string, Record<string, string>>
  /** Dev dependencies keyed by target package dir. */
  devDependencies?: Record<string, Record<string, string>>
  /** Env vars keyed by target dir containing .env, e.g. { "apps/api": ["FOO=bar"] }. */
  env?: Record<string, string[]>
  postInstall?: string[]
  notes?: string

  // ── Legacy (v1) fields — normalized at runtime for backward compatibility ──
  /** @deprecated use `copies`. Web-relative file map: { "<src>": "<dest in apps/web>" }. */
  files?: Record<string, string>
}

export interface InstalledFeature {
  version: string
  installedAt: string
}

export interface FeatureTracker {
  features: Record<string, InstalledFeature>
}
