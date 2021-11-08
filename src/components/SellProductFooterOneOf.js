import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation//native";
import { icons } from "../constants";
import { BottomSheet } from "react-native-btr";
import { Button } from "react-native-elements";

import appTheme from "../constants/theme";
import ProductBottomSheetOneOf from "./ProductBottomSheetOneOf";
import { confirmVanSales } from "../redux/actions/vanActions";
import { updateInventory } from "../redux/actions/vanActions";

const SellProductFooterOneOf = ({
  getTotalPrice,
  getProductPrice,
  productsToSell,
  order,
  getQuantity,
  calNumberOfFull,
  setEmpties,
  customer,
  empties,
  getEmptiesPrice,
}) => {
  const navigator = useNavigation();

  const [visible, setVisible] = useState(false);
  const [salesCompleted, setSalesCompleted] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const dispatch = useDispatch();

  const Van = useSelector((state) => state.van);
  const { driver } = Van;

  function toggle() {
    setVisible((visible) => !visible);
  }

  function toggleConfirm() {
    setConfirmVisible((visible) => !visible);
  }

  const items = productsToSell?.map((prod) => ({
    price: toString(prod.price * prod.quantity),
    quantity: parseInt(prod.quantity),
    productId: toString(prod.productId),
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
      <Pressable onPress={toggle}>
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
            }}
          >
            View order summary
          </Text>
          <Image source={icons.arrowDownIcon} />
        </View>
      </Pressable>

      <Button
        onPress={() => {
          dispatch(confirmVanSales(payload));
          navigator.navigate("SalesInvoice", {
            productsToSell,
            customer,
          });
          dispatch(updateInventory(payload2));
        }}
        disabled={productsToSell?.length === 0}
        buttonStyle={{
          backgroundColor: appTheme.COLORS.mainRed,
          width: "100%",
          height: 50,
          justifyContent: "center",
          borderRadius: 5,
          marginTop: 10,
        }}
        title={` Confirm \u20A6${getProductPrice()}`}
      />

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View style={styles.bottomSheetCard}>
          <ProductBottomSheetOneOf
            getTotalPrice={getTotalPrice}
            toggle={toggle}
            productsToSell={productsToSell}
            item={order}
            getQuantity={getQuantity}
            calNumberOfFull={calNumberOfFull}
            setEmpties={setEmpties}
            empties={empties}
            getEmptiesPrice={getEmptiesPrice}
            customer={customer}
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
                <Text style={{ fontSize: 17 }}>
                  Are you sure you want to sell your
                </Text>
                <Text style={{ fontSize: 17, textAlign: "center" }}>
                  section(s)?
                </Text>
              </View>

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
                onPress={() => setSalesCompleted(true)}
              >
                <Text style={{ color: appTheme.COLORS.white }}>Yes, sell</Text>
              </Pressable>
            </View>
          )}

          {salesCompleted && (
            <View style={{ alignItems: "center" }}>
              <Image source={icons.checkIcon} />

              <Text style={{ fontSize: 17, marginTop: 20, marginBottom: 20 }}>
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
                onPress={() =>
                  navigation.navigate("SalesInvoice", {
                    order,
                    productsToSell,
                  })
                }
              >
                <Text style={{ color: appTheme.COLORS.white, fontSize: 18 }}>
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

export default SellProductFooterOneOf;

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
    // height: Dimensions.get('window').height - StatusBar.currentHeight,
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
