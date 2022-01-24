import React from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";

import appTheme from "../constants/theme";
import icons from "../constants/icons";
import {
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  incrementQuantityByTyping,
} from "../redux/actions/vanActions";

const ProductBottomSheetCard = ({
  item: { brand, sku, imageUrl, price, quantity, productType, productId },
  getQuantity,
  getQuantity2,
}) => {
  const dispatch = useDispatch();

  const handleTextChange = (text, productId) => {
    getQuantity(productId, text) &&
      dispatch(incrementQuantityByTyping(text, productId));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}
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
          onPress={() => dispatch(deleteProduct(productId))}
          style={{ position: "absolute", right: 10 }}
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
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Gilroy-Medium",
                  color: appTheme.COLORS.MainGray,
                }}
              >
                {"\u20A6"}
                {price}/case
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

          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {"\u20A6"}
            {quantity * price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductBottomSheetCard;

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
