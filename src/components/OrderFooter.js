import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../constants/theme";
// import { confirmOrder } from "../redux/actions/orderActions";
import { postVanEmpties, updateInventory } from "../redux/actions/vanActions";
import { formatPrice } from "../utils/formatPrice";

const OrderFooter = ({
  getTotalPrice,
  order,
  newOrders,
  empties,
  driver,
  updateOrderStatus,
}) => {
  const navigator = useNavigation();

  const totalPrice = getTotalPrice();

  const dispatch = useDispatch();
  const arrayToSubmit = async () => {
    let orderItems = [];
    newOrders.map((newOrder) => {
      orderItems.push({
        quantity: newOrder?.quantity,
        productId: newOrder?.quantity,
        price: newOrder?.price,
      });
    });
    return orderItems;
  };

  const arrayToSubmit2 = async () => {
    let orderItems = [];
    newOrders.map((newOrder) => {
      orderItems.push({
        quantity: parseInt(newOrder?.quantity),
        productId: parseInt(newOrder?.quantity),
      });
    });
    return orderItems;
  };

  const handleEmpties = () => {
    if (empties > 0) {
      const vanPayload = {
        vanId: driver?.vehicleId,
        quantityToReturn: empties,
      };
      dispatch(postVanEmpties(vanPayload));
    } else {
      return;
    }
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={async () => {
          const payload = {
            emptiesReturned: empties,
            sellerCompanyId: order?.sellerCompanyId,
            orderItems: await arrayToSubmit(),
          };

          const payload2 = {
            vehicleId: driver?.vehicleId,
            orderItems: await arrayToSubmit2(),
          };

          updateOrderStatus("Completed");
          dispatch(updateInventory(payload2));
          handleEmpties();
          navigator.navigate("GenerateInvoice", {
            productsToSell: newOrders,
            order,
            empties,
            totalPrice,
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
          {isNaN(totalPrice)
            ? null
            : ` Confirm \u20A6${formatPrice(totalPrice)}`}
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
