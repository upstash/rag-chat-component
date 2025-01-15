module.exports = {
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "all",
  singleAttributePerLine: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  tailwindFunctions: ["clsx"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
