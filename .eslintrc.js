module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["tailwindcss", "simple-import-sort", "@typescript-eslint/eslint-plugin", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-array-constructor": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@next/next/no-img-element": "off",
  },
};
