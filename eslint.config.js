import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import lit from 'eslint-plugin-lit';
import wc from 'eslint-plugin-wc';
import globals from 'globals';

export default [
  globalIgnores(['src/generated/**']),
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    plugins: {
      lit,
      wc,
    },
    rules: {
      ...lit.configs.recommended.rules,
      ...wc.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
];