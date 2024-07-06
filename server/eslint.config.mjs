import globals from 'globals';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals:
        globals.browser,
        process: 'readonly',
    },
  },
  { rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-undef': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-alert': 'error',
    'no-eval': 'error',
    'no-const-assign': 'error',
    'no-irregular-whitespace': 'error',
    'no-unreachable': 'error',
    'no-unsafe-negation': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'brace-style': ['error', '1tbs'],
    'comma-spacing': 'error',
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'object-curly-spacing': ['error', 'always'],
  } },
];