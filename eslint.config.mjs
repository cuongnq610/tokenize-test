import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
// import reactJsxRuntime from "eslint-plugin-plugin:react/jsx-runtime";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
)), {
    plugins: {
        react: fixupPluginRules(react),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        // "plugin:react/jsx-runtime": reactJsxRuntime,
        "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
        parser: tsParser,
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
        "react/prop-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/jsx-one-expression-per-line": 0,
        "no-plusplus": "off",
        "no-bitwise": "off",
        "no-continue": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        }],

        "no-irregular-whitespace": "off",
        "no-underscore-dangle": "off",
        "arrow-body-style": "off",
        "no-console": "warn",

        "no-restricted-syntax": ["error", {
            selector: "TSEnumDeclaration",
            message: "Don't declare enums",
        }],

        "@typescript-eslint/no-extraneous-class": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        // "import/no-duplicates": "error",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-argument": "off",

        "simple-import-sort/imports": ["error", {
            groups: [
                ["^react$", "^react.*", "^next.*"],
                ["^@/components/.*"],
                ["^@/services/.*"],
                ["^@/constants/.*"],
                ["^@/types/.*"],
                ["^"],
                ["^\\./"],
                ["^\\u0000"],
                ["^.+\\.(module.css|module.scss)$"],
            ],
        }],
    },
}];