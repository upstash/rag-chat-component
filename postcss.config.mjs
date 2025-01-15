/** @type {import("postcss-load-config").Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-prefix-selector": {
      prefix: ".rcc",
    },
  },
};

export default config;
