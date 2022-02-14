import React from "react";
import { View, Text } from "react-native";
import appTheme from "../../constants/theme";

export default function Close() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: appTheme.COLORS.mainRed,
          fontSize: 15,
          fontFamily: "Gilroy-Medium",
          textAlign: "center",
        }}
      >
        Kindly close the Application and Signup Again
      </Text>
    </View>
  );
}
