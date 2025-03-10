import { ESLint } from '@eslint/js'
import { readFileSync } from 'fs'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: ['eslint:recommended', ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    parserOptions: {
      project: readFileSync('./tsconfig.json'), // Asegúrate de leer tu tsconfig
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
