import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import appTheme from "../constants/theme";
import { postVanEmpties, updateInventory } from "../redux/actions/vanActions";
import CountryCurrency from "./user/CountryCurrency";
import { orderUrl } from "../utils/baseUrl";

const OrderFooter = ({
  getTotalPrice,
  order,
  newOrders,
  empties,
  driver,
  updateOrderStatus,
  toggle,
}) => {
  const navigator = useNavigation();

  const totalPrice = getTotalPrice();

  const dispatch = useDispatch();
  const arrayToSubmit = async () => {
    let orderItems = [];
    newOrders.map((newOrder) => {
      orderItems.push({
        quantity: newOrder?.quantity,
        productId: newOrder?.productId,
        price: newOrder?.quantity * newOrder?.productPrice,
        SFlineID: newOrder?.SFlineID,
      });
    });
    return orderItems;
  };

  const arrayToSubmit2 = async () => {
    let orderItems = [];
    newOrders.map((newOrder) => {
      orderItems.push({
        quantity: parseInt(newOrder.quantity),
        productId: parseInt(newOrder.id),
      });
    });
    return orderItems;
  };

  const handleEmpties = () => {
    if (empties > 0) {
      const vanPayload = {
        vanId: driver?.vehicleId,
        quantityToReturn: parseInt(empties),
      };
      dispatch(postVanEmpties(vanPayload));
    } else {
      return;
    }
  };

  const userState = useSelector((state) => state.user);

  const updateOrderItem = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //for order
      const payload = {
        emptiesReturned: empties,
        costOfEmptiesReturned: empties * 22000,
        sellerCompanyId: order?.sellerCompanyId,
        orderItems: await arrayToSubmit(),
      };

      //for inventory
      const payload2 = {
        vehicleId: driver?.vehicleId,
        orderItems: await arrayToSubmit2(),
      };

      const { data } = await axios.patch(
        `${orderUrl}/UpdateOrder/UpdateOrderDetails/${order?.orderId}`,
        payload,
        config
      );

      const { isSuccess } = data;

      if (isSuccess) {
        updateOrderStatus("Completed");
        dispatch(updateInventory(payload2));
        handleEmpties();
        toggle();
        navigator.navigate("GenerateInvoice", {
          productsToSell: newOrders,
          order,
          empties,
          totalPrice,
        });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    user: { country },
  } = userState;

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={async () => updateOrderItem()}
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          width: "100%",
          height: 50,
          justifyContent: "center",
          borderRadius: 5,
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 16,
            fontFamily: "Gilroy-Bold",
          }}
        >
          Confirm{" "}
        </Text>
        {isNaN(totalPrice) ? null : (
          <CountryCurrency
            country={country}
            price={totalPrice}
            color={appTheme.COLORS.white}
            fontSize={16}
            fontWeight="bold"
            fontFamily="Gilroy-Bold"
          />
        )}
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
    elevation: 5,
  },
});
