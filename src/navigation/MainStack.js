import React from "react";
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
  CustomerUganda,
  SellToCustomerUganda,
  InvoiceUganda,
  InvoiceScreen,
  CustomerDetailsUganda,
  SellToOneCustomerUganda,
  OneOfInvoiceUganda,
  CustomerDetailsNigeria,
} from "../screens";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeTabs} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
      <Stack.Screen name="GenerateInvoice" component={GenerateInvoice} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen
        name="CustomerDetailsNigeria"
        component={CustomerDetailsNigeria}
      />
      <Stack.Screen name="SellToCustomer" component={SellToCustomer} />
      <Stack.Screen name="VanInvoice" component={VanInvoice} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="OneOfSale" component={OneOfSale} />
      <Stack.Screen name="SalesInvoice" component={SalesInvoice} />
      <Stack.Screen name="CustomerUganda" component={CustomerUganda} />
      <Stack.Screen
        name="SellToCustomerUganda"
        component={SellToCustomerUganda}
      />
      <Stack.Screen name="InvoiceUganda" component={InvoiceUganda} />
      <Stack.Screen
        name="CustomerDetailsUganda"
        component={CustomerDetailsUganda}
      />
      <Stack.Screen
        name="SellToOneCustomerUganda"
        component={SellToOneCustomerUganda}
      />
      <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <Stack.Screen name="OneOfInvoiceUganda" component={OneOfInvoiceUganda} />
    </Stack.Navigator>
  );
};

export default MainStack;
