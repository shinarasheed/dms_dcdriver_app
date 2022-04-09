import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Image, View, Pressable } from "react-native";
import { icons } from "../constants";
import { BottomSheet } from "react-native-btr";
import { Button } from "react-native-elements";
import { confirmVanSales, postVanEmpties } from "../redux/actions/vanActions";
import { updateInventory } from "../redux/actions/vanActions";

import appTheme from "../constants/theme";
import ProductBottomSheetOneOfUganda from "./ProductBottomSheetOneOfUganda";
import Routes from "../navigation/Routes";
import { formatPrice } from "../utils/formatPrice";

const SellProductFooter = ({
  getTotalPrice,
  getProductPrice,
  productsToSell,
  order,
  getQuantity,
  getQuantity2,
  calNumberOfFull,
  setEmpties,
  empties,
  getEmptiesPrice,
}) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [salesCompleted, setSalesCompleted] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const userState = useSelector((state) => state.user);

  const { user } = userState;

  const { country } = user;

  const dispatch = useDispatch();

  function toggle() {
    setVisible((visible) => !visible);
  }

  function toggleConfirm() {
    setConfirmVisible((visible) => !visible);
  }

  const items = productsToSell?.map((prod) => ({
    price: prod.high_end_price * prod.quantity,
    quantity: parseInt(prod.quantity),
    productId: prod.productId,
    SFlineID: "One-Off",
  }));

  const payload = {
    buyerCompanyId: order?.buyerCompanyId,
    sellerCompanyId: order?.sellerCompanyId,
    routeName: "One-Off",
    referenceId: "One-Off",
    emptiesReturned: empties,
    costOfEmptiesReturned: getEmptiesPrice(),
    datePlaced: new Date(new Date().getTime()),
    shipToCode: order?.buyerCompanyId,
    billToCode: order?.buyerCompanyId,
    country: country,
    vehicleId: user?.vehicleId,
    buyerDetails: {
      buyerName: order?.buyerDetails[0].buyerName,
      buyerPhoneNumber: order?.buyerDetails[0].buyerPhoneNumber,
      buyerAddress: order?.buyerDetails[0]?.buyerAddress,
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
      <Pressable onPress={() => toggle()}>
        {productsToSell?.length > 0 && (
          <View
            style={{
              position: "absolute",
              left: 23,
              bottom: 12,
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {productsToSell?.length}
            </Text>
          </View>
        )}

        <View style={[styles.orderSummay]}>
          <Image
            style={{
              marginRight: 10,
            }}
            source={icons.liquidProducts}
          />
          <Text
            style={{
              marginRight: 10,
              marginLeft: 10,
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Medium",
            }}
          >
            Add Empties
          </Text>
          <Image source={icons.arrowDownIcon} />
        </View>
      </Pressable>

      {/* \u20A6${formatPrice(getProductPrice())} */}

      <Button
        onPress={toggleConfirm}
        disabled={productsToSell?.length === 0}
        buttonStyle={{
          backgroundColor: appTheme.COLORS.mainRed,
          width: "100%",
          height: 50,
          justifyContent: "center",
          borderRadius: 5,
          marginTop: 10,
        }}
        title={` Confirm  ${
          getProductPrice() === undefined
            ? ""
            : `${
                country === "UG"
                  ? `UGX${formatPrice(getProductPrice())}`
                  : `\u20A6${formatPrice(getProductPrice())}`
              }`
        }`}
      />

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View style={styles.bottomSheetCard}>
          <ProductBottomSheetOneOfUganda
            getTotalPrice={getTotalPrice}
            toggle={toggle}
            productsToSell={productsToSell}
            item={order}
            getQuantity={getQuantity}
            getQuantity2={getQuantity2}
            calNumberOfFull={calNumberOfFull}
            setEmpties={setEmpties}
            empties={empties}
            getEmptiesPrice={getEmptiesPrice}
            getProductPrice={getProductPrice}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        visible={confirmVisible}
        onBackButtonPress={toggleConfirm}
        onBackdropPress={toggleConfirm}
      >
        <View style={styles.card}>
          <Pressable
            onPress={() => toggleConfirm()}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <Image source={icons.cancelIcon} />
          </Pressable>

          {!salesCompleted && (
            <View style={{ alignItems: "center" }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 17, fontFamily: "Gilroy-Medium" }}>
                  Are you sure you want to sell your
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    textAlign: "center",
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  section(s)?
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  setSalesCompleted(true);
                }}
                style={{
                  backgroundColor: appTheme.COLORS.mainRed,
                  width: 120,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  ...appTheme.FONTS.mainFontBold,
                  borderRadius: 4,
                }}
              >
                <Text style={{ color: appTheme.COLORS.white }}>Yes, sell</Text>
              </Pressable>
            </View>
          )}

          {salesCompleted && (
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                }}
                source={icons.checkIcon}
              />

              <Text
                style={{
                  fontSize: 17,
                  marginBottom: 10,
                  marginTop: 10,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                sales completed
              </Text>

              <Pressable
                style={{
                  backgroundColor: appTheme.COLORS.mainRed,
                  width: 120,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  ...appTheme.FONTS.mainFontBold,
                  borderRadius: 4,
                }}
                onPress={() => {
                  dispatch(confirmVanSales(payload));
                  dispatch(updateInventory(payload2));
                  handleEmpties();
                  navigation.navigate(Routes.ONEOF_INVOICE_UGANDA, {
                    productsToSell,
                    order,
                    empties,
                    // totalPrice,
                  });

                  toggleConfirm();
                  setSalesCompleted(false);
                }}
              >
                <Text
                  style={{
                    color: appTheme.COLORS.white,
                    fontSize: 18,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  ok
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default SellProductFooter;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: appTheme.COLORS.white,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: 15,
  },

  footerButtonText: {
    color: appTheme.COLORS.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
  orderSummay: {
    flexDirection: "row",
    alignItems: "center",
  },

  bottomSheetCard: {
    backgroundColor: appTheme.COLORS.white,
  },
  card: {
    height: 200,
    backgroundColor: appTheme.COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
