import React from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import icons from "../constants/icons";

import appTheme from "../constants/theme";
import ProductBottomSheetCard from "./ProductBottomSheetCardOneOf";
import ProductFooterOneOf from "./ProductFooterOneOf";
import EmptiesCustomer from "./EmptiesCustomerOneOf";

const ProductBottomSheetOneOf = ({
  productsToSell,
  getTotalPrice,
  toggle,
  item,
  getQuantity,
  getQuantity2,
  calNumberOfFull,
  setEmpties,
  customer,
  getEmptiesPrice,
  empties,
}) => {
  return (
    <ScrollView>
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
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>Sell To {customer?.CUST_Name}</Text>
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
            fontWeight: "700",
            marginBottom: 10,
            color: appTheme.COLORS.black,
          }}
        >
          EMPTIES
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 15,
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

      {/* <FlatList
        data={productsToSell}
        keyExtractor={(item, id) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductBottomSheetCard
            productsToSell={productsToSell}
            item={item}
            getQuantity={getQuantity}
            getQuantity2={getQuantity2}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: appTheme.COLORS.Grey,
            }}
          ></View>
        )}
        ListFooterComponent={() => (
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
                fontWeight: "700",
                marginBottom: 10,
                color: appTheme.COLORS.black,
              }}
            >
              EMPTIES
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: appTheme.COLORS.MainGray,
                  }}
                >
                  Empties returning:
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: appTheme.COLORS.black,
                  }}
                >
                  {empties}
                </Text>
              </View>
            </View>
          </View>
        )}
      /> */}

      <ProductFooterOneOf
        getTotalPrice={getTotalPrice}
        order={item}
        productsToSell={productsToSell}
        customer={customer}
        toggle={toggle}
        empties={empties}
        getEmptiesPrice={getEmptiesPrice}
      />
    </ScrollView>
  );
};

export default ProductBottomSheetOneOf;

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
