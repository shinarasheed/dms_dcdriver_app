import React, { useState } from "react";
import { Pressable, Image, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import appTheme from "../../constants/theme";
import SellProductFlatList from "../../components/SellProductFlatList";
import SellProductFooter from "../../components/Customers/Uganda/SellProductFooter";
import { icons } from "../../constants";
import { fetchVanProducts } from "../../redux/actions/vanActions";
import { Spinner } from "../../components/Spinner";

const SellToCustomer = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const { customer } = route.params;

  const { CUST_Type } = customer;

  console.log(CUST_Type);

  const Van = useSelector((state) => state.van);
  const { inventory, newinventory, loading: vanLoading, error: vanError } = Van;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchVanProducts());
    }, [])
  );

  const getQuantity = (productId, quantity) => {
    return (
      quantity <=
      inventory.find((product) => product?.product?.productId === productId)
        ?.quantity
    );
  };

  const getQuantity2 = (productId, quantity) => {
    return (
      quantity <
      inventory.find((product) => product?.product?.productId === productId)
        ?.quantity
    );
  };

  const [empties, setEmpties] = useState(0);

  const getEmptiesPrice = () => {
    return empties * 22000;
  };

  const getTotalPrice = () => {
    return newinventory?.reduce(
      (accumulator, item) =>
        accumulator +
        (CUST_Type === "Reseller"
          ? item?.reseller_price
          : CUST_Type === "Mainstream"
          ? item?.main_stream_price
          : CUST_Type === "Low End"
          ? item?.low_end_price
          : CUST_Type === "High End"
          ? item?.high_end_price
          : item?.price) *
          item?.quantity,
      0
    );
  };

  const calNumberOfFull = () => {
    return newinventory
      ?.filter((product) => product.productType === "full")
      ?.reduce((acc, index) => parseInt(acc) + parseInt(index?.quantity), 0);
  };

  const getTotal = () => {
    return getTotalPrice() + (calNumberOfFull() - empties) * 22000;
  };

  const productsToSell = newinventory?.filter(
    (product) => product?.quantity > 0
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}
    >
      {/* header */}
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: 40,
          paddingLeft: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigator.goBack()}>
          <Image source={icons.backButton} style={{ marginRight: 18 }} />
        </Pressable>

        <Text
          style={{
            fontSize: 17,
            textTransform: "capitalize",
            fontFamily: "Gilroy-Medium",
          }}
        >
          sell to {customer.CUST_Name}
        </Text>
      </View>

      {/* header */}

      <View
        style={{
          flex: 1,
        }}
      >
        {!vanLoading ? (
          <SellProductFlatList
            inventory={newinventory}
            getQuantity={getQuantity}
            getQuantity2={getQuantity2}
            loading={vanLoading}
            customerType={CUST_Type}
          />
        ) : (
          <Spinner
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
      </View>

      {/* Footer */}
      <SellProductFooter
        getTotalPrice={getTotal}
        getProductPrice={getTotalPrice}
        getEmptiesPrice={getEmptiesPrice}
        productsToSell={productsToSell}
        customer={customer}
        getQuantity={getQuantity}
        getQuantity2={getQuantity2}
        calNumberOfFull={calNumberOfFull}
        setEmpties={setEmpties}
        empties={empties}
      />
    </View>
  );
};

export default SellToCustomer;
