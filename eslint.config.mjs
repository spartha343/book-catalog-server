import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: {
        browser: true, // Adjust based on your environment
        node: true // Adjust based on your environment
        // Add other global variables as needed
      }
    }
  },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }]
    }
  },
  {
    ignores: ['.node_modules/*', 'dist/**']
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
