import React from "react";
import { FlatList, View } from "react-native";
import appTheme from "../../../constants/theme";
import CustomerCard from "./CustomerCard";

const AllCustomers = ({ customers }) => {
  return (
    <FlatList
      style={{ marginTop: 20, marginBottom: 100 }}
      data={customers}
      renderItem={({ item }) => <CustomerCard customer={item} />}
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
