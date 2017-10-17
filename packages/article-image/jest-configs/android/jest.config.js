const path = require("path");

module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [path.join(__dirname, "../../tests/**/*.test.android.js")],
  moduleFileExtensions: ["android.js", "native.js", "js", "json"],
  setupTestFrameworkScriptFile: `${__dirname}/setup-android-mocks.js`
};
