import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import BottomTabNavigator from "./src/navigation/BottomTab";
import appTheme from "./src/constants/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: "transparent",
    },
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer theme={theme}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={appTheme.COLORS.white}
          />
          <BottomTabNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
