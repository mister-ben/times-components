module.exports = {
  "preset": "react-native",
  "rootDir": "../../",
  "transformIgnorePatterns": [
    "node_modules/(?!@times-components)/"
  ],
  testPathIgnorePatterns: ["/node_modules/", "/__tests__/android/", "/__tests__/ios/", "/__tests__/web/"],
  testMatch: [`${__dirname}/__tests__/**/*.test.js`],
  projects: [`${__dirname}/**/jest.config.js`]
};
