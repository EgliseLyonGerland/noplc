module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "tailwindcss"],
  rules: {
    "react-refresh/only-export-components": "warn",

    "tailwindcss/classnames-order": "error",
    "tailwindcss/enforces-negative-arbitrary-values": "error",
    "tailwindcss/enforces-shorthand": "error",
    "tailwindcss/no-arbitrary-value": "off",
    "tailwindcss/no-custom-classname": "error",
    "tailwindcss/no-contradicting-classname": "error",
  },
};
