import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { LoginView } from "ad-b2c-react-native";
import * as SecureStore from "expo-secure-store";
import appTheme from "../../constants/theme";
import Refresh from "../../components/Refresh";
import { adService } from "ad-b2c-react-native";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    this.onRefresh();
    // navigation.navigate("HomeScreen");
  }

  onFail(reason) {
    console.log("failed");
  }

  async onRefresh() {
    const { navigation } = this.props;

    // setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    const token = await adService.getIdToken();
    const { isValid } = await adService.getAccessTokenAsync();
    const decoded = jwt_decode(token);
    const email = decoded.emails[0];
    const {
      data: { data },
    } = await axios.get(
      `http://102.133.206.181/GetVehicle/GetByEmail/${email}`
    );
    console.log(data, "+++++++++++++++++++++++");

    await AsyncStorage.setItem("driverDetails", JSON.stringify(data));
    console.log(isValid);
    isValid ? navigation.navigate("HomeScreen") : null;
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* {1 ? <Refresh /> : null} */}
        <LoginView
          appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
          redirectURI="https://abi-distributorcentral.com/driver/redirect-driver"
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
      </SafeAreaView>
    );
  }
}
