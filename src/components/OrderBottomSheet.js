import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import icons from "../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import appTheme from "../constants/theme";
import OrderBottomSheetCard from "./OrderBottomSheetCard";
import OrderFooter from "./OrderFooter";
import { fetchProducts } from "../redux/actions/productActions";
import { fetchVanProducts } from "../redux/actions/vanActions";
import Empties from "./Empties";
import CountryCurrency from "./user/CountryCurrency";

const OrderBottomSheet = ({
  item,
  toggle,
  setVisible,
  updateOrderStatus,
  visible,
}) => {
  const [driver, setDriver] = useState(null);

  const allProducts = useSelector((state) => state.products);
  const [newOrders, setNewOrders] = useState([]);

  const Van = useSelector((state) => state.van);
  const { inventory, loading: vanLoading, error: vanError } = Van;

  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

  const setTheDriver = async () => {
    const driver = JSON.parse(await AsyncStorage.getItem("driverDetails"));
    setDriver(driver);
  };

  useEffect(() => {
    setTheDriver();
  }, []);

  useEffect(() => {
    dispatch(fetchVanProducts());
  }, []);

  const getQuantity = (productId, quantity) => {
    return (
      quantity <
      inventory.find((product) => product?.product?.productId === productId)
        ?.quantity
    );
  };

  const dispatch = useDispatch();

  const [empties, setEmpties] = useState(0);

  const getEmptiesPrice = () => {
    return empties * 1000;
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { products } = allProducts;

  const createNewProducts = () => {
    item?.orderItems?.map((theOrder, index) => {
      const orderDetails = products?.filter(
        (item) => item.productId === theOrder?.productId
      )[0];

      newOrders.unshift({
        productId: theOrder?.productId,
        quantity: parseInt(theOrder?.quantity),
        brand: orderDetails?.brand,
        price: parseInt(theOrder?.price),
        productType: orderDetails?.productType,
        unitPrice: parseInt(theOrder?.price / theOrder?.quantity),
        orderId: theOrder?.orderId,
        imageUrl: orderDetails?.imageUrl,
        sku: orderDetails?.sku,
        productPrice: orderDetails?.price,
      });
    });
  };

  useEffect(() => {
    createNewProducts();
  }, []);

  const getTotalPrice = () => {
    return newOrders.reduce(
      (accumulator, item) => accumulator + item.productPrice * item.quantity,
      0
    );
  };

  const incrementQuantity = (productId) => {
    let product = newOrders?.find(
      (product) => parseInt(product?.productId) === parseInt(productId)
    );
    product.quantity++;
    setNewOrders([...newOrders]);
  };

  const decrementQuantity = (productId) => {
    const product = newOrders?.find(
      (product) => product?.productId === productId
    );
    if (product.quantity === 1) {
      const index = newOrders?.findIndex(
        (product) => product?.productId === productId
      );
      newOrders.splice(index, 1);
      setNewOrders([...newOrders]);
    } else {
      product.quantity--;
      setNewOrders([...newOrders]);
    }
  };

  const deleteProduct = (productId) => {
    const index = newOrders?.findIndex(
      (product) => product?.productId === productId
    );
    newOrders.splice(index, 1);
    setNewOrders([...newOrders]);
  };

  const calNumberOfFull = () => {
    return newOrders
      ?.filter((product) => product.productType === "full")
      ?.reduce((acc, index) => parseInt(acc) + parseInt(index?.quantity), 0);
  };

  const getTotal = () => {
    return getTotalPrice() + (calNumberOfFull() - empties) * 1000;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: appTheme.COLORS.borderGRey,
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Gilroy-Medium" }}>
            Order Delivery
          </Text>
          <Pressable onPress={() => toggle()}>
            <Image source={icons.cancelIcon} />
          </Pressable>
        </View>

        {calNumberOfFull() ? (
          <Empties
            empties={empties}
            setEmpties={setEmpties}
            NumberOfFull={calNumberOfFull}
            toggle={toggle}
          />
        ) : null}
      </View>

      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        {newOrders.map((item, index) => {
          return (
            <OrderBottomSheetCard
              key={index}
              order={item}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              deleteProduct={deleteProduct}
              getQuantity={getQuantity}
              newOrders={newOrders}
              setNewOrders={setNewOrders}
              getTotalPrice={getTotal}
            />
          );
        })}
      </View>

      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: appTheme.COLORS.black,
              marginRight: 5,
            }}
          >
            EMPTIES
          </Text>

          <CountryCurrency
            country={country}
            price="22000"
            color={appTheme.COLORS.black}
            fontSize={14}
            fontWeight="bold"
            fontFamily="Gilroy-Bold"
          />

          <Text>/empties</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginRight: 30,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 16, color: appTheme.COLORS.MainGray }}>
                Empties returning:
              </Text>
              <Text style={{ fontSize: 16, color: appTheme.COLORS.black }}>
                {empties}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <OrderFooter
        order={item}
        productsToSell={newOrders}
        getTotalPrice={getTotal}
        getEmptiesPrice={getEmptiesPrice}
        setVisible={setVisible}
        visible={visible}
        newOrders={newOrders}
        setNewOrders={setNewOrders}
        empties={empties}
        driver={driver}
        updateOrderStatus={updateOrderStatus}
        toggle={toggle}
      />
    </ScrollView>
  );
};

export default OrderBottomSheet;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: "bold",
    fontSize: 20,
  },
});
