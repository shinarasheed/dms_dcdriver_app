import React from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

import appTheme from "../../../constants/theme";
import ProductBottomSheetCard from "../../ProductBottomSheetCard";
import ProductFooter from "./ProductFooter";
import EmptiesCustomer from "../../EmptiesCustomer";
import CountryCurrency from "../../../components/user/CountryCurrency";
import { icons } from "../../../constants";

const ProductBottomSheet = ({
  productsToSell,
  getTotalPrice,
  toggle,
  customer,
  getQuantity,
  getQuantity2,
  calNumberOfFull,
  setEmpties,
  empties,
  getEmptiesPrice,
  getProductPrice,
}) => {
  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: appTheme.COLORS.borderGRey,
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "Gilroy-Medium" }}>
            Sell To {customer?.CUST_Name}
          </Text>
          <Pressable onPress={() => toggle()}>
            <Image source={icons.cancelIcon} />
          </Pressable>
        </View>

        <View>
          {/* empties */}
          {calNumberOfFull() ? (
            <EmptiesCustomer
              empties={empties}
              setEmpties={setEmpties}
              NumberOfFull={calNumberOfFull}
              toggle={toggle}
            />
          ) : null}
        </View>
      </View>

      <View>
        {productsToSell?.map((item, index) => {
          return (
            <ProductBottomSheetCard
              key={index}
              productsToSell={productsToSell}
              item={item}
              getQuantity={getQuantity}
              getQuantity2={getQuantity2}
            />
          );
        })}
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: appTheme.COLORS.borderGRey,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            marginBottom: 10,
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Medium",
          }}
        >
          EMPTIES
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: appTheme.COLORS.MainGray,
                fontFamily: "Gilroy-Medium",
              }}
            >
              Empties returning:
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: appTheme.COLORS.black,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {" "}
              {empties}
            </Text>
          </View>
        </View>
      </View>

      <ProductFooter
        getTotalPrice={getTotalPrice}
        customer={customer}
        productsToSell={productsToSell}
        toggle={toggle}
        empties={empties}
        getEmptiesPrice={getEmptiesPrice}
        getProductPrice={getProductPrice}
      />
    </ScrollView>
  );
};

export default ProductBottomSheet;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: "bold",
    fontSize: 20,
  },
});
