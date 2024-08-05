/* eslint-env node */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: '2021', // Allows for the parsing of modern ECMAScript features
  },
  extends: [
    '@sientech/frontend/lib/vue3-essential',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    "parser":"babel-eslint",
  },
}
