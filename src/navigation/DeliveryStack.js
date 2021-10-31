import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  DeliveriesScreen,
  GenerateInvoice,
  DeliveryDetails,
  DeliverOrder,
  InvoiceScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

const DeliveryStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DeliveriesScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DeliveriesScreen" component={DeliveriesScreen} />
      <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
      <Stack.Screen name="DeliverOrder" component={DeliverOrder} />
      <Stack.Screen name="GenerateInvoice" component={GenerateInvoice} />
    </Stack.Navigator>
  );
};

export default DeliveryStackNavigator;
