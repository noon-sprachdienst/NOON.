// ESLint: catches real bugs (undefined names, broken hook rules, empty catch blocks) rather
// than style. Run with `npm run lint`. Formatting is not enforced here.
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist/', 'node_modules/', '_unused-assets/', 'handover/', 'src/data/seoIndex.generated.js'] },
  js.configs.recommended,
  {
    rules: {
      // Rule 17 of AGENTS.md: no silent error handling.
      'no-empty': ['error', { allowEmptyCatch: false }],
      // Capitalised names are React components or constants used in JSX or exports.
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', caughtErrors: 'none' }],
    },
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}', 'api/**/*.js', '*.config.js'],
    languageOptions: { globals: globals.node },
  },
];
