import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@mui/material/utils": "@mui/material/node/utils/index.js",
      "@mui/icons-material/Menu": path.resolve(__dirname, "./src/test/stubs/EmptyIcon.tsx"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
