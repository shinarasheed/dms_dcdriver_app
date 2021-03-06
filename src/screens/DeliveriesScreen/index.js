import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  View,
  Text,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import DeliveryFlatList from "../../components/DeliveryFlatList";
import { fetchOrder } from "../../redux/actions/orderActions";
import PastDeliveryFlatList from "../../components/PastDeliveryFlatlist";
import DeliveriesTab from "../../components/DeliveriesTab";
import { Spinner } from "../../components/Spinner";
import { fetchProducts } from "../../redux/actions/productActions";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

export default function DeliveriesScreen() {
  const categories = ["new deliveries", "past deliveries"];
  const [searchValue, setSearchValue] = useState("");

  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.orders);
  const { loading, error, order, newDeliveries, pastDeliveries } = allOrders;

  const allProducts = useSelector((state) => state.products);

  const { products } = allProducts;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [theNewDelivery, setTheNewDeliveries] = useState([]);
  const [thePastDeliveries, setPastDeliveries] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrder());
    }, [])
  );

  useEffect(() => {
    setTheNewDeliveries(newDeliveries);
    setPastDeliveries(pastDeliveries);
  }, [order]);

  const deliveries = newDeliveries?.filter((item) => {
    return item?.buyerDetails[0]?.buyerName
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });

  const pastdeliveries = thePastDeliveries?.filter((item) => {
    return item?.buyerDetails[0]?.buyerName
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });

  const ShowDeliveries = (index) => {
    switch (index) {
      case 0:
        return <DeliveryFlatList list={deliveries} products={products} />;

      case 1:
        return (
          <PastDeliveryFlatList list={pastdeliveries} products={products} />
        );

      default:
        return <DeliveryFlatList list={deliveries} products={products} />;
    }
  };

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: Platform.OS === "ios" ? 130 : StatusBar.currentHeight * 2.5,
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
            fontFamily: "Gilroy-Medium",
          }}
        >
          Deliveries
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <DeliveriesTab
          categories={categories}
          index={index}
          setIndex={setIndex}
        />
      </View>

      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={20}
          style={{ color: appTheme.COLORS.mainYellow }}
        />

        <TextInput
          placeholder="Search"
          style={{
            fontSize: 15,
            paddingLeft: 5,
            flex: 1,
            fontFamily: "Gilroy-Medium",
          }}
          onChangeText={(text) => setSearchValue(text)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {order?.length !== 0 ? <>{ShowDeliveries(index)}</> : <Spinner />}
        </View>
      </ScrollView>
    </View>
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
    borderWidth: 0,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 5,
  },
});
