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
    treeshake: true,
    injectStyle: true,

  },
  {
    entry: ["src/client/styles.css"],
    outDir: "dist/client",
    format: "esm",
    splitting: false,
    sourcemap: false,
    clean: false, // Set to false to not clean previous build
    dts: false,  // No need for .d.ts for CSS
    bundle: true,
    minify: false,
    treeshake: false,
    loader: { '.css': 'copy' },
    outExtension: () => ({ js: '.css' }) // This will keep the .css extension
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
