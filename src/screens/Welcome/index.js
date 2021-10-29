// import React from 'react';
// import {StyleSheet, SafeAreaView, Image, Text, View} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// import {images} from '../../constants';
// import appTheme from '../../constants/theme';
// import {Button} from 'react-native-elements';
// import AuthButton from '../../components/AuthButton';

// const Welcome = () => {
//   const navigator = useNavigation();
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: appTheme.COLORS.mainBackground,
//       }}>
//       <View>
//         <View style={{alignItems: 'center'}}>
//           <Image
//             resizeMode="center"
//             width={200}
//             height={100}
//             source={images.AbInBev}
//           />
//         </View>
//         <View style={{alignItems: 'center'}}>
//           <Text style={{fontSize: 17}}>
//             Welcome to AbInBev Distributor Central
//           </Text>
//           <Text style={{fontSize: 17}}>Click the button below to continue</Text>
//         </View>
//       </View>

//       <View style={{alignItems: 'center', flex: 1, marginTop: 20}}>
//         <AuthButton
//           title="Continue"
//           Onpress={() => navigator.navigate('HomeScreen')}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Welcome;

// const styles = StyleSheet.create({});

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

export default class Login extends React.PureComponent {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onFail = this.onFail.bind(this);
    this.spinner = this.spinner.bind(this);
  }

  onLogin() {
    console.log("here");
    const { navigation } = this.props;
    navigation.navigate("App");
  }

  onFail(reason) {
    Alert.alert(reason);
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LoginView
          appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
          redirectURI="msal8c11baca-fdbc-4b7f-b2cf-3a177588f37c://auth"
          tenant="75cd5d8e-6c8a-42e8-893f-f1f3f4282dcf"
          loginPolicy="B2C_1_SignUpSignIn"
          passwordResetPolicy="B2C_1_PasswordReset"
          profileEditPolicy="B2C_1_ProfileEdit"
          onSuccess={this.onLogin}
          onFail={this.onFail}
          secureStore={SecureStore}
          renderLoading={this.spinner}
          scope="openid offline_access myScope1 myScope2 ...." //optional, but see the notes above
        />
      </SafeAreaView>
    );
  }
}
