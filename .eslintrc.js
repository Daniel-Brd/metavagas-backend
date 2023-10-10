module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'chai-friendly', 'no-only-tests'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-only-tests/no-only-tests': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    'testing-library/no-render-in-setup': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: ['error', 'always'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        bracketSpacing: true,
      },
    ],
  },
};