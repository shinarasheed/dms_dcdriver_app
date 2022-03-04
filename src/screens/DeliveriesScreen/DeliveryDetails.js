import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, Image, Pressable, Platform } from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import axios from "axios";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { fetchOrder } from "../../redux/actions/orderActions";
import { fetchProducts } from "../../redux/actions/productActions";
import { orderUrl } from "../../utils/baseUrl";
import { Spinner } from "../../components/Spinner";

import OrderDetailsFooter from "../../components/OrderDetailsFooter";
import OrderDetailsBody from "../../components/OrderDetailsBody";
import OrderDetailsBottomSheet from "../../components/OrderDetailsBottomSheet";
import RejectOrderSheet from "../../components/RejectOrderSheet";

const DeliveryDetails = () => {
  const [loadingOrder, setLoadingOrder] = useState(false);
  const route = useRoute();
  const { item } = route.params;

  const userState = useSelector((state) => state.user);

  const { user } = userState;

  const { country } = user;

  const driverCountry = country === "UG" ? "Uganda" : "Nigeria";

  const [theOrder, settheOrder] = useState(item);

  const [visible, setVisible] = useState(false);
  const [productsVisibile, setProductsVisible] = useState(false);

  const navigation = useNavigation();

  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const { products } = allProducts;

  const updateOrderStatus = async (status) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        status,
      };
      setLoadingOrder(true);

      const { data: order } = await axios.patch(
        `${orderUrl}/UpdateOrder/UpdateStatus/${item.orderId}`,
        body,
        config
      );
      settheOrder(order?.order[0]);
      setLoadingOrder(false);
      dispatch(fetchOrder());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts(driverCountry));
  }, []);

  const getProductDetails = (productId) => {
    const x = products?.filter((product) => {
      return product?.id === +productId;
    })[0];
    return x;
  };

  const getTotalPrice = () => {
    return theOrder?.orderItems.reduce(
      (accumulator, order) =>
        accumulator +
        getProductDetails(order?.productId)?.price * order?.quantity,
      0
    );
  };

  function toggle() {
    setVisible(!visible);
  }

  function toggleProduct() {
    setProductsVisible(!productsVisibile);
  }

  return (
    <View style={{ backgroundColor: appTheme.COLORS.mainBackground, flex: 1 }}>
      {/* header */}

      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          flexDirection: "row",
          alignItems: "center",
          height: Platform.OS === "ios" ? 130 : 50,
          paddingLeft: 20,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
            setVisible(false);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={icons.backButton} />

          <Text
            style={{
              fontSize: 17,
              color: appTheme.COLORS.black,
              fontWeight: "800",
              marginLeft: 20,
            }}
          >
            Order {theOrder?.orderId}
          </Text>
        </Pressable>
      </View>

      <OrderDetailsBody
        theOrder={theOrder}
        getTotalPrice={getTotalPrice}
        getProductDetails={getProductDetails}
      />

      {loadingOrder ? <Spinner /> : null}

      {/* Footer */}

      <OrderDetailsFooter
        theOrder={theOrder}
        toggle={toggle}
        updateOrderStatus={updateOrderStatus}
        toggleProduct={toggleProduct}
      />

      <OrderDetailsBottomSheet
        productsVisibile={productsVisibile}
        toggleProduct={toggleProduct}
        toggle={toggle}
        getProductDetails={getProductDetails}
        theOrder={theOrder}
        visible={visible}
        setProductsVisible={setProductsVisible}
        updateOrderStatus={updateOrderStatus}
      />

      <RejectOrderSheet
        toggle={toggle}
        visible={visible}
        updateOrderStatus={updateOrderStatus}
      />
    </View>
  );
};

export default DeliveryDetails;
