// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalRules = require("../../.eslintrc.js")

module.exports = {
  ...globalRules,

  rules: {
    ...globalRules.rules,
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "case",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "default",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "block-like",
      },
    ],
  },

  globals: {
    __DEV__: true,
  },

  env: {
    ...globalRules.env,
    browser: true,
  },
}
