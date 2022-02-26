import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ActivityIndicator, SafeAreaView, Platform } from "react-native";
import { LoginView } from "ad-b2c-react-native";
import * as SecureStore from "expo-secure-store";
import appTheme from "../../constants/theme";
import { register } from "../../redux/actions/userActions";

import Loading from "../../components/Loading";

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

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

  const { isLoading, error } = userState;

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginView
        appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
        redirectURI="https://devdms2.b2clogin.com/oauth2/nativeclient"
        tenant="devdms2"
        loginPolicy="B2C_1_dms_mobile_signup_signin"
        secureStore={SecureStore}
        renderLoading={spinner}
        onSuccess={onLogin}
        onFail={onFail}
      />
    </SafeAreaView>
  );
};

export default Register;
