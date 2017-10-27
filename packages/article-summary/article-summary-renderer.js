import React from "react";
import { Text } from "react-native";

export default {
  paragraph(key, attributes, renderedChildren, indx) {
    const content = renderedChildren.length
      ? `${indx === 0 ? "" : " "}${renderedChildren}`
      : "";
    return <Text key={key}>{content}</Text>;
  },
  teaser(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}...</Text>;
  }
};
