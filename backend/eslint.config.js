import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
export default defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,ts}"],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            "@typescript-eslint/no-namespace": "off",
        },
    },
]);
//# sourceMappingURL=eslint.config.js.map