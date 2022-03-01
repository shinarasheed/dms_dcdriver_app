import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../constants/theme";
import { confirmVanSales } from "../redux/actions/vanActions";
import { updateInventory } from "../redux/actions/vanActions";
import CountryCurrency from "./user/CountryCurrency";

const SellProductFooterOneOf = ({
  getTotalPrice,
  customer,
  productsToSell,
  toggle,
  empties,
  getEmptiesPrice,
}) => {
  const navigator = useNavigation();

  const userState = useSelector((state) => state.user);

  const { user } = userState;

  const { country } = user;

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
    sellerCompanyId: user?.syspro_code,
    buyerCompanyId: "One-Off Customer",
    routeName: "One-Off",
    referenceId: "One-Off",
    emptiesReturned: empties,
    costOfEmptiesReturned: getEmptiesPrice(),
    datePlaced: new Date(new Date().getTime()),
    vehicleId: driver?.vehicleId,
    country: country,
    buyerDetails: {
      buyerName: customer?.CUST_Name,
      buyerPhoneNumber: customer?.phoneNumber,
      buyerAddress: country,
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
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.white,
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
            }}
          >
            Confirm{" "}
          </Text>
          {isNaN(getTotalPrice()) ? null : (
            <CountryCurrency
              country={country}
              price={getTotalPrice()}
              color={appTheme.COLORS.white}
              fontSize={16}
              fontWeight="bold"
              fontFamily="Gilroy-Bold"
            />
          )}
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
