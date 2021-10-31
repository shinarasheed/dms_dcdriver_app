import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { BottomSheet } from "react-native-btr";
import { Button } from "react-native-elements";

import DeliverOrderCard from "../../components/DeliverOrderCard";
import CustomVirtualizedView from "../../components/VirtualizedList";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import OrderBottomSheet from "../../components/OrderBottomSheet";
import { fetchProducts } from "../../redux/actions/productActions";
import { fetchOrder } from "../../redux/actions/orderActions";
import CallCustomer from "../../components/CallCustomer";

const DeliverOrder = () => {
  const [theOrder, setTheOrder] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();

  const route = useRoute();
  const item = route.params;

  const allProducts = useSelector((state) => state.products);
  const { products, loading } = allProducts;

  const updateOrder = useSelector((state) => state.updateOrder);

  const {
    updatedOrder,
    loading: updatedLoading,
    error: updatedError,
  } = updateOrder;

  useEffect(() => {
    setTimeout(() => {
      if (!updatedOrder?.orderId) {
        setTheOrder(item);
      }
      setTheOrder(updatedOrder);
    }, 600);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const getProductDetails = (productId) => {
    const x = products.filter(
      (product) => product.productId === productId.toString()
    )[0];

    return x;
  };

  const getTotalPrice = () => {
    return theOrder?.orderItems.reduce(
      (accumulator, order) =>
        accumulator +
        order?.quantity * getProductDetails(order?.productId)?.price,
      0
    );
  };

  function toggle() {
    setVisible(!visible);
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: appTheme.COLORS.mainBackground, flex: 1 }}
    >
      <View style={styles.detailsHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={icons.backButton} />
        </Pressable>
        <Text style={styles.headerText}>Order {theOrder?.orderId}</Text>
      </View>

      {!updatedLoading ? (
        <>
          <CustomVirtualizedView>
            <View style={{ paddingLeft: 20, paddingVertical: 20 }}>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 17,
                    marginRight: 5,
                    textTransform: "lowercase",
                  }}
                >
                  {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                    "MMM Do, YYYY"
                  )}{" "}
                  at{" "}
                  {new Date(
                    theOrder?.orderStatus[0]?.timeAssigned
                  ).toLocaleTimeString()}{" "}
                  from
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    color: appTheme.COLORS.black,
                  }}
                >
                  {theOrder?.buyerDetails[0]?.buyerName}
                </Text>
              </View>
              {theOrder?.orderItems !== undefined && (
                <View
                  style={{
                    width: 100,
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    fontWeight: "600",
                    borderRadius: 20,
                    backgroundColor: appTheme.COLORS.mainYellow,
                  }}
                >
                  <Text style={{ color: appTheme.COLORS.white }}>
                    {theOrder?.orderStatus[0]?.status}
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                backgroundColor: appTheme.COLORS.white,
                paddingLeft: 20,
                paddingVertical: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: appTheme.COLORS.MainGray,
                    fontSize: 20,
                    marginBottom: 20,
                  }}
                >
                  Customer
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: appTheme.COLORS.black,
                    ...appTheme.FONTS.mainFontBold,
                  }}
                >
                  {theOrder?.buyerDetails[0]?.buyerName}{" "}
                </Text>
              </View>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Image source={icons.addressIcon} />
                <View style={{ marginLeft: 10, paddingRight: 50 }}>
                  <Text
                    style={{ marginBottom: 5, fontSize: 17, lineHeight: 25 }}
                  >
                    {theOrder?.buyerDetails[0]?.buyerAddress}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      marginBottom: 10,
                      color: appTheme.COLORS.black,
                    }}
                  >
                    Customer local government area
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textTransform: "uppercase",
                      color: appTheme.COLORS.black,
                    }}
                  >
                    {theOrder?.buyerDetails[0]?.buyerAddress}
                  </Text>

                  <View style={{ marginTop: 20, flexDirection: "row" }}>
                    <Text
                      style={{ fontSize: 15, color: appTheme.COLORS.black }}
                    >
                      {theOrder?.buyerDetails[0]?.buyerPhoneNumber}
                    </Text>

                    <CallCustomer
                      phoneNumber={theOrder?.buyerDetails[0]?.buyerPhoneNumber}
                    />
                  </View>
                </View>
              </View>
            </View>

            <FlatList
              style={{
                backgroundColor: appTheme.COLORS.white,
                marginTop: 25,
                marginBottom: 25,
              }}
              data={theOrder?.orderItems}
              keyExtractor={(item, id) => id.toString()}
              renderItem={({ item }) => (
                <DeliverOrderCard
                  order={item}
                  getProductDetails={getProductDetails}
                />
              )}
              ListHeaderComponent={() => (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: appTheme.COLORS.Grey,
                    paddingVertical: 20,
                    paddingLeft: 10,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    Order Summary
                  </Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingRight: 30,
                    paddingLeft: 100,
                    paddingBottom: 20,
                  }}
                >
                  <Text>Total amount</Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      marginLeft: 80,
                    }}
                  >
                    {"\u20A6"}
                    {getTotalPrice()}
                  </Text>
                </View>
              )}
            />

            {/* TimeLine */}

            <View
              style={{
                backgroundColor: appTheme.COLORS.white,
                marginBottom: 20,
                paddingLeft: 20,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                  fontWeight: "bold",
                  color: appTheme.COLORS.black,
                }}
              >
                Timeline
              </Text>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    style={{ width: 16, height: 16, marginRight: 5 }}
                    source={icons.smallCheckIcon}
                  />
                  <Text> Accepted on </Text>
                  <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
                    {moment(theOrder?.orderStatus[0]?.dateAccepted).format(
                      "MMM Do, YY"
                    )}{" "}
                    at{" "}
                    {new Date(
                      theOrder?.orderStatus[0]?.timeAccepted
                    ).toLocaleTimeString()}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: 16, height: 16, marginRight: 10 }}
                    source={icons.smallCheckIcon}
                  />
                  <Text>Assigned </Text>
                  <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
                    to you on{" "}
                    {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                      "MMM Do, YY"
                    )}{" "}
                    at{" "}
                    {new Date(
                      theOrder?.orderStatus[0]?.timeAssigned
                    ).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            </View>

            {/* TimeLine */}
          </CustomVirtualizedView>

          {/* Footer */}
          <View
            style={{
              backgroundColor: appTheme.COLORS.white,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <Button
              onPress={() => toggle()}
              buttonStyle={{
                backgroundColor: appTheme.COLORS.mainRed,
                borderRadius: 4,
                width: "100%",
                height: 45,
                justifyContent: "center",
              }}
              title="Deliver Order"
            />
          </View>

          <BottomSheet
            visible={visible}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}
          >
            <View style={styles.bottomSheet}>
              <OrderBottomSheet
                getProductDetails={getProductDetails}
                toggle={toggle}
                item={theOrder}
                setVisible={setVisible}
                visible={visible}
              />
            </View>
          </BottomSheet>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            color={
              Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
            }
            animating={updatedLoading}
            size="large"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DeliverOrder;

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: appTheme.COLORS.white,
  },
  detailsHeader: {
    backgroundColor: appTheme.COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingLeft: 20,
  },

  headerText: {
    fontSize: 20,
    color: appTheme.COLORS.black,
    fontWeight: "800",
    marginLeft: 20,
  },
});
