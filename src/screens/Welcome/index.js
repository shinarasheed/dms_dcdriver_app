import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  Platform,
  Alert,
} from "react-native";
import { LoginView } from "ad-b2c-react-native";
import * as SecureStore from "expo-secure-store";
import appTheme from "../../constants/theme";
import AuthButton from "../../components/AuthButton";
import { adService } from "ad-b2c-react-native";

export default class Login extends React.PureComponent {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onFail = this.onFail.bind(this);
    this.spinner = this.spinner.bind(this);
  }

  onLogin() {
    const { navigation } = this.props;
    navigation.navigate("Home");
  }

  onFail(reason) {
    console.log(reason);
  }

  spinner() {
    return (
      <ActivityIndicator
        color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
        animating={true}
        size="large"
      />
    );
  }

  getToken = async () => {
    const token = await adService.getIdToken();
    const tokenResult = await adService.getAccessTokenAsync();

    console.log(token, "============================");
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LoginView
          appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
          redirectURI="https://abi-distributorcentral.com/"
          tenant="devdms2"
          loginPolicy="B2C_1_dms_signup_signin"
          passwordResetPolicy="B2C_1_PasswordReset"
          profileEditPolicy="B2C_1_ProfileEdit"
          onSuccess={this.onLogin}
          onFail={this.onFail}
          secureStore={SecureStore}
          renderLoading={this.spinner}
          scope="8c11baca-fdbc-4b7f-b2cf-3a177588f37c offline_access"
        />

        {/* <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <AuthButton
            title="Click to Continue"
            Onpress={() => this.getToken()}
          />
        </View> */}
      </SafeAreaView>
    );
  }
}
