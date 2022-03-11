import React, { useState } from "react";
import { SafeAreaView, Pressable, Image, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import appTheme from "../../constants/theme";
import SellProductFlatListOneOff from "../../components/SellProdudtFlatListOneOff";
import SellProductFooterOneOf from "../../components/SellProductFooterOneOf";
import { icons } from "../../constants";
import { fetchVanProducts } from "../../redux/actions/vanActions";
import { Spinner } from "../../components/Spinner";

const SellToCustomer = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const order = route.params;

  const Van = useSelector((state) => state.van);
  const { inventory, newinventory, loading: vanLoading } = Van;

  const theCustomer = useSelector((state) => state.customerOneOf);

  const { customer } = theCustomer;

  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchVanProducts());
    }, [])
  );

  const getQuantity = (productId, quantity) => {
    return (
      quantity <=
      inventory?.find((product) => product?.product?.productId === productId)
        ?.quantity
    );
  };

  const getQuantity2 = (productId, quantity) => {
    return (
      quantity <
      inventory?.find((product) => product?.product?.productId === productId)
        ?.quantity
    );
  };

  const [empties, setEmpties] = useState(0);

  const getEmptiesPrice = () => {
    if (country === "UG") {
      return empties * 22000;
    } else {
      return empties * 1000;
    }
  };

  const getTotalPrice = () => {
    return newinventory?.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
  };

  const calNumberOfFull = () => {
    return newinventory
      ?.filter((product) => product.productType === "full")
      ?.reduce((acc, index) => parseInt(acc) + parseInt(index?.quantity), 0);
  };

  const getTotal = () => {
    if (country === "UG") {
      return getTotalPrice() + (calNumberOfFull() - empties) * 22000;
    } else {
      return getTotalPrice() + (calNumberOfFull() - empties) * 1000;
    }
  };

  const productsToSell = newinventory?.filter(
    (product) => product.quantity > 0
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
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
          {customer?.CUST_Name !== undefined
            ? `sell to ${customer?.CUST_Name}`
            : null}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        {!vanLoading ? (
          <SellProductFlatListOneOff
            inventory={newinventory}
            loading={vanLoading}
            getQuantity={getQuantity}
            getQuantity2={getQuantity2}
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

      {/* 
      {/* Footer */}
      <SellProductFooterOneOf
        getTotalPrice={getTotal}
        getProductPrice={getTotalPrice}
        getEmptiesPrice={getEmptiesPrice}
        productsToSell={productsToSell}
        order={order}
        getQuantity={getQuantity}
        getQuantity2={getQuantity2}
        calNumberOfFull={calNumberOfFull}
        setEmpties={setEmpties}
        empties={empties}
        customer={customer}
      />
    </SafeAreaView>
  );
};

export default SellToCustomer;
