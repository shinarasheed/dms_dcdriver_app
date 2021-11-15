import React from "react";
import { Text, View, Image, Pressable } from "react-native";

import { BottomSheet } from "react-native-btr";
import OrderBottomSheet from "./OrderBottomSheet";
import { icons } from "../constants";
import appTheme from "../constants/theme";

const OrderDetailsBottomSheet = ({
  productsVisibile,
  toggleProduct,
  toggle,
  getProductDetails,
  theOrder,
  visible,
  setProductsVisible,
}) => {
  return (
    <>
      <BottomSheet
        visible={productsVisibile}
        onBackButtonPress={toggleProduct}
        onBackdropPress={toggleProduct}
      >
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
          }}
        >
          <OrderBottomSheet
            getProductDetails={getProductDetails}
            toggle={toggleProduct}
            item={theOrder}
            setVisible={setProductsVisible}
            visible={productsVisibile}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: 200,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            justifyContent: "center",
            paddingHorizontal: 40,
          }}
        >
          <Pressable
            style={{ position: "absolute", top: 15, right: 20 }}
            onPress={() => toggle()}
          >
            <Image source={icons.cancelIcon} />
          </Pressable>

          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Are you sure you want to reject this order?
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              justifyContent: "center",
            }}
          >
            <Pressable
              style={{
                width: 130,
                height: 45,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: appTheme.COLORS.borderGRey1,
              }}
              onPress={() => toggle()}
            >
              <Text>No</Text>
            </Pressable>

            <Pressable
              style={{
                width: 130,
                height: 45,
                backgroundColor: appTheme.COLORS.mainRed,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginLeft: 20,
              }}
              onPress={() => {
                updateOrderStatus("Rejected");
                toggle();
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  ...appTheme.FONTS.mainFontBold,
                  fontSize: 16,
                }}
              >
                Yes, reject
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default OrderDetailsBottomSheet;
