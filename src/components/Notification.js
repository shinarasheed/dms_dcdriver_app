import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import appTheme from "../constants/theme";

import styles from "../screens/HomeScreen/styles";
import Routes from "../navigation/Routes";

const Notification = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ marginBottom: 20, flexDirection: "row" }}
      onPress={() =>
        navigation.navigate(Routes.DELIVERIES_DETAILS_SCREEN, item)
      }
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.mainGreen,
          width: 7,
          height: 7,
          borderRadius: 50,
          top: 7,
        }}
      ></View>

      <View style={{ marginLeft: 8 }}>
        <Text style={[styles.customer, { fontWeight: "bold" }]}>
          New Deliveries for {item?.buyerDetails[0]?.buyerName}
        </Text>
        <View style={styles.orderDateTimeContainer}>
          <Text style={styles.orderDate}>
            {moment(item?.orderStatus[0]?.dateAssigned).format("MMM Do, YYYY")}
          </Text>
          <Text
            style={{
              color: appTheme.COLORS.textGray,
              textTransform: "lowercase",
            }}
          >
            {/* ({new Date(item?.orderStatus[0]?.timeAssigned).toLocaleTimeString()}
            ) */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;
