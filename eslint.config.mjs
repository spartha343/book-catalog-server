import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-expressions': 'error',
      'no-undef': 'error',
      'no-console': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }]
    },
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    globals: {
      process: 'readonly'
    }
  },
  {
    ignores: ['.node_modules/*', '.env', 'dist']
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended
]
