import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { icons } from "../constants";

import appTheme from "../constants/theme";
import ProductCard from "./ProductCard";

const ProductFlatList = ({ list }) => {
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
            backgroundColor: appTheme.COLORS.white,
            height: 200,
            paddingTop: 15,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 15,
              color: appTheme.COLORS.MainGray,
              fontFamily: "Gilroy-Medium",
            }}
          >
            Recent replenishment
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={icons.loadVan} />
          </View>

          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
            }}
          >
            No recent replenishment
          </Text>
        </View>
      )}
    </>
  );
};

export default ProductFlatList;
