import { readFileSync, writeFileSync } from "node:fs"
import { extname } from "node:path"

/**
 * Managed marker regions let features insert/remove snippets inside shared files
 * without overwriting them. A target file contains an empty region delimited by
 * sentinels:
 *
 *   // feature-manager:<marker>:begin
 *   // feature-manager:<marker>:end
 *
 * Installing a feature places its snippet inside that region, wrapped in its own
 * per-feature block so it can be removed cleanly later:
 *
 *   // feature-manager:<marker>:begin
 *   // feature-manager:<marker>:<feature>:begin
 *   ...snippet...
 *   // feature-manager:<marker>:<feature>:end
 *   // feature-manager:<marker>:end
 *
 * The comment syntax is chosen by file extension so the sentinels stay valid in
 * .ts/.tsx (`//`), .md (`<!-- -->`), and .mdx (`{/* *\/}`).
 */

type CommentStyle = "line" | "html" | "jsx"

const SENTINEL_PREFIX = "feature-manager"

function commentStyleFor(file: string): CommentStyle {
  const ext = extname(file).toLowerCase()
  if (ext === ".md") return "html"
  if (ext === ".mdx") return "jsx"
  return "line"
}

function wrapSentinel(sentinel: string, style: CommentStyle): string {
  switch (style) {
    case "html":
      return `<!-- ${sentinel} -->`
    case "jsx":
      return `{/* ${sentinel} */}`
    default:
      return `// ${sentinel}`
  }
}

const regionBegin = (marker: string) => `${SENTINEL_PREFIX}:${marker}:begin`
const regionEnd = (marker: string) => `${SENTINEL_PREFIX}:${marker}:end`
const blockBegin = (marker: string, feature: string) =>
  `${SENTINEL_PREFIX}:${marker}:${feature}:begin`
const blockEnd = (marker: string, feature: string) =>
  `${SENTINEL_PREFIX}:${marker}:${feature}:end`

function leadingWhitespace(line: string): string {
  return line.match(/^\s*/)?.[0] ?? ""
}

/**
 * Insert `snippet` into the `<marker>` region of `content`, wrapped in a
 * per-feature block. Idempotent: if the feature already has a block in the
 * region, its content is replaced.
 */
export function insertIntoRegion(
  content: string,
  marker: string,
  feature: string,
  snippet: string,
  file: string,
): string {
  const style = commentStyleFor(file)
  const lines = content.split("\n")

  const beginIdx = lines.findIndex((l) => l.includes(regionBegin(marker)))
  const endIdx = lines.findIndex((l) => l.includes(regionEnd(marker)))

  if (beginIdx === -1 || endIdx === -1 || endIdx < beginIdx) {
    throw new Error(
      `Marker region "${marker}" not found in ${file}.\n` +
        `  Expected sentinels: "${wrapSentinel(regionBegin(marker), style)}" ... "${wrapSentinel(regionEnd(marker), style)}"`,
    )
  }

  const indent = leadingWhitespace(lines[endIdx] ?? "")
  const openTag = indent + wrapSentinel(blockBegin(marker, feature), style)
  const closeTag = indent + wrapSentinel(blockEnd(marker, feature), style)
  const block = [openTag, ...snippet.split("\n"), closeTag]

  // Replace an existing block for this feature (idempotent reinstall).
  const existingBegin = lines.findIndex(
    (l, i) => i > beginIdx && i < endIdx && l.includes(blockBegin(marker, feature)),
  )
  if (existingBegin !== -1) {
    const existingEnd = lines.findIndex(
      (l, i) => i > existingBegin && l.includes(blockEnd(marker, feature)),
    )
    if (existingEnd !== -1) {
      lines.splice(existingBegin, existingEnd - existingBegin + 1, ...block)
      return lines.join("\n")
    }
  }

  // Otherwise insert a fresh block just before the region's end sentinel.
  lines.splice(endIdx, 0, ...block)
  return lines.join("\n")
}

/**
 * Remove the `<feature>` block from the `<marker>` region of `content`. The
 * region itself is left in place (empty). No-op if the block is absent.
 */
export function removeFromRegion(
  content: string,
  marker: string,
  feature: string,
  file: string,
): string {
  const lines = content.split("\n")

  const beginIdx = lines.findIndex((l) => l.includes(blockBegin(marker, feature)))
  if (beginIdx === -1) return content
  const endIdx = lines.findIndex(
    (l, i) => i > beginIdx && l.includes(blockEnd(marker, feature)),
  )
  if (endIdx === -1) return content

  lines.splice(beginIdx, endIdx - beginIdx + 1)
  return lines.join("\n")
}

function getAtPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>(
    (acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined),
    obj,
  )
}

/** Append `value` to the JSON array at `path` in `file` (deduped). */
export function jsonAppend(file: string, path: string, value: string): void {
  const data = JSON.parse(readFileSync(file, "utf-8")) as Record<string, unknown>
  const arr = getAtPath(data, path)
  if (!Array.isArray(arr)) {
    throw new Error(`JSON path "${path}" in ${file} is not an array.`)
  }
  if (!arr.includes(value)) arr.push(value)
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
}

/** Remove `value` from the JSON array at `path` in `file`. No-op if absent. */
export function jsonRemove(file: string, path: string, value: string): void {
  const data = JSON.parse(readFileSync(file, "utf-8")) as Record<string, unknown>
  const arr = getAtPath(data, path)
  if (!Array.isArray(arr)) return
  const idx = arr.indexOf(value)
  if (idx !== -1) arr.splice(idx, 1)
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
}
