import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Welcome,
  Login,
  HomeScreen,
  Continue,
  WelcomeError,
  LoginError,
  Logout,
  Close,
} from "../screens";
// import HomeTabs from "./HomeTabs";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  //change the initial route to login and test it
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Continue" component={Continue} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="WelcomeError" component={WelcomeError} />
      <Stack.Screen name="LoginError" component={LoginError} />
      <Stack.Screen name="Close" component={Close} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
