/* eslint-env jest */

import shared from "./shared";

jest.mock("WebView", () =>
   require('react-native/Libraries/Components/WebView/WebView.ios.js')
);

describe("Article test on ios", () => {
  shared();
});
