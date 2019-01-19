module.exports = {
  env: {
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': 'error',
    eqeqeq: 'error',
    'no-console': 'off',
    yoda: 'error',
  },
};
