import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  View,
  Text,
  TextInput,
  Keyboard,
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

  const handleChangeText = (text) => {
    setSearchValue(text);
    const deliveries = newDeliveries?.filter((item) => {
      return item?.buyerDetails[0]?.buyerName
        .toLowerCase()
        .includes(text.toLowerCase());
    });

    setTheNewDeliveries(deliveries);
  };

  const ShowDeliveries = (index) => {
    switch (index) {
      case 0:
        return <DeliveryFlatList list={theNewDelivery} products={products} />;

      case 1:
        return (
          <PastDeliveryFlatList list={thePastDeliveries} products={products} />
        );

      default:
        return <DeliveryFlatList list={theNewDelivery} products={products} />;
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: StatusBar.currentHeight * 2.5,
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

      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <DeliveriesTab
          categories={categories}
          index={index}
          setIndex={setIndex}
        />

        <View>
          <View style={styles.searchInputContainer}>
            <Icon
              name="search"
              size={25}
              style={{ color: appTheme.COLORS.MainGray }}
            />
            <TextInput
              placeholder="Search"
              style={{
                fontSize: 15,
                paddingLeft: 5,
                flex: 1,
                fontFamily: "Gilroy-Medium",
              }}
              value={searchValue}
              onChangeText={(text) => handleChangeText(text)}
            />
          </View>
        </View>
      </View>

      {order?.length !== 0 ? <>{ShowDeliveries(index)}</> : <Spinner />}
    </ScrollView>
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
