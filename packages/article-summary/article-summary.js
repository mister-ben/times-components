import React from "react";
import { Text, View, Platform } from "react-native";
import PropTypes from "prop-types";
import { renderTrees, treePropType } from "@times-components/markup";
import DatePublication from "@times-components/date-publication";
import renderer from "./article-summary-renderer";

const fontFamilyWebAndIos = "TimesDigitalW04";
const fontFamilyAndroid = "TimesDigitalW04-Regular";

const styles = {
  container: {},
  label: {
    color: "#333333",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 12,
    marginBottom: 2,
    letterSpacing: 1
  },
  headline: {
    color: "#333333",
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  },
  text: {
    color: "#696969",
    fontSize: 14,
    fontFamily:
      Platform.OS === "android" ? fontFamilyAndroid : fontFamilyWebAndIos,
    lineHeight: 20,
    marginBottom: 10,
    flexWrap: "wrap"
  }
};

const summarise = text => {
  let summary = [];
  if(text.length) {
    const content = text.slice(0, text.length - 1);
    const teaser = text[text.length - 1];
    if(teaser) teaser.name = "teaser";
    content.map(item => {
      if (!item.children.find(child => child.name == "break"))
        item.name = "sentence";
    });
    summary = [...content, teaser]
  }
  return summary;
};

const ArticleSummary = props => {
  const { label, headline, text, date, publication } = props;
  const summary = summarise(text);
  const labelText = label && label.toUpperCase && label.toUpperCase();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelText}</Text>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.text}>{renderTrees(summary, renderer)}</Text>
      <DatePublication date={date} publication={publication} />
    </View>
  );
};

ArticleSummary.propTypes = {
  label: PropTypes.string,
  headline: PropTypes.string,
  text: PropTypes.arrayOf(treePropType),
  date: PropTypes.instanceOf(Date),
  publication: PropTypes.string
};

ArticleSummary.defaultProps = {
  label: "",
  headline: "",
  text: [],
  date: null,
  publication: ""
};

export default ArticleSummary;
