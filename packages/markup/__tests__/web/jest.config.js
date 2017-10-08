module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [`${__dirname}/**/*.test.js`],
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  moduleFileExtensions: ["web.js", "js", "json"],
  testEnvironment: "jsdom"
};
