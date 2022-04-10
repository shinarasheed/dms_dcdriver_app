import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../constants/theme";
import Routes from "../navigation/Routes";

const CustomerCard = ({ customer, allOrders }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.CUSTOMER_DETAILS_SCREEN_NIGERIA2, {
          customer,
          allOrders,
        })
      }
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingLeft: 20,
          paddingTop: 20,
          paddingBottom: 15,
          flexDirection: "row",
          alignItems: "flex-start",
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
        <View>
          <Text
            style={{
              fontSize: 15,
              marginBottom: 5,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {customer}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {/* <Text
              style={{
                fontSize: 15,
                marginRight: 10,
                color: appTheme.COLORS.mainTextGray,
                ...appTheme.FONTS.mainFontLight,
              }}
            >
              {`${numberOfOrders.length} ${
                numberOfOrders.length !== 1 ? "Orders" : "Order"
              }`}
            </Text> */}
            <Text
              style={{
                fontSize: 15,
                color: appTheme.COLORS.mainTextGray,
                ...appTheme.FONTS.mainFontLight,
              }}
            >
              {/* {"\u20A6"}
              {totalAmount} */}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerCard;
