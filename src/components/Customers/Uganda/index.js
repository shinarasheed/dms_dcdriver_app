import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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
  const categories = ["all", "bulkbreakers", "pocs", "new"];
  const [index, setIndex] = useState(0);
  const [theBulkBreakers, setTheBulkbreakers] = useState([]);
  const [thePocs, setThePocs] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [newCusomers, setNewCustomers] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    setAllCustomers(customers);
    setTheBulkbreakers(bulkbreakers);
    setThePocs(pocs);
    setNewCustomers(customers);
  }, [customers]);

  const userState = useSelector((state) => state.user);

  const { customers, user, bulkbreakers, pocs } = userState;

  const ShowCustomers = (index) => {
    switch (index) {
      case 0:
        return <AllCustomers customers={allCustomers} />;

      case 1:
        return <Bulkbreakers customers={theBulkBreakers} />;

      case 2:
        return <Pocs customers={thePocs} />;

      case 3:
        return <Newcustomers customers={newCusomers} />;

      default:
        return <AllCustomers customers={customers} />;
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
        </View>
        {ShowCustomers(index)}
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
        <Text style={{ fontSize: 17, fontFamily: "Gilroy-Light" }}>
          One-Off Sale
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Uganda;
