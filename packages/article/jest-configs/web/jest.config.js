const path = require("path");

module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [path.join(__dirname, "../../tests/**/*.test.web.js")],
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  moduleFileExtensions: ["web.js", "js", "json"],
  setupTestFrameworkScriptFile: `${__dirname}/setup-web-mocks.js`,
  testEnvironment: "jsdom"
};
