import React from "react";
import { View, FlatList } from "react-native";
import PastDeliveryCard from "./PastDeliveryCard";
import appTheme from "../constants/theme";

const PastDeliveryFlatList = ({ list }) => {
  return (
    <>
      <FlatList
        data={list}
        style={{ backgroundColor: appTheme.COLORS.white, marginBottom: 20 }}
        keyExtractor={(item, id) => id.toString()}
        listKey={(item) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PastDeliveryCard item={item} />}
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
    </>
  );
};

export default PastDeliveryFlatList;
