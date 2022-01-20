// import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import MainStack from "./src/navigation/MainStack";
import AuthNavigation from "./src/navigation/AuthNavigator";

const AppWrapper = () => {
  const userState = useSelector((state) => state.user);

  const { token } = userState;

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: "transparent",
    },
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          {token ? <MainStack /> : <AuthNavigation />}
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
