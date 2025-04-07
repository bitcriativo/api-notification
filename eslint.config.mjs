// eslint.config.js
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  // Base JS + TS + Node config
  {
    files: ['**/*.{js,ts,mjs,cjs}'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
      parser: tseslint.parser, // Adiciona o parser para TS
    },
    plugins: {
      js,
      '@typescript-eslint': tseslint.plugin, // Registra o plugin
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // TypeScript: regras recomendadas SEM types
  ...tseslint.configs.recommended,

  // TypeScript: regras COM suporte a tipos
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]);
