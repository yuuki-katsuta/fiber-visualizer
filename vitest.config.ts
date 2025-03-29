import path from "node:path";
import react from "@vitejs/plugin-react";

import { defineConfig as viteConfig } from "vite";

import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  viteConfig({
    plugins: [react()],
  }),
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      include: ["./**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      reporters: ["html", "junit", "default"],
      outputFile: {
        html: "./reports/vitest-report.html",
        junit: "./reports/vitest-report.xml",
      },
      testTimeout: 20000,
      coverage: {
        provider: "v8",
        reporter: ["cobertura", "lcov", "json", "html", "text", "text-summary"],
        reportsDirectory: "./coverage",
        reportOnFailure: true,
        watermarks: {
          lines: [50, 80],
          functions: [50, 80],
          branches: [50, 80],
          statements: [50, 80],
        },
        all: true,
        include: ["./**/*.{ts,tsx}"],
        exclude: ["./**/*.stories.{ts,tsx}", "./**/*.spec.{ts,tsx}"],
      },
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  }),
);
