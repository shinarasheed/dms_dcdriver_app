import React from "react";
import { ScrollView } from "react-native";
import DeliveryCard from "./DeliveryCard";

const DeliveryFlatList = ({ list, products }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {list?.map((item, index) => (
        <DeliveryCard item={item} key={index} products={products} />
      ))}
    </ScrollView>
  );
};

export default DeliveryFlatList;
