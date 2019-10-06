process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
  root: true,
  extends: '@nuofe/eslint-config-vue',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  globals: {},
  settings: {
    'import/resolver': {
      webpack: {
        config: require('@nuofe/ndk-builder').default.getResolveConfig(),
      },
    },
  },
};
