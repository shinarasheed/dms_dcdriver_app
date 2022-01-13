import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProductsScreen, AllProducts, LiquidEmptyProducts } from "../screens";

const Stack = createNativeStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
      <Stack.Screen
        name="LiquidEmptyProducts"
        component={LiquidEmptyProducts}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
