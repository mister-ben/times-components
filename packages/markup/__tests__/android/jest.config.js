module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [`${__dirname}/**/*.test.js`],
  moduleFileExtensions: ["android.js", "native.js", "js", "json"],
  setupTestFrameworkScriptFile: `${__dirname}/setupAndroidMocks.js`
};
