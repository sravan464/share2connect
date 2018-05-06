// Support custom rules

module.exports = {
  extends: ['eslint:recommended', 'plugin:flowtype/recommended', 'prettier'],
  env: {
    browser: true,
    es6: true,
    'webdriverio/wdio': true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['prettier', 'react', 'flowtype', 'webdriverio', 'rulesdir'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        bracketSpacing: false,
        printWidth: 120
      }
    ],
    'object-curly-spacing': [2, 'never'],
    'react/jsx-uses-vars': [2],
    'react/jsx-uses-react': [2],
    'no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '_',
        argsIgnorePattern: '_'
      }
    ],
    'linebreak-style': ['error', 'unix'],
    'spaced-comment': ['error', 'always'],
    'arrow-spacing': 'error',
    'space-infix-ops': ['error', {int32Hint: false}],
    'flowtype/require-valid-file-annotation': ['error', 'always', {annotationStyle: 'line'}],
    'flowtype/generic-spacing': 0,
    'no-var': ['error'],
    'prefer-const': ['error'],
    'no-eval': ['error'],
    'no-implied-eval': ['error'],
    'no-return-await': ['error'],
    'rulesdir/suggest-absolute-import': 1,
    'rulesdir/forbid-default-messages': 1
  }
};
