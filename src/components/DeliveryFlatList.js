import React, { useState } from "react";
import { View, FlatList } from "react-native";
import DeliveryCard from "./DeliveryCard";
import appTheme from "../constants/theme";

const DeliveryFlatList = ({ list }) => {
  return (
    <>
      <FlatList
        data={list}
        style={{ marginBottom: 20 }}
        keyExtractor={(item, id) => id.toString()}
        listKey={(item) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <DeliveryCard item={item} />}
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

export default DeliveryFlatList;
