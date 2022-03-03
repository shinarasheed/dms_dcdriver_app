import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import moment from "moment";

import appTheme from "../constants/theme";
import Routes from "../navigation/Routes";
import { formatPrice } from "../utils/formatPrice";
import CountryCurrency from "../components/user/CountryCurrency";

const PastDeliveryCard = ({ item, products }) => {
  const navigation = useNavigation();

  const getProductDetails = (productId) => {
    const x = products?.filter(
      (product) => product?.productId === productId.toString()
    )[0];
    return x;
  };

  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.DELIVERIES_DETAILS_SCREEN, { item })
        }
      >
        <View
          style={{
            padding: 20,
            paddingBottom: 10,
            borderBottomWidth: 1,
            backgroundColor: appTheme.COLORS.white,
            borderBottomColor: appTheme.COLORS.boxGray,
            borderBottomWidth: 1,
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
              {item.status === "Completed"
                ? moment(item?.orderStatus[0]?.dateCompleted).format(
                    "MMM Do, YYYY"
                  )
                : moment(item?.orderStatus[0]?.dateRejected).format(
                    "MMM Do, YYYY"
                  )}
            </Text>
            <Text
              style={{
                textTransform: "lowercase",
                color: appTheme.COLORS.MainGray,
                fontSize: 14,
                ...appTheme.FONTS.mainFontLight,
              }}
            >
              at{" "}
              {item.status === "Completed"
                ? item?.orderStatus[0]?.timeCompleted.replace(/\s/g, "")
                : item?.orderStatus[0]?.timeRejected.replace(/\s/g, "")}
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
                color: appTheme.COLORS.black,
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
                ...appTheme.FONTS.mainFontBold,
              }}
            >
              {item?.orderItems.length}{" "}
              {item?.orderItems.length === 1 ? "product" : "products"}
            </Text>

            {/* {"\u20A6"}
              {isNaN(getTotalPrice()) ? null : getTotalPrice()} */}

            <CountryCurrency
              country={country}
              fontSize={14}
              price={item?.totalPrice}
              color={appTheme.COLORS.MainGray}
              fontWeight="bold"
              fontFamily="Gilroy-Bold"
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PastDeliveryCard;
