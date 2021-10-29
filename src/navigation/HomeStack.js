import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  HomeScreen,
  Notifications,
  InvoiceScreen,
  DeliveryDetails,
  DeliverOrder,
  GenerateInvoice,
  Welcome,
} from "../screens";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
      <Stack.Screen name="DeliverOrder" component={DeliverOrder} />
      <Stack.Screen name="GenerateInvoice" component={GenerateInvoice} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
