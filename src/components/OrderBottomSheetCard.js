import React from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
} from "react-native";

import appTheme from "../constants/theme";
import icons from "../constants/icons";
import { formatPrice } from "../utils/formatPrice";

const OrderBottomSheetCard = ({
  order,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  getQuantity,
  newOrders,
  setNewOrders,
}) => {
  const {
    orderId,
    productId,
    quantity,
    brand,
    price,
    productType,
    imageUrl,
    sku,
    unitPrice,
    productPrice,
  } = order;

  const [value, setValue] = React.useState(quantity.toString());

  const incrementQuantityByTyping = (text, productId) => {
    setValue(text);
    const myproduct = newOrders?.find((item) => item?.productId === productId);
    myproduct.quantity = text;
    setNewOrders([...newOrders]);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}
      key={productId}
    >
      <Image style={{ width: 30, height: 60 }} source={{ uri: imageUrl }} />
      <View style={{ marginLeft: 20, flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              ...appTheme.FONTS.mainFontBold,
              textTransform: "capitalize",
              marginBottom: 10,
              marginRight: 5,
              color: appTheme.COLORS.black,
            }}
          >
            {brand}
          </Text>
          <Text
            style={{
              fontSize: 15,
              ...appTheme.FONTS.mainFontBold,
              textTransform: "capitalize",
              marginBottom: 10,
              color: appTheme.COLORS.black,
            }}
          >
            {sku}
          </Text>
        </View>

        <Pressable
          style={{ position: "absolute", right: 10 }}
          onPress={() => deleteProduct(productId)}
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
                  fontSize: 15,
                  color: appTheme.COLORS.MainGray,
                }}
              >
                {"\u20A6"}
                {productPrice}/case
              </Text>
            </View>
          </View>
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
            <View style={[styles.container, { marginRight: 5 }]}>
              <Pressable onPress={() => decrementQuantity(productId)}>
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
                fontWeight: "bold",
                color: appTheme.COLORS.mainTextGray,
                ...appTheme.FONTS.mainFontLight,
              }}
              value={value}
              onChangeText={(text) =>
                incrementQuantityByTyping(text, productId)
              }
            />

            <View style={styles.container}>
              <Pressable
                onPress={() =>
                  // getQuantity(productId, quantity) &&
                  incrementQuantity(productId)
                }
              >
                <Text style={styles.IncreaseText}>+</Text>
              </Pressable>
            </View>
          </View>

          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              ...appTheme.FONTS.mainFontBold,
              fontSize: 16,
            }}
          >
            {"\u20A6"}
            {formatPrice(value * productPrice)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderBottomSheetCard;

const styles = StyleSheet.create({
  container: {
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
