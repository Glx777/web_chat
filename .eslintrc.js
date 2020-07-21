module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: "16.13.1",
    },
  },
  globals: {},
  plugins: [
    "@typescript-eslint",
    "prettier",
    "react",
    "jest",
    "filenames",
    "promise",
    "security",
    "no-secrets",
    "unicorn",
    "sql",
    "optimize-regex",
    "react-hooks",
    "lodash",
  ],
  extends: [
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:promise/recommended",
    "plugin:security/recommended",
    "plugin:unicorn/recommended",
    "plugin:lodash/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: "./",
    jsx: true,
    useJSXTextNode: true,
  },
  overrides: [
    {
      files: ["*.spec.ts"],
      env: {
        "jest/globals": true,
      },
    },
  ],
  rules: {
    // general
    "max-lines": ["error", 500],
    "no-console": "error",
    "no-dupe-keys": "error",
    "object-shorthand": "error",
    "no-undef": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_+" }],
    "no-use-before-define": "error",
    "no-warning-comments": [
      "error",
      {
        terms: ["no commit"],
        location: "anywhere",
      },
    ],
    curly: "error",
    "no-unneeded-ternary": "error",
    "no-nested-ternary": "error",

    // async
    "no-restricted-syntax": [
      "error",
      {
        selector: "FunctionDeclaration[async=false][id.name=/Async$/]",
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector: "FunctionDeclaration[async=true][id.name!=/Async$/]",
        message: "Async function name must end in 'Async'",
      },
      {
        selector: "MethodDefinition[value.async=false][key.name=/Async$/]",
        message: "Method ending in 'Async' must be declared async",
      },
      {
        selector: "MethodDefinition[value.async=true][key.name!=/Async$/]",
        message: "Async method name must end in 'Async'",
      },
      {
        selector:
          "Property[value.type=/FunctionExpression$/][value.async=false][key.name=/Async$/]",
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector:
          "Property[value.type=/FunctionExpression$/][value.async=true][key.name!=/Async$/]",
        message: "Async function name must end in 'Async'",
      },
      {
        selector:
          "VariableDeclarator[init.type=/FunctionExpression$/][init.async=false][id.name=/Async$/]",
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector:
          "VariableDeclarator[init.type=/FunctionExpression$/][init.async=true][id.name!=/Async$/]",
        message: "Async function name must end in 'Async'",
      },
    ],

    // filenames
    "filenames/match-regex": ["error", "^[a-z0-9.-]+$", false],
    "filenames/match-exported": "off",
    "filenames/no-index": "error",

    // ts
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_+" },
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      { accessibility: "no-public" },
    ],
    "@typescript-eslint/no-parameter-properties": "off",

    // react
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/boolean-prop-naming": "warn",
    "react/default-props-match-prop-types": "warn",
    "react/no-unused-prop-types": "warn",
    "react/react-in-jsx-scope": "warn",
    "react/require-default-props": "off",
    "react/self-closing-comp": "warn",
    "react/sort-comp": "warn",

    // prettier
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: false,
        semi: false,
        arrowParens: "always",
      },
    ],

    // promise
    "promise/prefer-await-to-then": "error",
    "promise/prefer-await-to-callbacks": "error",

    // no-secrets
    "no-secrets/no-secrets": "error",

    // sql
    "sql/format": [
      "error",
      {
        ignoreExpressions: false,
        ignoreInline: true,
        ignoreTagless: true,
      },
    ],
    "sql/no-unsafe-query": [
      "error",
      {
        allowLiteral: false,
      },
    ],

    // regex
    "optimize-regex/optimize-regex": "warn",

    // react-hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // lodash
    "lodash/prefer-lodash-method": "off",

    // unicorn
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          props: false,
          ctx: false,
        },
      },
    ],
  },
}
