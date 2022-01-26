import React from "react";
import { FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import PastDeliveryCard from "./PastDeliveryCard";

const PastDeliveryFlatList = ({ list, products }) => {
  return (
    <FlatList
      style={{ marginBottom: 100 }}
      data={list}
      keyExtractor={(item, id) => id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <PastDeliveryCard item={item} products={products} />
      )}
    />
  );
};

export default PastDeliveryFlatList;
