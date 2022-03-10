import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  confirmVanSales,
  postVanEmpties,
  updateInventory,
} from "../../../redux/actions/vanActions";
import CountryCurrency from "../../user/CountryCurrency";
import appTheme from "../../../constants/theme";
import Routes from "../../../navigation/Routes";

const ProductFooter = ({
  getTotalPrice,
  toggle,
  customer,
  productsToSell,
  empties,
  getEmptiesPrice,
}) => {
  const navigation = useNavigation();

  const userState = useSelector((state) => state.user);

  const { user } = userState;

  const { country } = user;

  const dispatch = useDispatch();

  const items = productsToSell?.map((prod) => ({
    price: prod.price * prod.quantity,
    quantity: parseInt(prod.quantity),
    productId: prod.productId,
    SFlineID: "Van-Sales",
  }));

  const payload = {
    buyerCompanyId: customer?.SF_Code,
    sellerCompanyId: customer?.DIST_Code,
    routeName: "Van-Sales",
    referenceId: "Van-Sales",
    emptiesReturned: empties,
    costOfEmptiesReturned: getEmptiesPrice(),
    datePlaced: new Date(new Date().getTime()),
    shipToCode: customer?.SF_Code,
    billToCode: customer?.SF_Code,
    vehicleId: user?.vehicleId,
    country: country,
    buyerDetails: {
      buyerName: customer?.CUST_Name,
      buyerPhoneNumber: customer?.phoneNumber,
      buyerAddress: customer?.address,
    },

    orderItems: items,
  };

  const items2 = productsToSell?.map((prod) => ({
    quantity: parseInt(prod.quantity),
    productId: parseInt(prod.id),
  }));

  const payload2 = {
    vehicleId: user?.vehicleId,
    orderItems: items2,
  };

  const handleEmpties = () => {
    if (empties > 0) {
      const vanPayload = {
        vanId: user?.vehicleId,
        quantityToReturn: parseInt(empties),
      };
      dispatch(postVanEmpties(vanPayload));
    } else {
      return;
    }
  };

  return (
    <View style={styles.footerContainer}>
      {getTotalPrice() !== "undefined" && (
        <TouchableOpacity
          onPress={() => {
            dispatch(confirmVanSales(payload));
            handleEmpties();
            navigation.navigate(Routes.GENERATE_INVOICE_SCREEN_UGANGA, {
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

export default ProductFooter;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: appTheme.COLORS.white,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: "center",
    elevation: 5,
  },
});
