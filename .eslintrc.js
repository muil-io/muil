const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base', 'prettier', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
  rules: {
    radix: 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [
          __dirname,
          path.join(__dirname, '/apps/api'),
          path.join(__dirname, '/apps/client'),
          path.join(__dirname, '/apps/devops'),
          path.join(__dirname, '/libs/cloud-storage'),
          path.join(__dirname, '/libs/templates-renderer'),
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        pathGroups: [
          { pattern: 'react', group: 'builtin', position: 'before' },
          { pattern: 'react-dom', group: 'builtin', position: 'before' },
          { pattern: 'styled-components', group: 'builtin', position: 'before' },
          { pattern: '@muil/**', group: 'external', position: 'after' },
          { pattern: 'shared/**', group: 'external', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-dom', 'styled-components'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
  },
};
