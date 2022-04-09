import React from "react";
import { FlatList, View } from "react-native";
import appTheme from "../../../constants/theme";
import CustomerCard from "./NewCustomerCard";

const NewCustomers = ({ oneOff, products }) => {
  return (
    <FlatList
      style={{ marginTop: 20, marginBottom: 120 }}
      data={oneOff}
      renderItem={({ item }) => (
        <CustomerCard order={item} oneOff={oneOff} products={products} />
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

export default NewCustomers;
