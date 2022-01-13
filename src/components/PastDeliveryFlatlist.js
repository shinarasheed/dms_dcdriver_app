import React from "react";
import { ScrollView } from "react-native";
import PastDeliveryCard from "./PastDeliveryCard";

const PastDeliveryFlatList = ({ list, products }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {list?.map((item, index) => (
        <PastDeliveryCard item={item} key={index} products={products} />
      ))}
    </ScrollView>
  );
};

export default PastDeliveryFlatList;
