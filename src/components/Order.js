import React from "react";
import { useSelector } from "react-redux";
import { Image, Text, View } from "react-native";
import appTheme from "../constants/theme";
import CountryCurrency from "./user/CountryCurrency";

const Order = ({ order, getProductDetails }) => {
  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

  return (
    <>
      {order !== undefined && (
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 30,
            backgroundColor: appTheme.COLORS.white,
          }}
        >
          <Image
            style={{ width: 30, height: 60 }}
            source={{
              uri: getProductDetails(order?.productId)?.imageUrl,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  ...appTheme.FONTS.mainFontBold,
                  textTransform: "capitalize",
                  // marginRight: 4,
                  color: appTheme.COLORS.black,
                }}
              >
                {/* {brand} */}
                {getProductDetails(order?.productId)?.brand}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  ...appTheme.FONTS.mainFontBold,
                  textTransform: "capitalize",
                  color: appTheme.COLORS.black,
                  marginLeft: 4,
                }}
              >
                {/* {sku} */}
                {getProductDetails(order?.productId)?.sku}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      getProductDetails(order?.productId)?.productType ===
                      "liquid"
                        ? appTheme.COLORS.mainYellow
                        : getProductDetails(order?.productId)?.productType ===
                          "pet"
                        ? appTheme.COLORS.mainRed2
                        : appTheme.COLORS.mainRed3,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: appTheme.COLORS.white }}>
                    {getProductDetails(order?.productId)?.productType}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 17,

                    color: appTheme.COLORS.MainGray,
                  }}
                >
                  Qty: {order?.quantity}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 68,
                }}
              >
                <Text style={{ fontSize: 14, marginRight: 2 }}>Price:</Text>

                {getProductDetails(order?.productId)?.price !== undefined && (
                  <CountryCurrency
                    country={country}
                    price={order?.price}
                    color={appTheme.COLORS.mainRed}
                    fontSize={13}
                    fontWeight="bold"
                    fontFamily="Gilroy-Bold"
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Order;
