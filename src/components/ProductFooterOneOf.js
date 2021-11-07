import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../constants/theme";
import { confirmVanSales } from "../redux/actions/vanActions";
import { updateInventory } from "../redux/actions/vanActions";

const SellProductFooterOneOf = ({
  getTotalPrice,
  customer,
  productsToSell,
  toggle,
}) => {
  const navigator = useNavigation();

  const dispatch = useDispatch();

  const items = productsToSell?.map((prod) => ({
    price: toString(prod.price * prod.quantity),
    quantity: parseInt(prod.quantity),
    productId: toString(prod.productId),
    SFlineID: "One-Off",
  }));

  const items2 = productsToSell?.map((prod) => ({
    price: toString(prod.price * prod.quantity),
    quantity: parseInt(prod.quantity),
    productId: parseInt(prod.productId),
    SFlineID: "One-Off",
  }));

  const payload = {
    sellerCompanyId: "One-Off",
    routeName: "One-Off",
    referenceId: "One-Off",
    emptiesReturned: empties,
    costOfEmptiesReturned: getEmptiesPrice(),
    datePlaced: new Date(new Date().getTime()),
    buyerDetails: {
      buyerName: customer?.CUST_Name,
      buyerPhoneNumber: customer?.phoneNumber,
    },

    orderItems: items,
  };

  const payload2 = {
    sellerCompanyId: "One-Off",
    routeName: "One-Off",
    referenceId: "One-Off",
    emptiesReturned: empties,
    costOfEmptiesReturned: getEmptiesPrice(),
    datePlaced: new Date(new Date().getTime()),
    buyerDetails: {
      buyerName: customer?.CUST_Name,
      buyerPhoneNumber: customer?.phoneNumber,
    },

    orderItems: items2,
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={() => {
          dispatch(confirmVanSales(payload));
          navigator.navigate("SalesInvoice", {
            productsToSell,
            customer,
          });
          dispatch(updateInventory(payload2));
          toggle();
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
          {`Confirm \u20A6${getTotalPrice()}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SellProductFooterOneOf;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: appTheme.COLORS.white,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: "center",
    elevation: 1,
  },
});
