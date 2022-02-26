// import React from "react";
// import { connect } from "react-redux";
// import { LoginView } from "ad-b2c-react-native";
// import * as SecureStore from "expo-secure-store";
// import { SafeAreaView, ActivityIndicator, Text, View } from "react-native";
// import { register } from "../../redux/actions/userActions";
// import appTheme from "../../constants/theme";

// import Loading from "../../components/Loading";
// import Continue from "../Continue";
// import { WelcomeError } from "./WelcomeError";
// class Login extends React.PureComponent {
//   static navigationOptions = { header: null };

//   constructor(props) {
//     super(props);
//     this.onLogin = this.onLogin.bind(this);
//     this.onFail = this.onFail.bind(this);
//     this.spinner = this.spinner.bind(this);
//   }

//   onLogin = async () => {
//     const { navigation } = this.props;
//     this.props.register(navigation);
//   };
//   onFail = (reason) => {
//     console.log("failed");
//   };

//   spinner = () => {
//     return (
//       <ActivityIndicator
//         color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
//         animating={true}
//         size="large"
//       />
//     );
//   };

//   render() {
//     const { isLoading, error } = this.props.user;

//     if (isLoading) return <Loading />;

//     if (error)
//       return (
//         <SafeAreaView style={{ flex: 1 }}>
//           <LoginView
//             appId="b8018ff0-588d-4c84-960c-19ea3ee65ff3"
//             redirectURI="https://marytech22.b2clogin.com/oauth2/nativeclient"
//             tenant="marytech22"
//             loginPolicy="B2C_1_Email_Auth"
//             secureStore={SecureStore}
//             renderLoading={this.spinner}
//             onSuccess={this.onLogin}
//             onFail={this.onFail}
//           />
//         </SafeAreaView>
//       );

//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <LoginView
//           appId="b8018ff0-588d-4c84-960c-19ea3ee65ff3"
//           redirectURI="https://marytech22.b2clogin.com/oauth2/nativeclient"
//           tenant="marytech22"
//           loginPolicy="B2C_1_Email_Auth"
//           secureStore={SecureStore}
//           renderLoading={this.spinner}
//           onSuccess={this.onLogin}
//           onFail={this.onFail}
//         />
//       </SafeAreaView>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   user: state.user,
// });

// export default connect(mapStateToProps, { register })(Login);

import React from "react";
import { connect } from "react-redux";
import { LoginView } from "ad-b2c-react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView, ActivityIndicator, Text, View } from "react-native";
import { register } from "../../redux/actions/userActions";
import appTheme from "../../constants/theme";

import Loading from "../../components/Loading";
import Continue from "../Continue";
import { WelcomeError } from "./WelcomeError";
class Login extends React.PureComponent {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onFail = this.onFail.bind(this);
    this.spinner = this.spinner.bind(this);
  }

  onLogin = async () => {
    const { navigation } = this.props;
    this.props.register(navigation);
  };
  onFail = (reason) => {
    console.log("failed");
  };

  spinner = () => {
    return (
      <ActivityIndicator
        color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
        animating={true}
        size="large"
      />
    );
  };

  render() {
    const { isLoading, error } = this.props.user;

    if (isLoading) return <Loading />;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LoginView
          appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
          redirectURI="https://devdms2.b2clogin.com/oauth2/nativeclient"
          tenant="devdms2"
          loginPolicy="B2C_1_dms_mobile_signup_signin"
          secureStore={SecureStore}
          renderLoading={this.spinner}
          onSuccess={this.onLogin}
          onFail={this.onFail}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { register })(Login);
