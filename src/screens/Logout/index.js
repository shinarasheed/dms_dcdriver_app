import React from "react";
import { View, Text } from "react-native";
import { Alert, ActivityIndicator } from "react-native";
import { LogoutView } from "ad-b2c-react-native";
import appTheme from "../../constants/theme";

export default class Logout extends React.PureComponent {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFail = this.onFail.bind(this);
    this.spinner = this.spinner.bind(this);
  }

  onSuccess() {
    const { navigation } = this.props;
  }

  onFail(reason) {
    Alert.alert(reason);
  }

  spinner() {
    return (
      <ActivityIndicator
        color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
        animating={false}
        size="large"
      />
    );
  }

  render() {
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
}
