import React from "react";
import { ActivityIndicator } from "react-native";
import appTheme from "../constants/theme";

export const Spinner = () => {
  return (
    <ActivityIndicator
      color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
      animating={true}
      size="large"
    />
  );
};
