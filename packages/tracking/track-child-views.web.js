/* eslint-env browser */
import React, { Component } from "react";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

export default (
  WrappedComponent,
  {
    trackingName,
    actionName = "Rendered",
    childIdPropKey,
    getChildren = () => [],
    getAttrs = () => ({})
  } = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackChildView extends Component {
    constructor(props, context) {
      super(props, context);

      this.childData = {};
      this.viewed = new Set();

      this.observer = new window.IntersectionObserver(
        this.onObserved.bind(this),
        {
          root: null,
          rootMargin: "0px",
          threshold: 1.0
        }
      );
    }

    componentDidMount() {
      this.observeChildren();
    }

    componentDidUpdate() {
      this.observeChildren();
    }

    componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }

    onObserved(observed = []) {
      if (!this.context || !this.context.tracking) {
        return;
      }

      observed.forEach(({ intersectionRatio, isIntersecting, target }) => {
        if (
          isIntersecting &&
          intersectionRatio === 1 &&
          !this.viewed.has(target.id)
        ) {
          this.viewed.add(target.id);

          this.onChildView(target.id, this.childData[target.id]);
        }
      });
    }

    onChildView(id, childProps) {
      this.context.tracking.analytics({
        component: `${trackingName || componentName}Child`,
        action: actionName,
        attrs: {
          ...resolveAttrs(getAttrs, childProps)
        }
      });
    }

    observeChildren() {
      const childList = getChildren(this.props);

      childList.forEach((props, index) => {
        if (!this.childData[props[childIdPropKey]]) {
          this.observeChild({
            ...props,
            index,
            total: childList.length
          });
        }
      });
    }

    observeChild(props) {
      this.observer.observe(document.getElementById(props[childIdPropKey]));
      this.childData[props[childIdPropKey]] = props;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithTrackChildView.contextTypes = trackingContextTypes;
  WithTrackChildView.displayName = `WithTrackChildView(${componentName})`;
  WithTrackChildView.propTypes = WrappedComponent.propTypes;
  WithTrackChildView.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithTrackChildView, WrappedComponent);

  return WithTrackChildView;
};
