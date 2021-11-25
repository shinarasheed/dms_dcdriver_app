import React from "react";
import { View, FlatList } from "react-native";
import PastDeliveryCard from "./PastDeliveryCard";
import appTheme from "../constants/theme";

const PastDeliveryFlatList = ({ list, products }) => {
  return (
    <>
      <FlatList
        data={list}
        style={{ marginBottom: 20 }}
        keyExtractor={(item, id) => id.toString()}
        listKey={(item) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PastDeliveryCard item={item} products={products} />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: appTheme.COLORS.borderGRey,
            }}
          ></View>
        )}
        contentContainerStyle={{
          backgroundColor: appTheme.COLORS.white,
        }}
      />
    </>
  );
};

export default PastDeliveryFlatList;
