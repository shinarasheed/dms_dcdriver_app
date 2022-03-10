import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ActivityIndicator, Platform, View, Text } from "react-native";
import { LoginView } from "ad-b2c-react-native";
import * as SecureStore from "expo-secure-store";
import appTheme from "../../constants/theme";
import { register, clearErrors } from "../../redux/actions/userActions";

import Loading from "../../components/Loading";

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { isLoading, error } = userState;

  const onLogin = () => {
    dispatch(register(navigation));
  };

  const onFail = (reason) => {
    console.log("failed");
  };

  const spinner = () => {
    return (
      <ActivityIndicator
        color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
        animating={true}
        size="large"
      />
    );
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 10000);
    }
  }, [error]);

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      {error && (
        <View
          style={{
            alignItems: "center",
            backgroundColor: appTheme.COLORS.white,
            height: 100,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              fontFamily: "Gilroy-Medium",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {error}
          </Text>
        </View>
      )}
      <LoginView
        // appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
        // redirectURI="https://devdms2.b2clogin.com/oauth2/nativeclient"
        // tenant="devdms2"
        // loginPolicy="B2C_1_dms_mobile_signup_signin"
        appId="3eef02d6-eac1-4803-8cf8-3af748c9be16"
        redirectURI="https://dms20prod.b2clogin.com/oauth2/nativeclient"
        tenant="dms20prod"
        loginPolicy="B2C_1_dms_phone_signup_signin"
        secureStore={SecureStore}
        renderLoading={spinner}
        onSuccess={onLogin}
        onFail={onFail}
      />
    </View>
  );
};

export default Register;
