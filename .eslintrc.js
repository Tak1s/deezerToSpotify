module.exports = {
  'parser': 'babel-eslint',
  'plugins': [
    'babel'
  ],
  'extends': [
    'eslint-config-airbnb-base',
    'eslint-config-airbnb/rules/react',
    'eslint-config-airbnb/rules/react-hooks'
  ],
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'globals': {
    'ENV': 'readable'
  },
  'rules': {
    'no-shadow': [
      0
    ],
    'no-case-declarations': [
      0
    ],
    'no-use-before-define': [
      0
    ],
    'no-bitwise': [
      0
    ],
    'comma-dangle': [
      1,
      'never'
    ],
    'radix': [
      2,
      'as-needed'
    ],
    'template-curly-spacing': [
      1,
      'always'
    ],
    'react/jsx-no-target-blank': [
      0
    ],
    'react/jsx-curly-spacing': [
      1,
      'always'
    ],
    'react/jsx-one-expression-per-line': [
      0
    ],
    'react/require-default-props': [
      0
    ],
    'react/no-danger': [
      0
    ],
    'react/destructuring-assignment': [
      0
    ],
    'react/forbid-prop-types': [
      0
    ],
    'react/jsx-props-no-spreading': [
      0
    ],
    'react/no-unescaped-entities': [
      0
    ],
    'react/no-deprecated': [
      0
    ],
    'react-hooks/exhaustive-deps': [
      0
    ],
    'import/prefer-default-export': [
      0
    ],
    'import/no-unresolved': [
      0
    ],
    'import/extensions': [
      0
    ],
    'import/no-named-as-default': [
      0
    ],
    'space-before-function-paren': [
      0
    ],
    'prefer-const': [
      0
    ],
    'operator-linebreak': [
      0
    ],
    'no-plusplus': [
      0
    ],
    'no-underscore-dangle': [
      0
    ],
    'no-throw-literal': [
      0
    ],
    'no-param-reassign': [
      0
    ],
    'class-methods-use-this': [
      0
    ],
    'object-curly-newline': [
      0
    ],
    'no-unused-expressions': [
      0
    ],
    'babel/no-unused-expressions': [
      0, // TODO temporary FIN-8633
      { 'allowShortCircuit': true, 'allowTernary': true }
    ],
    'max-len': [1, 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }]
  }
};
