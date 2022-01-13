import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import styles from "../screens/HomeScreen/styles";
import appTheme from "../constants/theme";
import Routes from "../navigation/Routes";

const Delivery = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ marginBottom: 20 }}
      onPress={() =>
        navigation.navigate(Routes.DELIVERIES_DETAILS_SCREEN, item)
      }
    >
      <Text style={styles.customer}>
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
          {item?.orderStatus[0]?.timeAssigned !== null &&
            `at ${item?.orderStatus[0]?.timeAssigned.replace(/\s/g, "")}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Delivery;
