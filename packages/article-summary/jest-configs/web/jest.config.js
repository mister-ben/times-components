const path = require("path");

module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [path.join(__dirname, "../../__tests__/**/*.test.web.js")],
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  moduleFileExtensions: ["web.js", "js", "json"],
  testEnvironment: "jsdom"
};
