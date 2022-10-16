module.exports = {
  addons: [
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        loadSassAfterPostCSS: true,
      },
    },
  ],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
