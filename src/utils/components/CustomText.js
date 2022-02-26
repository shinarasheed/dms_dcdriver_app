import React from "react";
import { Text, StyleSheet } from "react-native";
import appTheme from "../../constants/theme";

export default function CustomText({ style, bold = false, ...props }) {
  return (
    <Text style={[styles.text, !!bold && styles.bold, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    // fontFamily: "sans-serif",
    color: appTheme.COLORS.black,
  },
  bold: {
    // fontFamily: "sans-serif",
  },
});
