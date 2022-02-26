import React from "react";
import { FlatList } from "react-native";
import DeliveryCard from "./DeliveryCard";

const DeliveryFlatList = ({ list, products }) => {
  return (
    <>
      <FlatList
        data={list}
        keyExtractor={(item, id) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DeliveryCard item={item} products={products} />
        )}
      />
    </>
  );
};

export default DeliveryFlatList;
