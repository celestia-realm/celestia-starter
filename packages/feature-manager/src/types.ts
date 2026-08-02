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

export interface FeatureManifest {
  name: string
  version: string
  description: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  env?: string[]
  requires?: string[]
  files: Record<string, string>
  postInstall?: string[]
  notes?: string
}

export interface InstalledFeature {
  version: string
  installedAt: string
}

export interface FeatureTracker {
  features: Record<string, InstalledFeature>
}
