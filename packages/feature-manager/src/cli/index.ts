#!/usr/bin/env tsx

import { addFeature } from "./add.js"
import { listFeatures } from "./list.js"

const [command, ...args] = process.argv.slice(2)

switch (command) {
  case "add":
    addFeature(args[0])
    break
  case "list":
    listFeatures()
    break
  default:
    console.log(`
feature-manager — plugin system for celestia-starter

Usage:
  feature-manager add <name>    Install a feature from features/
  feature-manager list          List available and installed features
`)
    break
}
