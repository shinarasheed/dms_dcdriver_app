import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import Routes from "../../navigation/Routes";

import { adService } from "ad-b2c-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import appTheme from "../../constants/theme";

export const LoginError = () => {
  const navigation = useNavigation();
  const [refreshPage, setRefreshPage] = useState("");

  const clearTokens = async () => {
    // await adService.logoutAsync();
    // await AsyncStorage.clear();
    navigation.navigate(Routes.WELCOME_SCREEN);
    console.log("loginError");
    Alert.alert(
      "End of News",
      "You have read all latest news for today ",
      [
        {
          text: "Refresh Page",
          onPress: () => {
            setRefreshPage("refresh");
          },
        },
      ],
      { cancelable: false }
    );
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
          fontFamily: "Gilroy-Medium",
          textAlign: "center",
        }}
      >
        Your Phone Number/Email already exist in the database
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
