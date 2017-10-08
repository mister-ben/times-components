module.exports = {
  "preset": "react-native",
  "rootDir": "../..",
  "transformIgnorePatterns": [
    "node_modules/(?!@times-components)/"
  ],
  testMatch: [`${__dirname}/__tosts__/**/*.test.js`],
  projects: [`${__dirname}/**/jest.config.js`]
};
