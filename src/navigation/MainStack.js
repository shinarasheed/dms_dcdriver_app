import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabs from "./HomeTabs";
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
} from "../screens";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="HomeScreen" component={HomeTabs} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
      <Stack.Screen name="GenerateInvoice" component={GenerateInvoice} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen name="SellToCustomer" component={SellToCustomer} />
      <Stack.Screen name="VanInvoice" component={VanInvoice} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="OneOfSale" component={OneOfSale} />
      <Stack.Screen name="SalesInvoice" component={SalesInvoice} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
