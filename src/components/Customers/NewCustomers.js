import React from "react";
import { FlatList, View } from "react-native";
import appTheme from "../../constants/theme";
import CustomerCard from "../CustomerCard";

const Newcustomers = ({ list, allOrders }) => {
  return (
    <FlatList
      style={{ marginTop: 20, marginBottom: 80 }}
      data={list}
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
  );
};

export default Newcustomers;
