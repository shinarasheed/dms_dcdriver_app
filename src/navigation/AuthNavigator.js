import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Welcome,
  Login,
  HomeScreen,
  Continue,
  WelcomeError,
  LoginError,
} from "../screens";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
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
    </Stack.Navigator>
  );
};

export default AuthNavigation;
