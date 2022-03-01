import React from "react";
import { FlatList, View } from "react-native";
import appTheme from "../../constants/theme";
import CustomerCard from "../CustomerCard";

const AllCustomers = ({ allOrders, products }) => {
  return (
    <FlatList
      style={{ marginBottom: 100 }}
      data={allOrders}
      renderItem={({ item }) => (
        <CustomerCard order={item} allOrders={allOrders} products={products} />
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
  );
};

export default AllCustomers;
