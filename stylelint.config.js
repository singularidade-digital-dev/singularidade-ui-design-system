export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/build/**', '**/dist/**', '**/node_modules/**'],
  rules: {
    'custom-property-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    'selector-class-pattern': null,
  },
};
