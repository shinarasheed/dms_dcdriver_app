import React from "react";
import { FlatList, View } from "react-native";
import appTheme from "../../constants/theme";
import CustomerCardNigeria from "../CustomerCardNigeria";

const AllCustomers = ({ allOrders, uniqueAllOrders, products }) => {
  return (
    <FlatList
      style={{ marginBottom: 100 }}
      data={uniqueAllOrders}
      renderItem={({ item }) => (
        <CustomerCardNigeria
          customer={item}
          allOrders={allOrders}
          products={products}
        />
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
