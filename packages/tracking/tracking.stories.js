import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Platform,
  FlatList
} from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import {
  withTrackRender,
  withTrackingContext,
  withTrackEvents,
  withTrackChildViews
} from "./tracking";

const storybookReporter = action("analytics-event");

const styles = StyleSheet.create({
  box: {
    borderWidth: 0,
    borderColor: "black",
    borderStyle: "solid",
    height: 200,
    width: 200,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
const Box = props => (
  <View id={props.id} style={[styles.box, { backgroundColor: props.color }]}>
    {props.children}
  </View>
);
Box.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element,
  color: PropTypes.string.isRequired
};
Box.defaultProps = { children: null };

const BoxWithButtons = props => (
  <View style={[styles.box, { backgroundColor: props.color }]}>
    <Button onPress={() => props.onPress("button 1")} title="Press me" />
    <Button
      color="limegreen"
      onPress={() => props.onPress("button 2")}
      title="Or me"
    />
  </View>
);
BoxWithButtons.propTypes = {
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

class Boxes extends React.Component {
  static get propTypes() {
    return {
      onViewed: PropTypes.func.isRequired,
      boxes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired
        })
      ).isRequired
    };
  }
  constructor(props, context) {
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
  }
  renderItem({ item }) {
    this.props.onViewed(item);
    return (
      <Box key={item.id} {...item}>
        <Text style={{ color: "white" }}>{item.id}</Text>
      </Box>
    );
  }
  render() {
    return Platform.OS === "web" ? (
      <View>{this.props.boxes.map(box => this.renderItem({ item: box }))}</View>
    ) : (
      <FlatList
        data={this.props.boxes}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}

storiesOf("Tracking", module)
  .add("Render tracking", () => {
    const BoxWithTrackingContext = withTrackingContext(
      withTrackRender(Box, {
        trackingName: "ColoredBox",
        getAttrs: props => ({ color: props.color })
      }),
      { trackingObject: "Story" }
    );

    return (
      <BoxWithTrackingContext
        id="1"
        analyticsStream={storybookReporter}
        color="red"
      />
    );
  })
  .add("Event tracking", () => {
    const BoxWithPressTrackingContext = withTrackingContext(
      withTrackEvents(BoxWithButtons, {
        analyticsEvents: [
          {
            eventName: "onPress",
            actionName: "Pressed",
            trackingName: "ColoredBox",
            getAttrs: (props, eventArgs) => ({ button: eventArgs[0] })
          }
        ]
      }),
      { trackingObject: "Story" }
    );

    return (
      <BoxWithPressTrackingContext
        analyticsStream={storybookReporter}
        color="red"
        onPress={() => {}}
      />
    );
  })
  .add("Child view tracking", () => {
    const boxes = [...Array(50).keys()].map(i => ({
      id: `box-${i + 1}`,
      color: i % 2 === 0 ? "green" : "blue"
    }));
    const BoxesWithTrackingContext = withTrackingContext(
      withTrackChildViews(Boxes, {
        childIdPropKey: "id",
        getChildren: props => props.boxes,
        getAttrs: ({ id, index }) => ({ id, index })
      }),
      { trackingObject: "Story" }
    );
    return (
      <BoxesWithTrackingContext
        onViewed={() => {}}
        boxes={boxes}
        analyticsStream={storybookReporter}
      />
    );
  })
  .add("Scroll depth tracking", () => {
    const boxes = [...Array(50).keys()].map(i => ({
      id: `box-${i + 1}`,
      color: i % 2 === 0 ? "green" : "blue"
    }));
    const BoxesWithTrackingContext = withTrackingContext(
      withTrackChildViews(Boxes, {
        childIdPropKey: "id",
        actionName: "Scrolled",
        getChildren: props => props.boxes,
        getAttrs: props => ({
          scrollDepth: Math.round((props.index + 1) / props.total * 100, 2)
        })
      }),
      { trackingObject: "Story" }
    );
    return (
      <BoxesWithTrackingContext
        onViewed={() => {}}
        boxes={boxes}
        analyticsStream={storybookReporter}
      />
    );
  });
