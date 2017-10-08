/* eslint-env jest */

import shared from "./shared";

jest.mock("WebView", () => "WebView");

describe("Article test on ios", () => {
  shared();
});
