// import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import MainStack from "./src/navigation/MainStack";
import AuthNavigation from "./src/navigation/AuthNavigator";

const AppWrapper = () => {
  const userState = useSelector((state) => state.user);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { token } = userState;

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: "transparent",
    },
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      "Gilroy-Bold": require("./assets/fonts/Gilroy-ExtraBold.otf"),
      "Gilroy-Light": require("./assets/fonts/Gilroy-Light.otf"),
      "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) return <AppLoading />;

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
