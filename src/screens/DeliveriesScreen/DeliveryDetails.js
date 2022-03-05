import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  Image,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { fetchOrder } from "../../redux/actions/orderActions";
import { fetchProducts } from "../../redux/actions/productActions";
import { orderUrl } from "../../utils/baseUrl";
import { Spinner } from "../../components/Spinner";

import { createAndSavePDF } from "../../utils/helpers";
import { simpleHtml } from "../../utils/html3";

import OrderDetailsFooter from "../../components/OrderDetailsFooter";
import OrderDetailsBody from "../../components/OrderDetailsBody";
import OrderDetailsBottomSheet from "../../components/OrderDetailsBottomSheet";
import RejectOrderSheet from "../../components/RejectOrderSheet";

export const createPdf = (htmlFactory) => async () => {
  try {
    const html = await htmlFactory();
    if (html) {
      await createAndSavePDF(html);
      Alert.alert(
        "Success!",
        "Invoice has been successfully generated and saved!"
      );
    }
  } catch (error) {
    Alert.alert("Error", error.message || "Something went wrong...");
  }
};

const DeliveryDetails = () => {
  const [distributor, setDistributor] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const route = useRoute();
  const { item } = route.params;
  // const { productsToSell, totalPrice, empties, order } = route.params;
  const userState = useSelector((state) => state.user);

  const { user } = userState;

  const { country } = user;

  const driverCountry = country === "UG" ? "Uganda" : "Nigeria";

  const [theOrder, settheOrder] = useState(item);

  const [visible, setVisible] = useState(false);
  const [productsVisibile, setProductsVisible] = useState(false);

  const getDistibutor = async () => {
    const distributor = JSON.parse(await AsyncStorage.getItem("distributor"));
    setDistributor(distributor);
  };

  useEffect(() => {
    getDistibutor();
  }, []);

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
    const x = products?.filter(
      (product) => product?.productId === productId.toString()
    )[0];
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

  // const captureAndShareScreenshot = () => {
  //   viewShot.current.capture().then((uri) => {
  //     console.log("do something with ", uri);
  //     Sharing.shareAsync("file://" + uri);
  //   }),
  //     (error) => console.error("Oops, snapshot failed", error);
  // };
  // invoice things
  // invoice things

  const [loadingKey, setLoadingKey] = useState(null);
  const pageMarginState = useState(false);
  const avoidSectionBreakingState = useState(false);
  const useImageFromAssetsState = useState(false);
  const useCameraState = useState(false);
  const optimizeImageState = useState(false);

  const onButtonPress = useCallback(
    (key, action) => async () => {
      try {
        if (action) {
          setLoadingKey(key);
          await action();
          setLoadingKey(null);
        }
      } catch (error) {
        setLoadingKey(null);
      }
    },
    []
  );

  const allButtons = useMemo(
    () => [
      {
        title: "Simple PDF",
        action: createPdf(
          simpleHtml(pageMarginState[0], theOrder, user, distributor)
        ),
        switches: [{ label: "Remove page margin", state: pageMarginState }],
      },
    ],
    [
      pageMarginState,
      avoidSectionBreakingState,
      useImageFromAssetsState,
      useCameraState,
      optimizeImageState,
    ]
  );

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

      {theOrder?.status === "Completed" && (
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          {allButtons.map(({ title, action }, index) => {
            const key = String(index);
            return (
              <TouchableOpacity
                key={key}
                disabled={!!loadingKey}
                isLoading={loadingKey === key}
                onPress={onButtonPress(key, action)}
                style={{
                  backgroundColor: appTheme.COLORS.mainRed,
                  borderRadius: 4,
                  width: "100%",
                  height: 45,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: appTheme.COLORS.white,
                    textAlign: "center",
                  }}
                >
                  Generate Invoice
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DeliveryDetails;
