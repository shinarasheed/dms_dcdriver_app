import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../constants/theme";
import Routes from "../navigation/Routes";

const DeliveryCard = ({ item, products }) => {
  const navigation = useNavigation();

  const getProductDetails = (productId) => {
    const x = products?.filter(
      (product) => product?.productId === productId.toString()
    )[0];
    return x;
  };

  const getTotalPrice = () => {
    return item?.orderItems?.reduce(
      (accumulator, order) =>
        accumulator +
        getProductDetails(order?.productId)?.price * order?.quantity,
      0
    );
  };

  return (
    <TouchableOpacity
      style={{
        padding: 20,
        paddingBottom: 10,
      }}
      onPress={() =>
        navigation.navigate(Routes.DELIVERIES_DETAILS_SCREEN, item)
      }
    >
      <View style={{ flexDirection: "row", marginBottom: 7 }}>
        <Text
          style={{
            color: appTheme.COLORS.mainTextGray,
            fontSize: 14,
            ...appTheme.FONTS.mainFontLight,
          }}
        >
          Order: {item?.orderId},
        </Text>
        <Text
          style={{
            color: appTheme.COLORS.mainTextGray,
            fontSize: 14,
            marginRight: 5,
            marginLeft: 8,
            ...appTheme.FONTS.mainFontLight,
          }}
        >
          {moment(item?.orderStatus[0]?.dateAssigned).format("MMM Do, YYYY")}
        </Text>
        <Text
          style={{
            textTransform: "lowercase",
            color: appTheme.COLORS.MainGray,
            fontSize: 14,
            ...appTheme.FONTS.mainFontLight,
          }}
        >
          {/* at {""}
          {new Date(item?.orderStatus[0]?.timeAssigned).toLocaleTimeString()} */}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            ...appTheme.FONTS.mainFontBold,
          }}
        >
          {item?.buyerDetails[0]?.buyerName}
        </Text>
        <Text
          style={{
            backgroundColor:
              item.status === "Assigned"
                ? appTheme.COLORS.Grey
                : item.status === "Accepted"
                ? appTheme.COLORS.mainYellow
                : item.status === "Completed"
                ? appTheme.COLORS.mainGreen
                : appTheme.COLORS.mainRed,
            paddingHorizontal: 10,
            paddingVertical: 7,
            fontWeight: "600",
            borderRadius: 20,
            color:
              item.status === "Assigned"
                ? appTheme.COLORS.black
                : item.status === "Accepted"
                ? appTheme.COLORS.white
                : item.status === "Completed"
                ? appTheme.COLORS.white
                : appTheme.COLORS.white,
          }}
        >
          {item?.status}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            color: appTheme.COLORS.MainOrange,
            fontSize: 14,
            marginRight: 10,
            ...appTheme.FONTS.mainFontBold,
          }}
        >
          {item?.orderItems.length} {/* TODO: this might fail.please correct */}
          {item?.orderItems.length === 1 ? "product" : "products"}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "700",
            ...appTheme.FONTS.mainFontBold,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {"\u20A6"}
          {getTotalPrice() === "NaN" ? null : getTotalPrice()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryCard;
