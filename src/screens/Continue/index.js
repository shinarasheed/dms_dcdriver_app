import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View } from "react-native";

import { adService } from "ad-b2c-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import appTheme from "../../constants/theme";
import Routes from "../../navigation/Routes";

const Continue = () => {
  const navigation = useNavigation();
  const clearTokens = async () => {
    await adService.logoutAsync();
    await AsyncStorage.clear();
    navigation.navigate(Routes.WELCOME_SCREEN);
  };

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
          fontSize: 15,
        }}
      >
        Your Account has been successfully created.
      </Text>

      <Text
        style={{
          fontSize: 15,
        }}
      >
        Please wait while you are assigned a role
      </Text>

      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          backgroundColor: appTheme.COLORS.mainRed,
          marginTop: 20,
        }}
        onPress={() => clearTokens()}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 20,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Continue;
