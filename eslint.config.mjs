import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Adding rule overrides here
  {
    rules: {
      // Disable rule for explicit `any` type usage
      "@typescript-eslint/no-explicit-any": "off", // Allow usage of `any` type
      
      // Disable rule for unused variables
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Allow unused variables with names starting with "_"
    },
  },
];

export default eslintConfig;
