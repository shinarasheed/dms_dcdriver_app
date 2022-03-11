import React from "react";
import { FlatList, View, Text } from "react-native";
import appTheme from "../constants/theme";
import SellProductFlatListCard from "./SellProductFlatListCard";

const SellProductFlatList = ({
  inventory,
  getQuantity,
  getQuantity2,
  customerType,
}) => {
  return (
    <>
      {inventory?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={inventory}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => (
            <SellProductFlatListCard
              product={item}
              getQuantity={getQuantity}
              getQuantity2={getQuantity2}
              customerType={customerType}
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
              fontFamily: "Gilroy-Medium",
              fontSize: 20,
              color: appTheme.COLORS.mainRed,
              textAlign: "center",
            }}
          >
            Your Van is currently empty. Please replenish your van to be able to
            sell to customers
          </Text>
        </View>
      )}
    </>
  );
};

export default SellProductFlatList;
