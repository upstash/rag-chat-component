import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    define: {
      "process.env": env,
    },
    plugins: [react(), tsconfigPaths()],
  });
};
