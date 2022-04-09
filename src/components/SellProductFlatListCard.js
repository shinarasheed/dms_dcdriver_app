import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import {
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  incrementQuantityByTyping,
} from "../redux/actions/vanActions";

import { icons } from "../constants";
import appTheme from "../constants/theme";
import { formatPrice } from "../utils/formatPrice";
import CountryCurrency from "../components/user/CountryCurrency";

const SellProductFlatListCard = ({
  customerType,
  product: {
    productId,
    brand,
    price,
    productType,
    imageUrl,
    sku,
    quantity,
    initialQuantity,
    high_end_price,
    low_end_price,
    main_stream_price,
    reseller_price,
  },
  getQuantity,
  getQuantity2,
}) => {
  const dispatch = useDispatch();

  const handleTextChange = (text, productId) => {
    getQuantity(productId, text) &&
      dispatch(incrementQuantityByTyping(text, productId));
  };

  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

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

  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: appTheme.COLORS.white,
      }}
    >
      <Image style={{ width: 30, height: 60 }} source={{ uri: imageUrl }} />
      <View style={{ marginLeft: 20, flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              textTransform: "capitalize",
              marginBottom: 10,
              marginRight: 5,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {brand}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textTransform: "capitalize",
              marginBottom: 10,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {sku}
          </Text>
        </View>

        <Pressable
          style={{ position: "absolute", right: 10 }}
          onPress={() => dispatch(deleteProduct(productId))}
        >
          <Image source={icons.deleteIcon} />
        </Pressable>

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
                  productType === "liquid"
                    ? appTheme.COLORS.mainYellow
                    : productType === "pet"
                    ? appTheme.COLORS.mainRed2
                    : appTheme.COLORS.mainRed3,
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 20,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                {productType}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CountryCurrency
                country={country}
                price={thePrice(customerType)}
                color={appTheme.COLORS.MainGray}
                fontSize={14}
                fontFamily="Gilroy-Medium"
              />

              <Text
                style={{
                  fontSize: 14,
                }}
              >
                /case
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
            }}
          >
            {initialQuantity}{" "}
            {initialQuantity > 1 ? `quantities left` : `quantity left`}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
            paddingRight: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={[
                styles.productIncreaseDecreaseContainer,
                { marginRight: 5 },
              ]}
            >
              <Pressable onPress={() => dispatch(decrementQuantity(productId))}>
                <Text style={styles.IncreaseText}>-</Text>
              </Pressable>
            </View>

            <TextInput
              style={{
                borderWidth: 1,
                width: 70,
                borderColor: appTheme.COLORS.borderGRey,
                marginRight: 5,
                borderRadius: 5,
                textAlign: "center",
                color: appTheme.COLORS.MainGray,
                fontWeight: "bold",
              }}
              value={String(quantity)}
              onChangeText={(text) => handleTextChange(text, productId)}
            />

            <View style={styles.productIncreaseDecreaseContainer}>
              <Pressable
                onPress={() =>
                  getQuantity2(productId, quantity) &&
                  dispatch(incrementQuantity(productId))
                }
              >
                <Text style={styles.IncreaseText}>+</Text>
              </Pressable>
            </View>
          </View>

          <CountryCurrency
            country={country}
            price={quantity * thePrice(customerType)}
            color={appTheme.COLORS.mainRed}
            fontSize={16}
            fontFamily="Gilroy-Medium"
          />
        </View>
      </View>
    </View>
  );
};

export default SellProductFlatListCard;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: "bold",
    fontSize: 20,
  },
});
