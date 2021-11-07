import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../constants/theme";
import { confirmOrder } from "../redux/actions/orderActions";
import { updateInventory } from "../redux/actions/vanActions";

const OrderFooter = ({ getTotalPrice, order, newOrders, empties, driver }) => {
  const navigator = useNavigation();

  const dispatch = useDispatch();
  const arrayToSubmit = async () => {
    let orderItems = [];
    newOrders.map((newOrder) => {
      orderItems.push({
        quantity: newOrder.quantity,
        productId: newOrder.quantity,
        price: newOrder.price,
      });
    });
    return orderItems;
  };

  const arrayToSubmit2 = async () => {
    let orderItems = [];
    newOrders.map((newOrder) => {
      orderItems.push({
        quantity: parseInt(newOrder.quantity),
        productId: parseInt(newOrder.quantity),
      });
    });
    return orderItems;
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={async () => {
          const payload = {
            emptiesReturned: empties,
            sellerCompanyId: order.sellerCompanyId,
            orderItems: await arrayToSubmit(),
          };

          const payload2 = {
            vehicleId: driver?.vehicleId,
            orderItems: await arrayToSubmit2(),
          };

          dispatch(confirmOrder({ payload, orderId: order.orderId }));
          dispatch(updateInventory(payload2));
          navigator.navigate("GenerateInvoice", {
            productsToSell: newOrders,
            empties,
            order,
          });
        }}
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          width: "100%",
          height: 50,
          justifyContent: "center",
          borderRadius: 5,
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {` Confirm \u20A6${getTotalPrice()}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderFooter;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: appTheme.COLORS.white,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: "center",
    elevation: 1,
  },
});
