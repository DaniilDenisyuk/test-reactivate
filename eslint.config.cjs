/* eslint-disable */
const js = require('@eslint/js')
const eslintConfigPrettier = require('eslint-config-prettier/flat')
const {
  createTypeScriptImportResolver
} = require('eslint-import-resolver-typescript')
const eslintPluginImportX = require('eslint-plugin-import-x')
const reactPlugin = require('eslint-plugin-react')
const tseslint = require('typescript-eslint')
const globals = require('globals')

module.exports = tseslint.config([
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  eslintConfigPrettier,
  {
    files: ['src/**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver()],
      react: {
        version: 'detect'
      }
    },
    ignores: ['dist', '.yarn'],
    rules: {
      'import-x/no-unresolved': 'off'
    }
  }
])
