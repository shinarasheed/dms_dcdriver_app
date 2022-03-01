import React from "react";
import { useSelector } from "react-redux";
import { Image, Text, View } from "react-native";

import appTheme from "../../constants/theme";
import CountryCurrency from "../user/CountryCurrency";

const ProductCard = ({ item: { quantity, product } }) => {
  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: appTheme.COLORS.white,
          borderBottomWidth: 1,
          borderBottomColor: appTheme.COLORS.borderGRey,
        }}
      >
        <Image
          style={{ width: 30, height: 80 }}
          source={{ uri: product?.imageUrl }}
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
                fontSize: 18,
                textTransform: "capitalize",
                marginRight: 5,
                color: appTheme.COLORS.black,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {product?.brand}
            </Text>
            <Text
              style={{
                fontSize: 18,
                textTransform: "capitalize",
                color: appTheme.COLORS.black,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {product?.sku}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  backgroundColor:
                    product?.productType === "full"
                      ? appTheme.COLORS.mainYellow
                      : product?.productType === "pet"
                      ? appTheme.COLORS.mainRed2
                      : appTheme.COLORS.mainRed3,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: appTheme.COLORS.white }}>
                  {product?.productType}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "Gilroy-Medium",
                    color: appTheme.COLORS.MainGray,
                  }}
                >
                  Qty:
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginLeft: 2,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  {quantity}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginLeft: 80,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  marginRight: 2,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                Price:
              </Text>

              <CountryCurrency
                country={country}
                price={product?.price}
                color={appTheme.COLORS.mainRed}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProductCard;
