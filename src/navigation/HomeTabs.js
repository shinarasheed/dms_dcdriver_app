import React from "react";
import { Image, Dimensions, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import appTheme from "../constants/theme";
import { icons } from "../constants";

const Tab = createBottomTabNavigator();

import { CustomersScreen, DeliveriesScreen, HomeScreen } from "../screens";
import ProductStack from "../navigation/ProductStack";

function HomeTabs() {
  const { height, width } = Dimensions.get("window");

  let scale = width / 375;
  scale = scale.toFixed(2);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 70,
          paddingTop: 10,
          borderWidth: 0,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          marginBottom: 10,
          fontFamily: "Gilroy-Medium",
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        headerShown: false,
        tabBarActiveTintColor: appTheme.COLORS.mainRed,
        tabBarInactiveTintColor: appTheme.COLORS.mainTextGray,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
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
      <Tab.Screen
        name="Deliveries"
        component={DeliveriesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.deliveries}
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
      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.customers}
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
      <Tab.Screen
        name="Products"
        component={ProductStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.products}
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
    </Tab.Navigator>
  );
}

export default HomeTabs;
