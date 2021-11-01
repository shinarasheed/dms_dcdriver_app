import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { BottomSheet } from "react-native-btr";
import { Button } from "react-native-elements";
import axios from "axios";

import Order from "../../components/Order";
import OrderBottomSheet from "../../components/OrderBottomSheet";
import CustomVirtualizedView from "../../components/VirtualizedList";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { fetchOrder } from "../../redux/actions/orderActions";
import { fetchProducts } from "../../redux/actions/productActions";
import { orderUrl } from "../../utils/baseUrl";
import { Spinner } from "../../components/Spinner";
import CallCustomer from "../../components/CallCustomer";

const DeliveryDetails = () => {
  const [loadingOrder, setLoadingOrder] = useState(false);
  const route = useRoute();
  const item = route.params;

  const [theOrder, settheOrder] = useState(item);

  const [visible, setVisible] = useState(false);
  const [productsVisibile, setProductsVisible] = useState(false);

  const navigation = useNavigation();

  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const { products } = allProducts;

  const updateOrder = useSelector((state) => state.updateOrder);
  const { loading: orderLoading } = updateOrder;

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
      settheOrder(order.order[0]);
      setLoadingOrder(false);
      dispatch(fetchOrder());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const getProductDetails = (productId) => {
    const x = products.filter(
      (product) => product.productId === productId.toString()
    )[0];
    return x;
  };

  const getTotalPrice = () => {
    return theOrder?.orderItems.reduce(
      (accumulator, order) => accumulator + parseFloat(order?.price),
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
    <SafeAreaView
      style={{ backgroundColor: appTheme.COLORS.mainBackground, flex: 1 }}
    >
      {/* header */}

      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          flexDirection: "row",
          alignItems: "center",
          height: 50,
          paddingLeft: 20,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={icons.backButton} />
        </Pressable>
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
      </View>
      <>
        {!orderLoading ? (
          <>
            <CustomVirtualizedView>
              <View style={{ paddingLeft: 20, paddingVertical: 20 }}>
                <View style={{ marginBottom: 10, flexDirection: "row" }}>
                  <Text style={{ fontSize: 17, marginRight: 5 }}>
                    {theOrder !== undefined &&
                      moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                        "MMM Do, YYYY"
                      )}{" "}
                    at{" "}
                    {new Date(
                      theOrder?.orderStatus[0]?.timeAssigned
                    ).toLocaleTimeString()}{" "}
                    from{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      color: appTheme.COLORS.black,
                    }}
                  >
                    {theOrder !== undefined &&
                      theOrder?.buyerDetails[0]?.buyerName}
                  </Text>
                </View>
                <View
                  style={{
                    width: 100,
                    alignItems: "center",
                    backgroundColor:
                      theOrder?.status === "Assigned"
                        ? appTheme.COLORS.Grey
                        : theOrder?.status === "Accepted"
                        ? appTheme.COLORS.mainYellow
                        : theOrder?.status === "Completed"
                        ? appTheme.COLORS.mainGreen
                        : appTheme.COLORS.mainRed,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    fontWeight: "600",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color:
                        theOrder?.status === "Assigned"
                          ? appTheme.COLORS.black
                          : theOrder?.status === "Accepted"
                          ? appTheme.COLORS.white
                          : theOrder?.status === "Completed"
                          ? appTheme.COLORS.white
                          : appTheme.COLORS.white,
                    }}
                  >
                    {theOrder?.status}
                  </Text>
                </View>
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
                      ...appTheme.FONTS.mainFontBold,
                      color: appTheme.COLORS.black,
                    }}
                  >
                    {theOrder?.buyerDetails[0]?.buyerName}
                  </Text>
                </View>

                <View style={{ marginTop: 10, flexDirection: "row" }}>
                  <Image source={icons.addressIcon} />
                  <View style={{ marginLeft: 10, paddingRight: 50 }}>
                    <Text
                      style={{ marginBottom: 5, fontSize: 17, lineHeight: 25 }}
                    >
                      {theOrder !== undefined &&
                        theOrder?.buyerDetails[0]?.buyerAddress}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginBottom: 10,
                        color: appTheme.COLORS.black,
                      }}
                    >
                      Customer local government area
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        textTransform: "uppercase",
                        color: appTheme.COLORS.black,
                      }}
                    >
                      {theOrder !== undefined &&
                        theOrder?.buyerDetails[0]?.buyerAddress}
                    </Text>

                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                      <Text
                        style={{ fontSize: 15, color: appTheme.COLORS.black }}
                      >
                        {theOrder !== undefined &&
                          theOrder?.buyerDetails[0]?.buyerPhoneNumber}
                      </Text>
                      <CallCustomer
                        phoneNumber={
                          theOrder?.buyerDetails[0]?.buyerPhoneNumber
                        }
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
                  <Order order={item} getProductDetails={getProductDetails} />
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
                    <Text style={{ fontSize: 17 }}>Total amount</Text>

                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 65,
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
                    fontSize: 17,
                    marginBottom: 10,
                    fontWeight: "bold",
                    color: appTheme.COLORS.black,
                  }}
                >
                  Timeline
                </Text>

                {theOrder !== undefined && theOrder?.status === "Completed" && (
                  <>
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
                      <Text> Completed </Text>
                      <Text
                        style={{ fontSize: 14, textTransform: "lowercase" }}
                      >
                        on{" "}
                        {moment(theOrder?.orderStatus[0]?.dateCompleted).format(
                          "MMM Do, YYYY"
                        )}{" "}
                        at{" "}
                        {new Date(
                          theOrder?.orderStatus[0]?.timeCompleted
                        ).toLocaleTimeString()}
                      </Text>
                    </View>

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
                      <Text> Accepted </Text>
                      <Text
                        style={{ fontSize: 14, textTransform: "lowercase" }}
                      >
                        on{" "}
                        {moment(theOrder?.orderStatus[0]?.dateAccepted).format(
                          "MMM Do, YYYY"
                        )}{" "}
                        at{" "}
                        {new Date(
                          theOrder?.orderStatus[0]?.timeAccepted
                        ).toLocaleTimeString()}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ width: 16, height: 16, marginRight: 5 }}
                        source={icons.smallCheckIcon}
                      />
                      <Text> Assigned </Text>
                      <Text
                        style={{ fontSize: 14, textTransform: "lowercase" }}
                      >
                        to you on{" "}
                        {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                          "MMM Do, YYYY"
                        )}{" "}
                        at{" "}
                        {new Date(
                          theOrder?.orderStatus[0]?.timeAssigned
                        ).toLocaleTimeString()}
                      </Text>
                    </View>
                  </>
                )}

                {theOrder !== undefined && theOrder?.status === "Assigned" && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{ width: 16, height: 16, marginRight: 5 }}
                      source={icons.smallCheckIcon}
                    />
                    <Text> Assigned </Text>
                    <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
                      to you on{" "}
                      {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                        "MMM Do, YYYY"
                      )}{" "}
                      at{" "}
                      {new Date(
                        theOrder?.orderStatus[0]?.timeAssigned
                      ).toLocaleTimeString()}
                    </Text>
                  </View>
                )}

                {/* rejected */}

                {theOrder?.status === "Rejected" && (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <Image
                        style={{ width: 16, height: 16, marginRight: 5 }}
                        source={icons.rejectedIcon}
                      />

                      <Text> Rejected </Text>
                      <Text
                        style={{ fontSize: 14, textTransform: "lowercase" }}
                      >
                        on{" "}
                        {moment(theOrder?.orderStatus[0]?.dateRejected).format(
                          "MMM Do, YYYY"
                        )}
                        at{" "}
                        {new Date(
                          theOrder?.orderStatus[0]?.timeRejected
                        ).toLocaleTimeString()}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ width: 16, height: 16, marginRight: 10 }}
                        source={icons.smallCheckIcon}
                      />
                      <Text>Assigned </Text>
                      <Text
                        style={{ fontSize: 14, textTransform: "lowercase" }}
                      >
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
                  </>
                )}

                {/* rejected */}

                {/* accepted */}

                {theOrder?.status === "Accepted" && (
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
                      <Text
                        style={{ fontSize: 14, textTransform: "lowercase" }}
                      >
                        {moment(theOrder?.orderStatus[0]?.dateAccepted).format(
                          "MMM Do, YY"
                        )}{" "}
                        at{" "}
                        {new Date(
                          theOrder?.orderStatus[0]?.timeAccepted
                        ).toLocaleTimeString()}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ width: 16, height: 16, marginRight: 10 }}
                        source={icons.smallCheckIcon}
                      />
                      <Text>Assigned </Text>
                      <Text
                        style={{ fontSize: 14, textTransform: "lowercase" }}
                      >
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
                )}

                {/* accepted */}
              </View>

              {/* TimeLine */}
            </CustomVirtualizedView>

            {/* Footer */}

            {theOrder?.status === "Assigned" && (
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
                <Pressable
                  style={{
                    backgroundColor: appTheme.COLORS.mainRed,
                    borderRadius: 4,
                    width: 150,
                    height: 45,
                    justifyContent: "center",
                  }}
                  onPress={() => toggle()}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: appTheme.COLORS.white,
                      textAlign: "center",
                    }}
                  >
                    Reject Order
                  </Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: appTheme.COLORS.mainGreen,
                    borderRadius: 4,
                    width: 150,
                    height: 45,
                    justifyContent: "center",
                  }}
                  onPress={() => updateOrderStatus("Accepted")}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: appTheme.COLORS.white,
                      textAlign: "center",
                    }}
                  >
                    Accept Order
                  </Text>
                </Pressable>
              </View>
            )}

            {/* new stuffs */}

            {theOrder?.status === "Accepted" && (
              <>
                <View
                  style={{
                    backgroundColor: appTheme.COLORS.white,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                  }}
                >
                  <Button
                    onPress={() => toggleProduct()}
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
              </>
            )}

            {/* new stuffs */}

            <BottomSheet
              visible={productsVisibile}
              onBackButtonPress={toggle}
              onBackdropPress={toggle}
            >
              <View
                style={[
                  styles.bottomSheet,
                  { backgroundColor: appTheme.COLORS.white },
                ]}
              >
                <OrderBottomSheet
                  getProductDetails={getProductDetails}
                  toggle={toggleProduct}
                  item={theOrder}
                  setVisible={setProductsVisible}
                  visible={productsVisibile}
                />
              </View>
            </BottomSheet>

            <BottomSheet
              visible={visible}
              onBackButtonPress={toggle}
              onBackdropPress={toggle}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  height: 200,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  justifyContent: "center",
                  paddingHorizontal: 40,
                }}
              >
                <Pressable
                  style={{ position: "absolute", top: 15, right: 20 }}
                  onPress={() => toggle()}
                >
                  <Image source={icons.cancelIcon} />
                </Pressable>

                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Are you sure you want to reject this order?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 40,
                    justifyContent: "center",
                  }}
                >
                  <Pressable
                    style={{
                      width: 130,
                      height: 45,
                      backgroundColor: "transparent",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: appTheme.COLORS.borderGRey1,
                    }}
                    onPress={() => toggle()}
                  >
                    <Text>No</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      width: 130,
                      height: 45,
                      backgroundColor: appTheme.COLORS.mainRed,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      marginLeft: 20,
                    }}
                    onPress={() => {
                      updateOrderStatus("Rejected");
                      toggle();
                    }}
                  >
                    <Text
                      style={{
                        color: appTheme.COLORS.white,
                        ...appTheme.FONTS.mainFontBold,
                        fontSize: 16,
                      }}
                    >
                      Yes, reject
                    </Text>
                  </Pressable>
                </View>
              </View>
            </BottomSheet>
          </>
        ) : (
          <Spinner />
        )}
      </>
    </SafeAreaView>
  );
};

export default DeliveryDetails;
