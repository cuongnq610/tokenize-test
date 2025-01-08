import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    server: {
      port: Number(env.PORT ?? 3000),
    },
  };
});
