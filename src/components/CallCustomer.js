import React from "react";
import {
  StyleSheet,
  Linking,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { icons } from "../constants";
import appTheme from "../constants/theme";

const CallCustomer = ({ phoneNumber }) => {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 60,
      }}
    >
      <Image source={icons.phoneIcon} />

      <Text
        style={{
          fontSize: 15,
          fontWeight: "500",
          marginLeft: 5,
          color: appTheme.COLORS.black,
        }}
      >
        Call
      </Text>
    </TouchableOpacity>
  );
};

export default CallCustomer;

const styles = StyleSheet.create({});
