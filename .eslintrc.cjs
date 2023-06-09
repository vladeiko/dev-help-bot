module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
  ],
  env: {
    jest: true,
    node: true,
  },
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'function' },
    ],
    'max-len': [
      'error',
      180,
      {
        ignoreUrls: true,
        ignoreTemplateLiterals: false,
        ignoreStrings: false,
      },
    ],
    'no-nested-ternary': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    camelcase: ['error', { allow: ['node_ids', 'node_id', 'user_name'] }],
    'import/no-unresolved': 'off',
    curly: 'error',
    'no-param-reassign': 'error',
    'no-shadow': 'off',
    'default-param-last': 'error',
    'consistent-return': 'error',
  },
  overrides: [
    {
      files: ['src/**/*'],
      excludedFiles: [
        'src/**/*.fixture.tsx',
        'src/**/*.fixture.mobile.tsx',
        'src/cosmos*',
        'src/**/*.spec.tsx',
        'src/**/*.spec.ts',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        complexity: ['error', 7],
        'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
        'max-depth': ['error', 3],
        'max-params': ['error', 3],
        'max-statements-per-line': ['error', { max: 1 }],
        'max-nested-callbacks': ['error', 3],
        'max-lines-per-function': ['error', { max: 70, skipComments: true, skipBlankLines: true }],
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unsafe-argument': 'error',
      },
    },
  ],
};
