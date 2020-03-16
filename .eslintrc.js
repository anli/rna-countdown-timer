module.exports = {
  root: true,
  env: {
    'react-native/react-native': true,
    'jest/globals': true,
  },
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
};
