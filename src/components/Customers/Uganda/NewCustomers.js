import React from "react";
import { FlatList, View } from "react-native";
import appTheme from "../../../constants/theme";
import CustomerCard from "./NewCustomerCard";

const NewCustomers = ({ uniqueOneOffsCustomersNames, oneOff, products }) => {
  return (
    <FlatList
      style={{ marginTop: 20, marginBottom: 120 }}
      data={uniqueOneOffsCustomersNames}
      renderItem={({ item }) => (
        <CustomerCard customer={item} oneOff={oneOff} products={products} />
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
