import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/*.tsx",
    "src/lib/*.ts",
    "src/hooks/*.ts",
  ],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
})
