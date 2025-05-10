import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    extends: ['js/recommended'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript standard
      sourceType: 'module',
      parser: '@typescript-eslint/parser', // Use TypeScript's parser
    },
    plugins: {
      js,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': eslintPluginTypescript,
    },
    rules: {
      ...eslintPluginTypescript.configs.recommended.rules, // Rules from the TypeScript plugin
      'prettier/prettier': 'error', // Show Prettier issues as errors
    },
    linterOptions: {
      extends: [
        eslintConfigPrettier, // Disable ESLint rules that might conflict with Prettier
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);
