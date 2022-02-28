import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { formatPrice } from "../../utils/formatPrice";
import appTheme from "../../constants/theme";

const CountryCurrency = ({
  country,
  price,
  color,
  fontSize,
  fontWeight,
  fontFamily,
  marginLeft,
}) => {
  return (
    <View>
      {country === "UG" ? (
        <Text
          style={{
            fontSize: fontSize,
            color: color,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            marginLeft: marginLeft,
          }}
        >
          UGX{formatPrice(price)}
        </Text>
      ) : (
        <Text
          style={{
            fontSize: fontSize,
            color: color,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            marginLeft: marginLeft,
          }}
        >
          {"\u20A6"}
          {formatPrice(price)}
        </Text>
      )}
    </View>
  );
};

export default CountryCurrency;

const styles = StyleSheet.create({});
