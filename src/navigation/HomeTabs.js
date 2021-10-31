import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { DeliveriesScreen, HomeScreen } from "../screens";

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="DeliveriesScreen" component={DeliveriesScreen} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
