import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  clean: true,
  format: ["esm", "cjs"],
  dts: false,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  minify: false,
  bundle: true,
  platform: "node",
  target: "node18",
});
