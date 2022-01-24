import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

import InvoiceCard2 from "../../components/InvoiceCard2";
import CustomVirtualizedView from "../../components/VirtualizedList";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import CallCustomer from "../../components/CallCustomer";

import { createAndSavePDF } from "../../utils/helpers";
import { simpleHtml } from "../../utils/html";
import Routes from "../../navigation/Routes";
import { formatPrice } from "../../utils/formatPrice";

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

const GenerateInvoice = () => {
  const [distributor, setDistributor] = useState(null);
  const [driver, setDriver] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  const { productsToSell, totalPrice, empties, order } = route.params;

  const getEmptiesPrice = () => {
    return empties * 1000;
  };

  const getTotalPrice = () => {
    return productsToSell?.reduce(
      (accumulator, order) =>
        accumulator + order?.quantity * order?.productPrice,
      0
    );
  };

  const getDistibutor = async () => {
    const distributor = JSON.parse(await AsyncStorage.getItem("Distributor"));
    const driver = JSON.parse(await AsyncStorage.getItem("driverDetails"));
    setDistributor(distributor);
    setDriver(driver);
  };

  useEffect(() => {
    getDistibutor();
  }, []);

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
          simpleHtml(
            pageMarginState[0],
            productsToSell,
            order,
            driver,
            distributor,
            getTotalPrice,
            getEmptiesPrice
          )
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
        <Pressable
          onPress={() => navigation.navigate(Routes.DELIVERIES_SCREEN)}
        >
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
          Order {order?.orderId}
        </Text>
      </View>

      <CustomVirtualizedView>
        <View
          style={{
            paddingLeft: 20,
            paddingVertical: 20,
          }}
        >
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text
              style={{
                fontSize: 15,
                marginRight: 5,
                textTransform: "capitalize",
              }}
            >
              {moment(order?.orderStatus[0]?.dateAssigned).format(
                "MMM Do, YYYY"
              )}{" "}
              {order?.orderStatus[0]?.timeAssigned !== null &&
                `at ${order?.orderStatus[0]?.timeAssigned.replace(
                  /\s/g,
                  ""
                )}`}{" "}
              from
            </Text>
          </View>

          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: appTheme.COLORS.black,
              }}
            >
              {order?.buyerDetails[0]?.buyerName}
            </Text>
          </View>

          <View
            style={{
              width: 100,
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 7,
              fontWeight: "600",
              borderRadius: 20,
              backgroundColor: appTheme.COLORS.mainGreen,
            }}
          >
            <Text style={{ color: appTheme.COLORS.white }}>Completed</Text>
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
                color: appTheme.COLORS.black,
                ...appTheme.FONTS.mainFontBold,
              }}
            >
              {order?.buyerDetails[0]?.buyerName}
            </Text>
          </View>

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <Image source={icons.addressIcon} />
            <View style={{ marginLeft: 10, paddingRight: 50 }}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 15,
                  color: appTheme.COLORS.MainGray,
                  lineHeight: 25,
                }}
              >
                {order?.buyerDetails[0]?.buyerAddress}
              </Text>

              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <Text style={{ fontSize: 15, color: appTheme.COLORS.black }}>
                  {order?.buyerDetails[0]?.buyerPhoneNumber}
                </Text>
                <CallCustomer
                  phoneNumber={order?.buyerDetails[0]?.buyerPhoneNumber}
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
          data={productsToSell}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => <InvoiceCard2 product={item} />}
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
                  fontSize: 14,
                  marginLeft: 65,
                }}
              >
                {"\u20A6"}
                {formatPrice(totalPrice)}
              </Text>
            </View>
          )}
        />

        {/* timeline */}

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
                style={{ width: 16, height: 16, marginRight: 6 }}
                source={icons.smallCheckIcon}
              />

              <Text> Completed </Text>
              <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
                on{" "}
                {moment(
                  new Date(new Date().getTime()).toISOString().split("T")[0]
                ).format("MMM Do, YYYY")}{" "}
                at {new Date(new Date().getTime()).toLocaleTimeString()}
              </Text>
            </View>

            {order?.orderStatus[0]?.dateAccepted !== null && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: 16, height: 16, marginRight: 10 }}
                    source={icons.smallCheckIcon}
                  />

                  <Text>Accepted </Text>
                  <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
                    on{" "}
                    {moment(order?.orderStatus[0]?.dateAccepted).format(
                      "MMM Do, YYYY"
                    )}{" "}
                    at {order?.orderStatus[0]?.timeAccepted.replace(/\s/g, "")}
                  </Text>
                </View>
              </View>
            )}

            {order?.orderStatus[0]?.dateAssigned !== null && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 16, height: 16, marginRight: 10 }}
                  source={icons.smallCheckIcon}
                />

                <Text>Assigned </Text>
                <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
                  to you on{" "}
                  {moment(order?.orderStatus[0]?.dateAssigned).format(
                    "MMM Do, YYYY"
                  )}{" "}
                  {order?.orderStatus[0]?.timeAssigned !== null &&
                    `at ${order?.orderStatus[0]?.timeAssigned.replace(
                      /\s/g,
                      ""
                    )}`}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Footer */}
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
      </CustomVirtualizedView>
    </SafeAreaView>
  );
};

export default GenerateInvoice;
