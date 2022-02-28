import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import CustomerCard from "./CustomerCard";
import appTheme from "../../../constants/theme";

const NewCustomers = ({ customers }) => {
  return (
    <View>
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
    </View>
  );
};

export default NewCustomers;
