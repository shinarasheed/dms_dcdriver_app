import React from "react";
import { FlatList, Text, View } from "react-native";

import appTheme from "../../constants/theme";
import ProductCard from "../ProductCard";

const Products = ({ list }) => {
  return (
    <>
      {list?.length !== 0 ? (
        <FlatList
          data={list}
          keyExtractor={(item, id) => id.toString()}
          listKey={(item, id) => id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: appTheme.COLORS.mainRed,
              textAlign: "center",
              fontFamily: "Gilroy-Medium",
            }}
          >
            Product not Found
          </Text>
        </View>
      )}
    </>
  );
};

export default Products;
