module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/typescript",
  ],

  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/interface-name-prefix": [
      "off",
      {
        prefixWithI: "always",
      },
    ],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-fallthrough": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",

  },

};
