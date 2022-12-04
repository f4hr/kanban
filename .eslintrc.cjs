module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'react-app',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'tsdoc/syntax': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'src/**/*.{spec,test}.{ts,tsx,js,jsx}',
          'src/mocks/**/*.ts',
          'src/setupTests.ts',
          'src/testHelpers.tsx',
          './vite.config.ts',
          './tailwind.config.cjs',
        ],
      },
    ],
    'react/function-component-definition': [
      2,
      {
        unnamedComponents: 'arrow-function',
      },
    ],
  },
};
