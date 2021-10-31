import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icons from "../constants/icons";
import HomeStack from "./HomeStack";
import CustomersStack from "./CustomerStack";
import ProductStack from "./ProductStack";
import DeliveryStack from "./DeliveryStack";
import appTheme from "../constants/theme";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 70,
          paddingTop: 10,
          borderWidth: 0,
          elevation: 1,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          marginBottom: 10,
          ...appTheme.FONTS.mainFontLight,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        headerShown: false,
        tabBarActiveTintColor: appTheme.COLORS.mainRed,
        tabBarInactiveTintColor: appTheme.COLORS.mainTextGray,
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={Icons.home}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused
                  ? appTheme.COLORS.focusColor
                  : appTheme.COLORS.unFocusColor,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Deliveries"
        component={DeliveryStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={Icons.deliveries}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused
                  ? appTheme.COLORS.focusColor
                  : appTheme.COLORS.unFocusColor,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Customers"
        component={CustomersStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={Icons.customers}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused
                  ? appTheme.COLORS.focusColor
                  : appTheme.COLORS.unFocusColor,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Products"
        component={ProductStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={Icons.products}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused
                  ? appTheme.COLORS.focusColor
                  : appTheme.COLORS.unFocusColor,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
