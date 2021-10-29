import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CustomerDetails,
  SellToCustomer,
  CustomersScreen,
  OneOfSale,
  AddCustomer,
  SalesInvoice,
  VanInvoice,
} from '../screens';

const Stack = createNativeStackNavigator();

const CustomerStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomersScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CustomersScreen" component={CustomersScreen} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen name="SellToCustomer" component={SellToCustomer} />
      <Stack.Screen name="OneOfSale" component={OneOfSale} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="SalesInvoice" component={SalesInvoice} />
      <Stack.Screen name="VanInvoice" component={VanInvoice} />
    </Stack.Navigator>
  );
};

export default CustomerStackNavigator;
