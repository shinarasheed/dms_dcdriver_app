import React from "react";
import { useSelector } from "react-redux";
import { Image, Text, View } from "react-native";
import appTheme from "../constants/theme";
import CountryCurrency from "../components/user/CountryCurrency";

const InvoiceCard = ({ product, customerType }) => {
  const {
    imageUrl,
    brand,
    sku,
    productType,
    quantity,
    price,
    high_end_price,
    low_end_price,
    main_stream_price,
    reseller_price,
  } = product;

  const thePrice = (type) => {
    switch (type) {
      case "Mainstream":
        return main_stream_price;

      case "Low End":
        return low_end_price;

      case "High End":
        return high_end_price;

      case "Reseller":
        return reseller_price;

      default:
        return main_stream_price;
    }
  };

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
        }}
      >
        <Image style={{ width: 30, height: 60 }} source={{ uri: imageUrl }} />
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
                fontSize: 16,
                ...appTheme.FONTS.mainFontBold,
                textTransform: "capitalize",
                marginRight: 5,
                color: appTheme.COLORS.black,
              }}
            >
              {brand}
            </Text>
            <Text
              style={{
                fontSize: 16,
                ...appTheme.FONTS.mainFontBold,
                textTransform: "capitalize",
                color: appTheme.COLORS.black,
              }}
            >
              {sku}
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
                    product.productType === "liquid"
                      ? appTheme.COLORS.mainYellow
                      : product.productType === "pet"
                      ? appTheme.COLORS.mainRed2
                      : appTheme.COLORS.mainRed3,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: appTheme.COLORS.white }}>
                  {productType}
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

                    color: appTheme.COLORS.MainGray,
                  }}
                >
                  Qty: {quantity}
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
                  fontSize: 14,
                  color: appTheme.COLORS.black,
                  marginRight: 2,
                }}
              >
                Price:
              </Text>

              <CountryCurrency
                country={country}
                price={quantity * thePrice(customerType)}
                color={appTheme.COLORS.mainRed}
                fontSize={13}
                fontFamily="Gilroy-Bold"
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default InvoiceCard;
