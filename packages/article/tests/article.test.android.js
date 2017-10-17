/* eslint-env jest */

import shared from "./shared";
import { WebView } from "react-native";

jest.mock("WebView", () =>
   require('react-native/Libraries/Components/WebView/WebView.android.js')
);

describe("Article test on android", () => {
  shared();
});
