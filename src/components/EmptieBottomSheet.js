import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";

import appTheme from "../constants/theme";
import CountryCurrency from "./user/CountryCurrency";

export default function EmptiesBottomSheet({ toggle, visible }) {
  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

  const Van = useSelector((state) => state.van);
  const { driverEmpties } = Van;

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

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Light",
                  }}
                >
                  Total Quantity:
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Bold",
                    marginLeft: 5,
                  }}
                >
                  {driverEmpties?.quantity}
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
                  <CountryCurrency
                    country={country}
                    price="22000"
                    color={appTheme.COLORS.black}
                    fontWeight="bold"
                  />
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
