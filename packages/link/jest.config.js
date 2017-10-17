module.exports = {
  "preset": "react-native",
  "rootDir": "../..",
  "transformIgnorePatterns": [
    "node_modules/(?!@times-components)/"
  ],
  testMatch: [`${__dirname}/tests/**/*.test.js`],
  projects: [`${__dirname}/**/jest.config.js`]
};
