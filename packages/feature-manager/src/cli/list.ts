import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join, resolve } from "node:path"

import type { FeatureManifest, FeatureTracker } from "../types.js"

export function listFeatures() {
  const root = resolve(process.cwd())
  const featuresDir = join(root, "features")
  const trackerPath = join(root, "features.json")

  const tracker: FeatureTracker = existsSync(trackerPath)
    ? JSON.parse(readFileSync(trackerPath, "utf-8"))
    : { features: {} }

  if (!existsSync(featuresDir)) {
    console.log("No features/ directory found.")
    return
  }

  const dirs = readdirSync(featuresDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const available = dirs.flatMap((dir) => {
    const p = join(featuresDir, dir, "feature.json")
    if (!existsSync(p)) return []
    const m: FeatureManifest = JSON.parse(readFileSync(p, "utf-8"))
    return [{ name: dir, manifest: m }]
  })

  if (available.length === 0) {
    console.log("No features available.")
    return
  }

  console.log("\n  Feature                  Status       Version")
  console.log("  ─────────────────────────────────────────────────")

  for (const f of available) {
    const installed = tracker.features[f.name]
    const status = installed ? "✓ installed" : "  available"
    const version = installed ? installed.version : f.manifest.version
    console.log(`  ${f.name.padEnd(25)}${status.padEnd(13)}${version}`)
  }

  console.log("")
}
