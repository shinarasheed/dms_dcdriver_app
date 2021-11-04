import React from "react";
import { StyleSheet, View, Switch } from "react-native";
import CustomText from "./CustomText";
import appTheme from "../../constants/theme";

export default function CustomSwitch({ label, ...props }) {
  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>{label}</CustomText>
      <Switch
        trackColor={{
          false: appTheme.COLORS.MainGray,
          true: appTheme.COLORS.black,
        }}
        thumbColor={appTheme.COLORS.mainYellow}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginRight: 15,
  },
});
