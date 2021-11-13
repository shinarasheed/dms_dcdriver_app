import React from "react";
import { FlatList, View } from "react-native";
import appTheme from "../constants/theme";
import SellProductFlatListCard from "./SellProductFlatListCard";

const SellProductFlatList = ({ inventory, getQuantity, getQuantity2 }) => {
  return (
    <>
      <FlatList
        data={inventory}
        keyExtractor={(item, id) => id.toString()}
        renderItem={({ item }) => (
          <SellProductFlatListCard
            product={item}
            getQuantity={getQuantity}
            getQuantity2={getQuantity2}
          />
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
