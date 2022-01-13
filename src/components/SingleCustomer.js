import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import moment from "moment";

import appTheme from "../constants/theme";
import Routes from "../navigation/Routes";

const SingleCustomer = ({ item, getTotalPrice }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.DELIVERIES_DETAILS_SCREEN, item)
      }
      style={{
        borderTopWidth: 1,
        borderTopColor: appTheme.COLORS.Grey,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 15,
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 7 }}>
        <Text
          style={{
            color: appTheme.COLORS.mainTextGray,
            fontSize: 14,
            ...appTheme.FONTS.mainFontLight,
          }}
        >
          Order: {item?.referenceId},
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
          {item?.orderStatus[0]?.dateAssigned !== null &&
            moment(item?.orderStatus[0]?.dateAssigned).format("MMM Do, YYYY")}
        </Text>
        <Text
          style={{
            textTransform: "lowercase",
            color: appTheme.COLORS.MainGray,
            fontSize: 14,
            ...appTheme.FONTS.mainFontLight,
          }}
        >
          {item?.orderStatus[0]?.timeAssigned !== null &&
            `at ${item?.orderStatus[0]?.timeAssigned.replace(/\s/g, "")}`}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              ...appTheme.FONTS.mainFontLight,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {`${item.orderItems.length} ${
              item.orderItems.length !== 1 ? "products" : "product "
            }`}
          </Text>
          <View
            style={{
              width: 100,
              height: 30,
              marginLeft: 20,
              alignItems: "center",
              backgroundColor:
                item.status === "Assigned"
                  ? appTheme.COLORS.Grey
                  : item.status === "Accepted"
                  ? appTheme.COLORS.mainYellow
                  : item.status === "Completed"
                  ? appTheme.COLORS.mainGreen
                  : appTheme.COLORS.mainRed,
              paddingHorizontal: 10,
              fontWeight: "600",
              borderRadius: 20,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
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
        </View>
        <Text
          style={{
            fontSize: 16,
            ...appTheme.FONTS.mainFontLight,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {/* {"\u20A6"}
          {isNaN(getTotalPrice()) ? null : getTotalPrice()} */}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleCustomer;
