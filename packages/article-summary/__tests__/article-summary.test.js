/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleSummary from "../article-summary";
import articleFixture from "../fixtures/article.json";
import reviewFixture from "../fixtures/review";
import blankFixture from "../fixtures/blank";

it("renders an article-summary component with content", () => {
  articleFixture.date = new Date("2017-07-01T14:32:00.000Z");
  const tree = renderer.create(<ArticleSummary {...articleFixture} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an article-summary component with content including line breaks", () => {
  reviewFixture.date = new Date("2017-07-01T14:32:00.000Z");
  const tree = renderer.create(<ArticleSummary {...reviewFixture} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an article-summary component with headline and no content", () => {
  reviewFixture.date = new Date("2017-07-01T14:32:00.000Z");
  const tree = renderer.create(<ArticleSummary {...blankFixture} />).toJSON();
  expect(tree).toMatchSnapshot();
});
