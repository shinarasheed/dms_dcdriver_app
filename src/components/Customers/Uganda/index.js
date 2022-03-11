import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import appTheme from "../../../constants/theme";
import CustomVirtualizedView from "../../../components/VirtualizedList";
import { icons } from "../../../constants";

import AllCustomers from "../../../components/Customers/Uganda/AllCustomers";
import Newcustomers from "../../../components/Customers/Uganda/NewCustomers";
import Bulkbreakers from "../../../components/Customers/Uganda/Bulkbreakers";
import Pocs from "../../../components/Customers/Uganda/Pocs";

import CustomersTab from "../../../components/Customers/Uganda/CustomersTab";

const Uganda = () => {
  const categories = ["all", "mainstream", "high-end", "low-end", "reseller"];
  const [index, setIndex] = useState(0);
  const [theMainStream, setTheMainStream] = useState([]);
  const [thePocs, setThePocs] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [newCusomers, setNewCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();
  const userState = useSelector((state) => state.user);

  const { customers, mainstream, highEnd, lowEnd, reseller } = userState;

  const allTheCustomers = customers?.filter((customer) =>
    customer?.CUST_Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const mainStreamCustomers = theMainStream?.filter((customer) =>
    customer?.CUST_Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const highEndCustomers = highEnd?.filter((customer) =>
    customer?.CUST_Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const lowEndCustomers = lowEnd?.filter((customer) =>
    customer?.CUST_Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const resellerCustomers = reseller?.filter((customer) =>
    customer?.CUST_Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const ShowCustomers = (index) => {
    switch (index) {
      case 0:
        return <AllCustomers customers={allTheCustomers} />;

      case 1:
        return <Bulkbreakers customers={mainstream} />;

      case 2:
        return <Pocs customers={highEndCustomers} />;

      case 3:
        return <Newcustomers customers={lowEndCustomers} />;

      case 4:
        return <Newcustomers customers={resellerCustomers} />;

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
