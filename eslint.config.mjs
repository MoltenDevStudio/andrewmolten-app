import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  // Keep the source implementation's conventional PostCSS object export intact.
  {
    files: ["postcss.config.mjs"],
    rules: { "import/no-anonymous-default-export": "off" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "work/**",
    "assets/**",
  ]),
]);
