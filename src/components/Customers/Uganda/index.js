import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";

import AllCustomers from "../../../components/Customers/Uganda/AllCustomers";
import Newcustomers from "../../../components/Customers/Uganda/NewCustomers";
import Bulkbreakers from "../../../components/Customers/Uganda/Bulkbreakers";
import Pocs from "../../../components/Customers/Uganda/Pocs";

import CustomersTab from "../../../components/Customers/Uganda/CustomersTab";
import { fetchOrder } from "../../../redux/actions/orderActions";
import { fetchProducts } from "../../../redux/actions/productActions";
import { getDistributorCustomers } from "../../../redux/actions/userActions";

const Uganda = () => {
  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();
  const userState = useSelector((state) => state.user);

  const { customers, stockist, outlet, user } = userState;

  const allTheCustomers = customers?.filter((customer) =>
    customer?.CUST_Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const theStockist = stockist?.filter((customer) =>
    customer?.CUST_Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const theOutlets = outlet?.filter((customer) =>
    customer?.CUST_Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const orders = useSelector((state) => state.orders);
  const { order: allOrders } = orders;

  const oneOff = allOrders?.filter(
    (order) => order?.buyerCompanyId === "One-Off Customer"
  );

  const oneOffCustomersName = oneOff?.map(
    (order) => order.buyerDetails[0].buyerName
  );

  const uniqueOneOffsCustomersNames = [...new Set(oneOffCustomersName)];

  const allCustomersLength = allTheCustomers.length;
  const stockistLength = theStockist.length;
  const outletLength = theOutlets.length;
  const oneOffLength = uniqueOneOffsCustomersNames?.length;

  const categories = [
    { name: "all", length: allCustomersLength },
    { name: "stockist", length: stockistLength },
    { name: "outlet", length: outletLength },
    { name: "new", length: oneOffLength },
  ];

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

  const ShowCustomers = (index) => {
    switch (index) {
      case 0:
        return <AllCustomers customers={allTheCustomers} />;

      case 1:
        return <Bulkbreakers customers={theStockist} />;

      case 2:
        return <Pocs customers={theOutlets} />;

      case 3:
        return (
          <Newcustomers
            uniqueOneOffsCustomersNames={uniqueOneOffsCustomersNames}
            oneOff={oneOff}
            products={products}
          />
        );

      default:
        return <AllCustomers customers={allTheCustomers} />;
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
        {ShowCustomers(index)}
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
    elevation: 10,
  },
});
