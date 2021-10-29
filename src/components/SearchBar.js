import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import appTheme from "../constants/theme";

const SearchBar = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginBottom: 20,
      }}
    >
      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={25}
          style={{ color: appTheme.COLORS.MainGray }}
        />
        <TextInput
          placeholder="Search"
          style={{ fontSize: 18, paddingLeft: 5, flex: 1 }}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9799A0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
