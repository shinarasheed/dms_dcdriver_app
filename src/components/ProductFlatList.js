import React from "react";
import { FlatList, ActivityIndicator, View } from "react-native";

import appTheme from "../constants/theme";
import ProductCard from "./ProductCard";

const ProductFlatList = ({ list, loading }) => {
  return (
    <FlatList
      style={{ marginBottom: 20 }}
      data={list}
      keyExtractor={(item, id) => id.toString()}
      listKey={(item, id) => id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProductCard item={item} />}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: appTheme.COLORS.borderGRey1,
          }}
        ></View>
      )}
    />
  );
};

export default ProductFlatList;
