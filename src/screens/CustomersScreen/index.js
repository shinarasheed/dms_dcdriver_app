import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import appTheme from "../../constants/theme";
import CustomVirtualizedView from "../../components/VirtualizedList";
import { fetchOrder } from "../../redux/actions/orderActions";
import { icons } from "../../constants";

import AllCustomers from "../../components/Customers/AllCustomers";
import Newcustomers from "../../components/Customers/NewCustomers";
import OneOfCustomers from "../../components/Customers/OneOfCustomers";
import CustomersTab from "../../components/Customers/CustomerTab";
import { fetchProducts } from "../../redux/actions/productActions";

const CustomersScreen = () => {
  const categories = ["all", "registered", "one-off"];
  const [index, setIndex] = useState(0);

  const navigation = useNavigation();

  const orders = useSelector((state) => state.orders);
  const { loading, error, order: allOrders } = orders;
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrder());
    }, [])
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const allProducts = useSelector((state) => state.products);

  const { products } = allProducts;

  const oneOff = allOrders.filter((order) => order.routeName === "One-Off");
  const registeredCustomers = allOrders.filter(
    (order) =>
      order.routeName === "SalesForce" || order.routeName === "Walk-In-Sales"
  );

  const ShowCustomers = (index) => {
    switch (index) {
      case 0:
        return <AllCustomers allOrders={allOrders} products={products} />;

      case 1:
        return (
          <Newcustomers allOrders={registeredCustomers} products={products} />
        );

      case 2:
        return <OneOfCustomers allOrders={oneOff} products={products} />;

      default:
        return <AllCustomers allOrders={allOrders} products={products} />;
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: appTheme.COLORS.mainBackground }}
    >
      <Header headerText="Customers" />
      <CustomVirtualizedView>
        <View style={{ paddingHorizontal: 20 }}>
          <CustomersTab
            categories={categories}
            index={index}
            setIndex={setIndex}
          />
          {/* <SearchInput /> */}
        </View>

        {!loading ? (
          ShowCustomers(index)
        ) : (
          <ActivityIndicator
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            color={
              Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
            }
            animating={loading}
            size="large"
          />
        )}
      </CustomVirtualizedView>

      <Pressable
        style={{
          backgroundColor: appTheme.COLORS.white,
          width: 180,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 40,
          borderWidth: 1,
          borderColor: appTheme.COLORS.borderGRey,
          position: "absolute",
          right: 10,
          bottom: 10,
        }}
        onPress={() => navigation.navigate("AddCustomer")}
      >
        <Image style={{ marginRight: 10 }} source={icons.cartIcon} />
        <Text style={{ fontSize: 18 }}>One-Off Sale</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CustomersScreen;
