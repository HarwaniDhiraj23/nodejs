// eslint-disable-next-line no-undef
module.exports = {
  plugins: ["security"],
  extends: ["plugin:security/recommended"],
  rules: {
    // General ESLint Rules
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["warn"],
    "no-var": "error",
    "prefer-const": "warn",
    // TypeScript-specific rules
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/consistent-type-imports": "warn",
  },
};
