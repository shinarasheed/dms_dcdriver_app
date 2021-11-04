import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import appTheme from "./src/constants/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import HomeTabs from "./src/navigation/HomeTabs";
import {
  AddCustomer,
  CustomerDetails,
  DeliveryDetails,
  GenerateInvoice,
  OneOfSale,
  SalesInvoice,
  SellToCustomer,
  VanInvoice,
  Notifications,
  Welcome,
  Logout,
} from "./src/screens";

const Stack = createNativeStackNavigator();

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
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Logout"
                component={Logout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DeliveryDetails"
                component={DeliveryDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GenerateInvoice"
                component={GenerateInvoice}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CustomerDetails"
                component={CustomerDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SellToCustomer"
                component={SellToCustomer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VanInvoice"
                component={VanInvoice}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddCustomer"
                component={AddCustomer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OneOfSale"
                component={OneOfSale}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SalesInvoice"
                component={SalesInvoice}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </>
  );
}
