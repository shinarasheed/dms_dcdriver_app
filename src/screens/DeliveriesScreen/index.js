import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  View,
  Text,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import appTheme from "../../constants/theme";
import CustomVirtualizedView from "../../components/VirtualizedList";
import { icons } from "../../constants";
import DeliveryFlatList from "../../components/DeliveryFlatList";
import { fetchOrder } from "../../redux/actions/orderActions";
import PastDeliveryFlatList from "../../components/PastDeliveryFlatlist";
import DeliveriesTab from "../../components/DeliveriesTab";
import { Spinner } from "../../components/Spinner";

export default function DeliveriesScreen() {
  const categories = ["new deliveries", "past deliveries"];
  const [newDeliveries, setNewDeliveries] = useState([]);
  const [pastDeliveries, setPastDeliveries] = useState([]);

  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.orders);
  const { loading, error, order } = allOrders;

  const theNewDeliveries = order?.filter(
    (item) => item.status === "Assigned" || item.status === "Accepted"
  );

  const thePastDeliveries = order?.filter(
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

          <View
            style={{
              marginBottom: 20,
            }}
          >
            <View style={styles.searchInputContainer}>
              <Icon
                name="search"
                size={25}
                style={{ color: appTheme.COLORS.MainGray }}
              />
              <TextInput
                placeholder="Search"
                style={{ fontSize: 18, paddingLeft: 5, flex: 1 }}
              />
            </View>
          </View>
        </View>

        {order?.length !== 0 ? <>{ShowDeliveries(index)}</> : <Spinner />}
      </CustomVirtualizedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9799A0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
