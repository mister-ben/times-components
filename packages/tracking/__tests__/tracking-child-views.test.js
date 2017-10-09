import { Text, FlatList } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import { withTrackChildViews } from "../tracking";
import withTestContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";

class ListComponent extends React.Component {
  static get propTypes() {
    return {
      onViewed: PropTypes.func.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          someKey: PropTypes.string,
          someValue: PropTypes.string
        })
      )
    };
  }
  static get defaultProps() {
    return { items: [{ someKey: "1", someValue: "one" }] };
  }
  static get someStatic() {
    return { foo: "bar" };
  }
  constructor(props, context) {
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
  }
  renderItem({ item }) {
    this.props.onViewed(item);
    return <Text>Item {item.someValue}</Text>;
  }
  render() {
    return (
      <FlatList
        data={this.props.items}
        renderItem={this.renderItem}
        keyExtractor={({ someKey }) => someKey}
      />
    );
  }
}

describe("WithTrackChildViews", () => {
  it("tracks child views", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items
      }),
      { trackingObject: "TestObject" }
    );

    renderer.create(
      <ListWithChildTracking
        analyticsStream={reporter}
        onViewed={() => {}}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" },
          { someKey: "3", someValue: "three" }
        ]}
      />
    );

    expect(reporter.mock.calls).toMatchSnapshot();
  });

  it("accepts component name override", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items,
        trackingName: "SomeItem"
      })
    );

    renderer.create(
      <ListWithChildTracking
        onViewed={() => {}}
        analyticsStream={reporter}
        items={[{ someKey: "1", someValue: "one" }]}
      />
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        component: "SomeItemChild"
      })
    );
  });

  it("accepts action name override", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items,
        actionName: "Scrolled"
      })
    );

    renderer.create(
      <ListWithChildTracking
        onViewed={() => {}}
        analyticsStream={reporter}
        items={[{ someKey: "1", someValue: "one" }]}
      />
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "Scrolled"
      })
    );
  });

  it("applies tracking attrs", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items,
        getAttrs: props => ({
          id: props.someKey,
          index: props.index,
          total: props.total
        })
      })
    );

    renderer.create(
      <ListWithChildTracking
        onViewed={() => {}}
        analyticsStream={reporter}
        items={[{ someKey: "1", someValue: "one" }]}
      />
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        attrs: expect.objectContaining({ id: "1", index: 0, total: 1 })
      })
    );
  });

  it("can track scroll events", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        actionName: "Scrolled",
        getChildren: props => props.items,
        getAttrs: props => ({ depth: (props.index + 1) / props.total * 100 })
      })
    );

    renderer.create(
      <ListWithChildTracking
        onViewed={() => {}}
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" }
        ]}
      />
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "Scrolled",
        attrs: expect.objectContaining({ depth: 50 })
      })
    );
  });

  sharedTrackingTests(withTrackChildViews);
});
