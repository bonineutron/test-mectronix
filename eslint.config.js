import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import js from '@eslint/js';

export default tseslint.config(
   { ignores: ['dist', 'node_modules'] },
   {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser
      },
      plugins: {
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh
      },
      rules: {
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
         '@typescript-eslint/no-explicit-any': 'error',
         '@typescript-eslint/no-unused-vars': 'error',
         'react-hooks/exhaustive-deps': 'off',
         'react-hooks/rules-of-hooks': 'off'
      }
   }
);
