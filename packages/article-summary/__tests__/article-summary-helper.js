/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import articleFixture from "../fixtures/article.json";
import emptyParagraphFixture from "../fixtures/article-empty-paragraph.json";
import reviewFixture from "../fixtures/review.json";
import blankFixture from "../fixtures/blank.json";

export default ArticleSummary => {
  it("renders an article-summary component with content", () => {
    articleFixture.date = new Date("2017-07-01T14:32:00.000Z");
    const tree = renderer
      .create(<ArticleSummary {...articleFixture} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with content including line breaks", () => {
    reviewFixture.date = new Date("2017-07-01T14:32:00.000Z");
    const tree = renderer
      .create(<ArticleSummary {...reviewFixture} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with headline and no content", () => {
    blankFixture.date = new Date("2017-07-01T14:32:00.000Z");
    const tree = renderer.create(<ArticleSummary {...blankFixture} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with empty content at the end trimmed", () => {
    emptyParagraphFixture.date = new Date("2017-07-01T14:32:00.000Z");
    const tree = renderer
      .create(<ArticleSummary {...emptyParagraphFixture} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};
