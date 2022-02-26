import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
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
import { logOut } from "../../redux/actions/userActions";

export const WelcomeError = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const clearTokens = async () => {
    await adService.logoutAsync();
    // await AsyncStorage.clear();
    // navigation.navigate(Routes.CONTINUE_SCREEN);
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
        This Account already exist
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
            fontSize: 15,
          }}
        >
          Signup with another Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};
