import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../constants/theme";
import { confirmVanSales } from "../redux/actions/vanActions";
import { updateInventory } from "../redux/actions/vanActions";
import { formatPrice } from "../utils/formatPrice";

const SellProductFooterOneOf = ({
  getTotalPrice,
  customer,
  productsToSell,
  toggle,
  empties,
  getEmptiesPrice,
}) => {
  const navigator = useNavigation();

  const dispatch = useDispatch();
  const Van = useSelector((state) => state.van);
  const { driver } = Van;

  const items = productsToSell?.map((prod) => ({
    price: prod.price * prod.quantity,
    quantity: parseInt(prod.quantity),
    productId: prod.productId,
    SFlineID: "One-Off",
  }));

  const payload = {
    sellerCompanyId: driver?.ownerCompanyId,
    buyerCompanyId: "One-Off Customer",
    routeName: "One-Off",
    referenceId: "One-Off",
    emptiesReturned: empties,
    costOfEmptiesReturned: getEmptiesPrice(),
    datePlaced: new Date(new Date().getTime()),
    vehicleId: driver?.vehicleId,
    buyerDetails: {
      buyerName: customer?.CUST_Name,
      buyerPhoneNumber: customer?.phoneNumber,
    },

    orderItems: items,
  };

  const items2 = productsToSell?.map((prod) => ({
    quantity: parseInt(prod.quantity),
    productId: parseInt(prod.productId),
  }));

  const payload2 = {
    vehicleId: driver?.vehicleId,
    orderItems: items2,
  };

  return (
    <View style={styles.footerContainer}>
      {getTotalPrice() !== "undefined" && (
        <TouchableOpacity
          onPress={() => {
            dispatch(confirmVanSales(payload));
            navigator.navigate("SalesInvoice", {
              productsToSell,
              customer,
              empties,
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
            {`Confirm \u20A6${formatPrice(getTotalPrice())}`}
          </Text>
        </TouchableOpacity>
      )}
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
