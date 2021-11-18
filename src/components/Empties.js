import React, { useState } from "react";
import { StyleSheet, Pressable, Text, TextInput, View } from "react-native";
import appTheme from "../constants/theme";
import { icons } from "../constants";

const Empties = ({ NumberOfFull, setEmpties, empties }) => {
  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 17,
            color: appTheme.COLORS.mainTextGray,
            marginBottom: 20,
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
            style={[
              styles.productIncreaseDecreaseContainer,
              { marginRight: 5 },
            ]}
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
              color: appTheme.COLORS.MainGray,
              fontWeight: "bold",
            }}
            value={empties}
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
    </>
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
