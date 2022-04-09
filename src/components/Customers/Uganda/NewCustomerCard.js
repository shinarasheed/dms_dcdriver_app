import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../../../constants/theme";
import Routes from "../../../navigation/Routes";

const UgandaNewCustomerCard = ({ customer, oneOff }) => {
  const navigation = useNavigation();

  const thisCustomer = oneOff.filter(
    (order) => order.buyerDetails[0].buyerName === customer
  );

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.CUSTOMER_DETAILS_SCREEN_UGANDA, {
          thisCustomer,
          oneOff,
        })
      }
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingLeft: 20,
          flexDirection: "row",
          alignItems: "flex-start",
          paddingVertical: 25,
        }}
      >
        <View
          style={{
            backgroundColor: appTheme.COLORS.mainGreen,
            width: 8,
            height: 8,
            borderRadius: 50,
            marginRight: 12,
            top: 7,
          }}
        ></View>

        <Text
          style={{
            fontSize: 15,
            fontFamily: "Gilroy-Medium",
          }}
        >
          {customer}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UgandaNewCustomerCard;
