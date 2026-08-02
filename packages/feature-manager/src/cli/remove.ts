import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

import { jsonRemove, removeFromRegion } from "../markers.js"
import type { FeatureManifest, FeatureTracker } from "../types.js"
import { normalizeManifest } from "./add.js"

function removeDeps(pkgPath: string, field: "dependencies" | "devDependencies", keys: string[]): void {
  if (!existsSync(pkgPath)) return
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as Record<string, unknown>
  const existing = pkg[field] as Record<string, string> | undefined
  if (!existing) return
  for (const key of keys) {
    delete existing[key]
  }
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  for (const key of keys) {
    console.log(`    - ${key}`)
  }
}

export function removeFeature(name: string | undefined) {
  const root = resolve(process.cwd())
  const featuresDir = join(root, "features")
  const trackerPath = join(root, "features.json")

  if (!name) {
    console.error("Usage: feature-manager remove <name>\n")
    process.exit(1)
  }

  const featureDir = join(featuresDir, name)
  const manifestPath = join(featureDir, "feature.json")

  if (!existsSync(manifestPath)) {
    console.error(`✗ No manifest for "${name}" in features/ — cannot guide removal.`)
    process.exit(1)
  }

  const manifest = normalizeManifest(JSON.parse(readFileSync(manifestPath, "utf-8")) as FeatureManifest)
  const tracker: FeatureTracker = JSON.parse(readFileSync(trackerPath, "utf-8"))

  if (!tracker.features[name]) {
    console.error(`✗ Feature "${name}" is not installed.`)
    process.exit(1)
  }

  // Refuse if another installed feature depends on this one.
  for (const other of Object.keys(tracker.features)) {
    if (other === name) continue
    const otherManifestPath = join(featuresDir, other, "feature.json")
    if (!existsSync(otherManifestPath)) continue
    const otherManifest = normalizeManifest(
      JSON.parse(readFileSync(otherManifestPath, "utf-8")) as FeatureManifest,
    )
    if (otherManifest.requires.includes(name)) {
      console.error(`✗ Cannot remove "${name}": installed feature "${other}" requires it.`)
      console.error(`  Remove "${other}" first: pnpm remove-feature ${other}`)
      process.exit(1)
    }
  }

  console.log(`\n🗑  Removing feature: ${manifest.name} (v${manifest.version})\n`)

  // 1. Remove inserted snippet blocks.
  if (manifest.insertions.length) {
    console.log("  Reverting insertions...")
    for (const ins of manifest.insertions) {
      const targetPath = join(root, ins.file)
      if (!existsSync(targetPath)) continue
      const updated = removeFromRegion(
        readFileSync(targetPath, "utf-8"),
        ins.marker,
        name,
        ins.file,
      )
      writeFileSync(targetPath, updated)
      console.log(`    ~ ${ins.file} [-${ins.marker}]`)
    }
  }

  // 2. Remove JSON array values.
  if (manifest.jsonAppends.length) {
    console.log("\n  Reverting JSON files...")
    for (const ja of manifest.jsonAppends) {
      const targetPath = join(root, ja.file)
      if (!existsSync(targetPath)) continue
      jsonRemove(targetPath, ja.path, ja.value)
      console.log(`    ~ ${ja.file} [-${ja.path}: ${ja.value}]`)
    }
  }

  // 3. Delete copied files.
  if (manifest.copies.length) {
    console.log("\n  Deleting files...")
    for (const { to } of manifest.copies) {
      const destPath = join(root, to)
      if (existsSync(destPath)) {
        rmSync(destPath, { recursive: true, force: true })
        console.log(`    - ${to}`)
      }
    }
  }

  // 4. Remove dependencies from each target package.
  const depTargets = Object.keys(manifest.dependencies)
  const devDepTargets = Object.keys(manifest.devDependencies)
  if (depTargets.length || devDepTargets.length) {
    console.log("\n  Removing dependencies...")
    for (const target of depTargets) {
      console.log(`  ${target}:`)
      removeDeps(join(root, target, "package.json"), "dependencies", Object.keys(manifest.dependencies[target]!))
    }
    for (const target of devDepTargets) {
      console.log(`  ${target}:`)
      removeDeps(join(root, target, "package.json"), "devDependencies", Object.keys(manifest.devDependencies[target]!))
    }
  }

  // 5. Update tracker.
  delete tracker.features[name]
  writeFileSync(trackerPath, `${JSON.stringify(tracker, null, 2)}\n`)

  console.log(`\n✅ Feature "${name}" removed.\n`)
  console.log("  Next steps:")
  console.log("    1. Run: pnpm install")
  if (manifest.postInstall.length) {
    console.log("    2. Revert any data/schema changes if no longer needed:")
    for (const cmd of manifest.postInstall) {
      console.log(`       ${cmd}`)
    }
  }
  console.log("")
}
