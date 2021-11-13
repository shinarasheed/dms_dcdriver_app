import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import appTheme from "./src/constants/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import MainStack from "./src/navigation/MainStack";

export default function App() {
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
        <Provider store={store}>
          <NavigationContainer theme={theme}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={appTheme.COLORS.white}
            />
            <MainStack />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </>
  );
}
