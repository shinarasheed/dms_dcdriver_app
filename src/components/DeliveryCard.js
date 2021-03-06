import React from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../constants/theme";
import Routes from "../navigation/Routes";
import CountryCurrency from "./user/CountryCurrency";

const DeliveryCard = ({ item, products }) => {
  const navigation = useNavigation();

  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

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
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: appTheme.COLORS.white,
        borderBottomColor: appTheme.COLORS.boxGray,
        borderBottomWidth: 1,
      }}
      onPress={() =>
        navigation.navigate(Routes.DELIVERIES_DETAILS_SCREEN, { item })
      }
    >
      <View style={{ flexDirection: "row", marginBottom: 7 }}>
        <Text
          style={{
            color: appTheme.COLORS.mainTextGray,
            fontSize: 14,
            fontFamily: "Gilroy-Medium",
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
            fontFamily: "Gilroy-Medium",
          }}
        >
          {moment(item?.orderStatus[0]?.dateAssigned).format("MMM Do, YYYY")}
        </Text>
        <Text
          style={{
            textTransform: "lowercase",
            color: appTheme.COLORS.MainGray,
            fontSize: 14,
            fontFamily: "Gilroy-Medium",
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
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
          }}
        >
          {item?.buyerDetails[0]?.buyerName}
        </Text>

        <View
          style={{
            backgroundColor:
              item.status === "Assigned"
                ? appTheme.COLORS.Grey
                : item.status === "Accepted"
                ? appTheme.COLORS.mainYellow
                : item.status === "Completed"
                ? appTheme.COLORS.mainGreen
                : appTheme.COLORS.mainRed,
            borderRadius: 20,
            width: 100,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            color: appTheme.COLORS.MainOrange,
            fontSize: 14,
            marginRight: 10,
            fontFamily: "Gilroy-Bold",
          }}
        >
          {item?.orderItems.length} {/* TODO: this might fail.please correct */}
          {item?.orderItems.length === 1 ? "product" : "products"}
        </Text>

        {/* {isNaN(getTotalPrice())
            ? null
            : `\u20A6${formatPrice(getTotalPrice())}`} */}

        {/* {"\u20A6"}
          {formatPrice(item?.totalPrice)} */}

        <CountryCurrency
          country={country}
          fontSize={14}
          price={item?.totalPrice}
          color={appTheme.COLORS.MainGray}
          fontWeight="bold"
          fontFamily="Gilroy-Bold"
        />
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryCard;
