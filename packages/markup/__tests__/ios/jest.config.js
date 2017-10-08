module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [`${__dirname}/**/*.test.js`],
  moduleFileExtensions: ["ios.js", "native.js", "js", "json"],
  setupTestFrameworkScriptFile: `${__dirname}/setupIosMocks.js`
};
