// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { View } from "react-native";

const BarSpacingDecorator = storyFn => (
  <View style={{ marginTop: 20 }}>{storyFn()}</View>
);

export default BarSpacingDecorator;
