import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Pressable,
  Image,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import SearchInput from "../../components/SearchInput";
import appTheme from "../../constants/theme";
import CustomVirtualizedView from "../../components/VirtualizedList";
import { icons } from "../../constants";
import DeliveryFlatList from "../../components/DeliveryFlatList";
import { fetchOrder } from "../../redux/actions/orderActions";
import PastDeliveryFlatList from "../../components/PastDeliveryFlatlist";
import DeliveriesTab from "../../components/DeliveriesTab";

export default function DeliveriesScreen() {
  const categories = ["new deliveries", "past deliveries"];
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.orders);
  const { loading, error, order } = allOrders;

  const theNewDeliveries = order.filter(
    (item) => item.status === "Assigned" || item.status === "Accepted"
  );

  const thePastDeliveries = order.filter(
    (item) => item.status === "Completed" || item.status === "Rejected"
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrder());
    }, [])
  );

  const ShowDeliveries = (index) => {
    switch (index) {
      case 0:
        return <DeliveryFlatList list={theNewDeliveries} />;

      case 1:
        return <PastDeliveryFlatList list={thePastDeliveries} />;

      default:
        return <DeliveryFlatList list={theNewDeliveries} />;
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: 40,
          paddingLeft: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 5,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={icons.backButton} style={{ marginRight: 18 }} />
        </Pressable>

        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            ...appTheme.FONTS.mainFontBold,
          }}
        >
          Deliveries
        </Text>
      </View>

      {/* header */}

      <CustomVirtualizedView>
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <DeliveriesTab
            categories={categories}
            index={index}
            setIndex={setIndex}
          />

          <SearchInput />
        </View>

        {order.length !== 0 ? (
          <>{ShowDeliveries(index)}</>
        ) : (
          <ActivityIndicator
            color={
              Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
            }
            animating={loading}
            size="large"
          />
        )}
      </CustomVirtualizedView>
    </SafeAreaView>
  );
}
