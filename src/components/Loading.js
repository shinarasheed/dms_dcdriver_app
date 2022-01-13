import React from "react";
import { Text, View, Image } from "react-native";
import { images } from "../constants";
import appTheme from "../constants/theme";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Image
          source={images.AbInBev}
          style={{
            width: 300,
            resizeMode: "center",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            marginBottom: 20,
            color: appTheme.COLORS.textGray,
          }}
        >
          Welcome to ABInBev Distribution Central
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: appTheme.COLORS.mainRed,
          }}
        >
          Please wait...
        </Text>
      </View>
    </View>
  );
};

export default Loading;
