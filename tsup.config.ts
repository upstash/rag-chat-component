import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/client"],
    outDir: "dist/client",
    external: ["react", "next"],

    // 👇 important: cjs doesn't work well
    format: "esm",
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,

    // 👇 important: do not bundle
    bundle: false,
    minify: false,
  },
  {
    entry: ["src/server"],
    outDir: "dist/server",
    external: ["react", "next"],

    // 👇 important: cjs doesn't work well
    format: "esm",
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,

    // 👇 important: do not bundle
    bundle: false,
    minify: false,
  },
]);
