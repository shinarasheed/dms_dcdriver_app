import React from "react";
import { StyleSheet, Pressable, Text, View, TextInput } from "react-native";
import appTheme from "../constants/theme";

const Empties = ({ NumberOfFull, setEmpties, empties }) => {
  const newOrders = [];
  const incrementQuantityByTyping = (text, productId) => {
    // setValue(text);
    // const myproduct = newOrders?.find((item) => item?.productId === productId);
    // myproduct.quantity = text;
    // setNewOrders([...newOrders]);
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 17,
          color: appTheme.COLORS.mainTextGray,
          marginBottom: 20,
          fontFamily: "Gilroy-Medium",
        }}
      >
        Empties returned by customer
      </Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={[styles.productIncreaseDecreaseContainer, { marginRight: 5 }]}
        >
          <Pressable
            disabled={empties === 0 ? true : false}
            onPress={() => setEmpties(empties - 1)}
          >
            <Text style={styles.IncreaseText}>-</Text>
          </Pressable>
        </View>

        <TextInput
          style={{
            borderWidth: 1,
            width: 70,
            borderColor: appTheme.COLORS.borderGRey,
            marginRight: 5,
            borderRadius: 5,
            textAlign: "center",
            fontWeight: "bold",
            color: appTheme.COLORS.mainTextGray,
            ...appTheme.FONTS.mainFontLight,
          }}
          value={empties.toString()}
          onChangeText={(text) => setEmpties(text)}
        />

        <View style={styles.productIncreaseDecreaseContainer}>
          <Pressable
            disabled={empties >= NumberOfFull()}
            onPress={() => setEmpties(empties + 1)}
          >
            <Text style={styles.IncreaseText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Empties;

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
