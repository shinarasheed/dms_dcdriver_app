import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import appTheme from "../../../constants/theme";
import { fetchOrder } from "../../../redux/actions/orderActions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { icons } from "../../../constants";

import AllCustomers from "../../../components/Customers/AllCustomers";
import Newcustomers from "../../../components/Customers/NewCustomers";
import OneOfCustomers from "../../../components/Customers/OneOfCustomers";
import CustomersTab from "../../../components/Customers/CustomerTab";
import { fetchProducts } from "../../../redux/actions/productActions";

const Uganda = () => {
  const categories = ["all", "registered", "one-off"];
  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();

  const orders = useSelector((state) => state.orders);

  const userState = useSelector((state) => state.user);

  const { user } = userState;

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

  useEffect(() => {
    dispatch(getDistributorCustomers(user?.syspro_code));
  }, [user?.syspro_code]);

  const allProducts = useSelector((state) => state.products);

  const { products } = allProducts;

  const registeredCustomers = allOrders?.filter(
    (order) =>
      order.routeName === "SalesForce" || order.routeName === "Walk-In-Sales"
  );

  const oneOff = allOrders?.filter(
    (order) => order?.buyerCompanyId === "One-Off Customer"
  );

  const oneOffCustomersName = oneOff.map(
    (order) => order.buyerDetails[0].buyerName
  );

  const uniqueOneOffsCustomersNames = [...new Set(oneOffCustomersName)];

  const allOrdersNames = allOrders?.map(
    (order) => order?.buyerDetails[0]?.buyerName
  );

  const uniqueAllOrders = [...new Set(allOrdersNames)];

  const ShowCustomers = (index) => {
    switch (index) {
      case 0:
        return (
          <AllCustomers
            uniqueAllOrders={uniqueAllOrders}
            allOrders={allOrders}
            products={products}
          />
        );

      case 1:
        return (
          <Newcustomers allOrders={registeredCustomers} products={products} />
        );

      case 2:
        return (
          <OneOfCustomers
            uniqueOneOffsCustomersNames={uniqueOneOffsCustomersNames}
            allOrders={oneOff}
            products={products}
          />
        );

      default:
        return <AllCustomers allOrders={allOrders} products={products} />;
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: appTheme.COLORS.mainBackground }}
    >
      <Header headerText="Customers" />
      <View>
        <View style={{ paddingHorizontal: 20 }}>
          <CustomersTab
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
            onChangeText={(textValue) => setSearchTerm(textValue)}
          />
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
      </View>

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
        <Text style={{ fontSize: 17, fontFamily: "Gilroy-Light" }}>
          One-Off Sale
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Uganda;

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
    elevation: 5,
  },
});
