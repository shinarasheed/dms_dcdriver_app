import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";

import appTheme from "../constants/theme";
import { formatPrice } from "../utils/formatPrice";

export default function EmptiesBottomSheet({ toggle, visible }) {
  return (
    <View style={styles.container}>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View style={styles.card}>
          <TouchableOpacity>
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Gilroy-Bold",
                  marginBottom: 10,
                }}
              >
                EMPTIES
              </Text>

              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Light",
                  }}
                >
                  Total Quantity
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Light",
                    color: appTheme.COLORS.black,
                  }}
                >
                  Price per Case
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Bold",
                    color: appTheme.COLORS.black,
                    marginLeft: 10,
                  }}
                >
                  {"\u20A6"}
                  {formatPrice(1000)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    height: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
});
