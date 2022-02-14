import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Routes from "../../navigation/Routes";

import { adService } from "ad-b2c-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import appTheme from "../../constants/theme";

export const WelcomeError = () => {
  const navigation = useNavigation();

  const clearTokens = async () => {
    navigation.navigate(Routes.LOGIN_SCREEN);
    console.log("welcomeError");
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
        Your Account already exist
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
          Continue Welcome
        </Text>
      </TouchableOpacity>
    </View>
  );
};
