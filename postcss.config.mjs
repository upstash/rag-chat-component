/** @type {import("postcss-load-config").Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-prefix-selector": {
      prefix: ".ups-chat",
    },
  },
};

export default config;
