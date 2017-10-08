const path = require("path");

module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [path.join(__dirname, "../../__tests__/**/*.test.ios.js")],
  moduleFileExtensions: ["ios.js", "native.js", "js", "json"],
  setupTestFrameworkScriptFile: `${__dirname}/setup-ios-mocks.js`
};
