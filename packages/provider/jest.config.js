module.exports = {
  "preset": "react-native",
  "rootDir": "../..",
  "transformIgnorePatterns": [
    "node_modules/(?!@times-components)/"
  ],
  testMatch: [`${__dirname}/__tests__/**/*.test.js`],
  projects: [`${__dirname}/*/*/jest.config.js`]
};
