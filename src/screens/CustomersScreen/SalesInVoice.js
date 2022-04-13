import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import InvoiceCard from "../../components/InvoiceCard";
import CustomVirtualizedView from "../../components/VirtualizedList";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import CallCustomer from "../../components/CallCustomer";

import { createAndSavePDF } from "../../utils/helpers";
import { simpleHtml } from "../../utils/html2";
import CountryCurrency from "../../components/user/CountryCurrency";
import { divide } from "react-native-reanimated";
import { ScrollView } from "react-native-virtualized-view";
import Routes from "../../navigation/Routes";

export const createPdf = (navigation, htmlFactory) => async () => {
  try {
    const html = await htmlFactory();
    if (html) {
      await createAndSavePDF(html);
      Alert.alert(
        "Success!",
        "Invoice has been successfully generated and saved!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate(Routes.CUSTOMERS_SCREEN),
          },
        ]
      );
    }
  } catch (error) {
    Alert.alert("Error", error.message || "Something went wrong...");
  }
};

const GenerateInvoice = () => {
  const [distributor, setDistributor] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  const { productsToSell, customer, empties } = route.params;

  const getEmptiesPrice = () => {
    return empties * 1000;
  };
  const getDistibutor = async () => {
    const distributor = JSON.parse(await AsyncStorage.getItem("distributor"));
    setDistributor(distributor);
  };

  const userState = useSelector((state) => state.user);

  const { user } = userState;

  const { country } = user;

  useEffect(() => {
    getDistibutor();
  }, []);

  const getTotalPrice = () => {
    return productsToSell?.reduce(
      (accumulator, item) => accumulator + item?.quantity * item?.price,
      0
    );
  };

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
          navigation,
          simpleHtml(
            pageMarginState[0],
            productsToSell,
            customer,
            distributor,
            user,
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
    <View style={{ backgroundColor: appTheme.COLORS.mainBackground }}>
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
        <Pressable onPress={() => navigation.navigate(Routes.CUSTOMERS_SCREEN)}>
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
          {/* //TODO:  this might need to be corrected */}
          Order {customer?.id}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 50,
        }}
      >
        <View style={{ paddingLeft: 20, paddingVertical: 20 }}>
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
            elevation: 10,
          }}
        >
          <View>
            <Text
              style={{
                color: appTheme.COLORS.MainGray,
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              New Customer
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: appTheme.COLORS.black,
                ...appTheme.FONTS.mainFontBold,
                textTransform: "capitalize",
              }}
            >
              {customer?.CUST_Name}
            </Text>
          </View>

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={{ paddingRight: 50 }}>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <Text style={{ fontSize: 15, color: appTheme.COLORS.black }}>
                  {customer?.phoneNumber}
                </Text>
                <CallCustomer phoneNumber={customer?.phoneNumber} />
              </View>
            </View>
          </View>
        </View>

        <FlatList
          style={{
            backgroundColor: appTheme.COLORS.white,
            marginVertical: 10,
            elevation: 10,
          }}
          data={productsToSell}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => <InvoiceCard product={item} />}
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

              <CountryCurrency
                country={country}
                price={getTotalPrice()}
                color={appTheme.COLORS.black}
                fontSize={16}
                fontFamily="Gilroy-Bold"
                marginLeft={66}
              />
            </View>
          )}
        />

        {/* timeline */}

        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            marginBottom: 10,
            paddingLeft: 20,
            paddingVertical: 10,
            elevation: 10,
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
                ).format("MMM Do, YYYY")}
                {"  "}
                at {new Date(new Date().getTime()).toLocaleTimeString()}
              </Text>
            </View>
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
      </ScrollView>
    </View>
  );
};

export default GenerateInvoice;
