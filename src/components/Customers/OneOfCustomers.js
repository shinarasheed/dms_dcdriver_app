import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import appTheme from "../../constants/theme";
import CustomerCard from "../CustomerCard";
import Icon from "react-native-vector-icons/MaterialIcons";

const AllCustomers = ({ allOrders }) => {
  const [registeredcustomers, setregisteredCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setregisteredCustomers(allOrders);
  }, []);

  const searchFunction = (text) => {
    setSearchValue(text);

    const updatedData = registeredcustomers?.filter(
      (item) =>
        item.buyerDetails[0]?.buyerName
          .toUpperCase()
          .indexOf(text.toUpperCase()) > -1
    );
    setregisteredCustomers(updatedData);
  };
  return (
    <View>
      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={25}
          style={{ color: appTheme.COLORS.MainGray }}
        />
        <TextInput
          placeholder="Search"
          style={{ fontSize: 18, paddingLeft: 5, flex: 1 }}
          value={searchValue}
          onChangeText={(text) => searchFunction(text)}
          autoCorrect={false}
        />
      </View>
      <FlatList
        style={{ marginTop: 20, marginBottom: 80 }}
        data={registeredcustomers}
        renderItem={({ item }) => (
          <CustomerCard order={item} allOrders={allOrders} />
        )}
        keyExtractor={(item, id) => id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: appTheme.COLORS.borderGRey,
            }}
          ></View>
        )}
      />
    </View>
  );
};

export default AllCustomers;

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
