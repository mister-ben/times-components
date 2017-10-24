import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const Gradient = ({ angle, children, style }) => (
  <View style={[styles.container, style]}>
    <LinearGradient
      start={{ x: 0, y: 1.0 }}
      end={{ x: 1.0, y: 1 - Math.sin(angle * Math.PI / 360) }}
      locations={[0, 1.0]}
      colors={["#ededed", "#f9f9f9"]}
      style={[styles.container]}
    >
      {children}
    </LinearGradient>
  </View>
);

Gradient.defaultProps = {
  angle: 265,
  children: null,
  style: null
};

Gradient.propTypes = {
  angle: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  style: ViewPropTypes.style
};

export default Gradient;