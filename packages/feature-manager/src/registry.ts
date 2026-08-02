import type { Feature, FeatureNavItem } from "./types.js"

const registry = new Map<string, Feature>()

export function registerFeature(feature: Feature): Feature {
  if (registry.has(feature.id)) {
    console.warn(`Feature "${feature.id}" is already registered. Overwriting.`)
  }
  registry.set(feature.id, feature)
  return feature
}

export function unregisterFeature(id: string): void {
  registry.delete(id)
}

export function getFeatures(): Feature[] {
  return [...registry.values()]
}

export function getFeature(id: string): Feature | undefined {
  return registry.get(id)
}

export function hasFeature(id: string): boolean {
  return registry.has(id)
}

export function getNavItems(): FeatureNavItem[] {
  return getFeatures().flatMap((f) => f.navItems ?? [])
}
