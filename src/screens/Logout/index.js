import React from "react";
import { View, Text } from "react-native";
import appTheme from "../../constants/theme";

export default function Logout() {
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
          fontSize: 19,
          color: appTheme.COLORS.mainRed,
          marginBottom: 5,
        }}
      >
        User Logged Out Successfully.
      </Text>
      <Text style={{ color: appTheme.COLORS.MainGray, fontSize: 15 }}>
        Kindly close the Application
      </Text>
    </View>
  );
}
