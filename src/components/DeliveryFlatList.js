import React from "react";
import { FlatList, View, Text } from "react-native";
import DeliveryCard from "./DeliveryCard";

import appTheme from "../constants/theme";

const DeliveryFlatList = ({ list, products }) => {
  return (
    <>
      {list?.length !== 0 ? (
        <FlatList
          data={list}
          keyExtractor={(item, id) => id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DeliveryCard item={item} products={products} />
          )}
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
            No Deliveries
          </Text>
        </View>
      )}
    </>
  );
};

export default DeliveryFlatList;
