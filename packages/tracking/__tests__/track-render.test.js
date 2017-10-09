import { Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import { withTrackRender } from "../tracking";
import withTestContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";

describe("WithTrackRender", () => {
  const TestComponent = props => <Text>{props.someProp}</Text>;
  TestComponent.propTypes = { someProp: PropTypes.string };
  TestComponent.defaultProps = { someProp: "foo" };
  TestComponent.someStatic = { foo: "bar" };

  it("raises event on wrapped component first render", () => {
    const WithTrackingAndContext = withTestContext(
      withTrackRender(TestComponent)
    );
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith({
      action: "Rendered",
      attrs: {},
      component: "TestComponent"
    });
  });

  it("accepts component name override", () => {
    const WithTrackingAndContext = withTestContext(
      withTrackRender(TestComponent, { trackingName: "TrackedThing" })
    );
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({ component: "TrackedThing" })
    );
  });

  it("accepts action name override", () => {
    const WithTrackingAndContext = withTestContext(
      withTrackRender(TestComponent, { actionName: "Viewed" })
    );
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({ action: "Viewed" })
    );
  });

  it("applies tracking attrs", () => {
    const WithTrackingAndContext = withTestContext(
      withTrackRender(TestComponent, {
        getAttrs: props => ({ one: props.keyTwo, three: "four" })
      })
    );
    const reporter = jest.fn();

    renderer.create(
      <WithTrackingAndContext keyTwo="two" analyticsStream={reporter} />
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        attrs: expect.objectContaining({ one: "two", three: "four" })
      })
    );
  });

  sharedTrackingTests(withTrackRender);
});
