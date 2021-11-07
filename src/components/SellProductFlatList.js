import React from "react";
import { FlatList, View } from "react-native";
import appTheme from "../constants/theme";
import SellProductFlatListCard from "./SellProductFlatListCard";

const SellProductFlatList = ({ inventory, getQuantity }) => {
  return (
    <>
      <FlatList
        data={inventory}
        keyExtractor={(item, id) => id.toString()}
        renderItem={({ item }) => (
          <SellProductFlatListCard product={item} getQuantity={getQuantity} />
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
      />
    </>
  );
};

export default SellProductFlatList;
