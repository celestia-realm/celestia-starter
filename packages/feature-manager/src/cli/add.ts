import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"

import type { FeatureManifest, FeatureTracker } from "../types.js"

export function addFeature(name: string | undefined) {
  const root = resolve(process.cwd())
  const featuresDir = join(root, "features")
  const webDir = join(root, "apps", "web")
  const trackerPath = join(root, "features.json")

  if (!name) {
    console.error("Usage: feature-manager add <name>\n")
    printAvailable(featuresDir, trackerPath)
    process.exit(1)
  }

  const featureDir = join(featuresDir, name)

  if (!existsSync(featureDir)) {
    console.error(`✗ Feature "${name}" not found in features/\n`)
    printAvailable(featuresDir, trackerPath)
    process.exit(1)
  }

  const manifest: FeatureManifest = JSON.parse(
    readFileSync(join(featureDir, "feature.json"), "utf-8"),
  )

  const tracker: FeatureTracker = JSON.parse(readFileSync(trackerPath, "utf-8"))

  if (tracker.features[name]) {
    console.error(`✗ Feature "${name}" is already installed (v${tracker.features[name].version})`)
    process.exit(1)
  }

  // Check prerequisites
  for (const dep of manifest.requires ?? []) {
    if (!tracker.features[dep]) {
      console.error(`✗ Feature "${name}" requires "${dep}" to be installed first.`)
      console.error(`  Run: pnpm add-feature ${dep}`)
      process.exit(1)
    }
  }

  console.log(`\n⚡ Installing feature: ${manifest.name} (v${manifest.version})`)
  console.log(`   ${manifest.description}\n`)

  // Copy files
  console.log("  Copying files...")
  for (const [src, dest] of Object.entries(manifest.files)) {
    const srcPath = join(featureDir, src)
    const destPath = join(webDir, dest)

    if (!existsSync(srcPath)) {
      console.warn(`  ⚠ Template file not found: ${src}`)
      continue
    }

    mkdirSync(dirname(destPath), { recursive: true })
    cpSync(srcPath, destPath, { recursive: true })
    console.log(`    + ${dest}`)
  }

  // Add dependencies
  if (manifest.dependencies) {
    console.log("\n  Adding dependencies...")
    const webPkgPath = join(webDir, "package.json")
    const webPkg = JSON.parse(readFileSync(webPkgPath, "utf-8"))
    webPkg.dependencies = { ...webPkg.dependencies, ...manifest.dependencies }
    if (manifest.devDependencies) {
      webPkg.devDependencies = { ...webPkg.devDependencies, ...manifest.devDependencies }
    }
    writeFileSync(webPkgPath, JSON.stringify(webPkg, null, 2) + "\n")
    for (const dep of Object.keys(manifest.dependencies)) {
      console.log(`    + ${dep}`)
    }
  }

  // Update tracker
  tracker.features[name] = {
    version: manifest.version,
    installedAt: new Date().toISOString(),
  }
  writeFileSync(trackerPath, JSON.stringify(tracker, null, 2) + "\n")

  // Print next steps
  console.log("\n✅ Feature installed!\n")
  console.log("  Next steps:")
  console.log("    1. Run: pnpm install")

  if (manifest.env?.length) {
    console.log("    2. Add env vars to apps/web/.env:")
    for (const env of manifest.env) {
      console.log(`       ${env}`)
    }
  }

  if (manifest.postInstall?.length) {
    const step = manifest.env?.length ? 3 : 2
    console.log(`    ${step}. Run post-install commands:`)
    for (const cmd of manifest.postInstall) {
      console.log(`       ${cmd}`)
    }
  }

  if (manifest.notes) {
    console.log(`\n  📝 ${manifest.notes}`)
  }

  console.log("")
}

function printAvailable(featuresDir: string, trackerPath: string) {
  const tracker: FeatureTracker = existsSync(trackerPath)
    ? JSON.parse(readFileSync(trackerPath, "utf-8"))
    : { features: {} }

  if (!existsSync(featuresDir)) {
    console.error("No features/ directory found.")
    return
  }

  const dirs = readdirSync(featuresDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const available = dirs.flatMap((dir) => {
    const p = join(featuresDir, dir, "feature.json")
    if (!existsSync(p)) return []
    const m: FeatureManifest = JSON.parse(readFileSync(p, "utf-8"))
    return [{ name: dir, description: m.description }]
  })

  if (available.length === 0) {
    console.error("No features available.")
    return
  }

  console.error("Available features:")
  for (const f of available) {
    const installed = tracker.features[f.name] ? " ✓ installed" : ""
    console.error(`  - ${f.name}: ${f.description}${installed}`)
  }
}
