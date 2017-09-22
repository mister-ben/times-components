import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import hoistNonReactStatic from "hoist-non-react-statics";
import resolveAttrs from "./resolve-attrs";
import getDisplayName from "./get-display-name";
import { trackingContextTypes } from "./base-tracking";
import { addTracking } from "./tracking";

const addTrackingContext = (
  WrappedComponent,
  { getAttrs = () => ({}), trackingName } = {}
) => {
  const componentName = getDisplayName(WrappedComponent, trackingName);

  class WithTrackingContext extends Component {
    getChildContext() {
      const self = this;

      return {
        tracking: {
          analytics(e) {
            const attrs = {
              ...resolveAttrs(getAttrs, self.props),
              ...e.attrs
            };

            if (self.isRootTrackingContext()) {
              attrs.eventDate = new Date().toISOString();
            }

            self.analyticsStream({
              object: e.object,
              action: e.action,
              ancestors: [componentName, ...(e.ancestors || [])],
              attrs
            });
          }
        }
      };
    }

    analyticsStream(...args) {
      const stream =
        _get(this.context, "tracking.analytics") || this.props.analyticsStream;
      return stream && stream(...args);
    }

    isRootTrackingContext() {
      return !this.context.tracking;
    }

    render() {
      const Wrapped = this.isRootTrackingContext()
        ? addTracking(WrappedComponent, {
            trackView: true,
            trackingName: "Page"
          })
        : WrappedComponent;

      return <Wrapped {...this.props} />;
    }
  }

  WithTrackingContext.displayName = `WithTrackingContext(${componentName})`;

  hoistNonReactStatic(WithTrackingContext, WrappedComponent);

  WithTrackingContext.contextTypes = trackingContextTypes;
  WithTrackingContext.childContextTypes = trackingContextTypes;
  WithTrackingContext.propTypes = {
    analyticsStream: PropTypes.func,
    ...WrappedComponent.propTypes
  };
  WithTrackingContext.defaultProps = WrappedComponent.defaultProps;

  return WithTrackingContext;
};

export default addTrackingContext;
