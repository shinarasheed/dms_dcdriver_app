import React from "react";
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

import InvoiceCard from "../../components/InvoiceCard";
import CustomVirtualizedView from "../../components/VirtualizedList";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import CallCustomer from "../../components/CallCustomer";

const GenerateInvoice = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { productsToSell, customer } = route.params;

  const getTotalPrice = () => {
    return productsToSell.reduce(
      (accumulator, order) => accumulator + order?.quantity * order?.price,
      0
    );
  };

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
          Order {/* Order {order.orderId} */}
        </Text>
      </View>

      <CustomVirtualizedView>
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
          }}
        >
          <View>
            <Text
              style={{
                color: appTheme.COLORS.MainGray,
                fontSize: 18,
                marginBottom: 15,
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
                  {customer.phoneNumber}
                </Text>
                <CallCustomer phoneNumber={customer.phoneNumber} />
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
              <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
                on{" "}
                {moment(
                  new Date(new Date().getTime()).toISOString().split("T")[0]
                ).format("MMM Do, YYYY")}
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
          <Pressable
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
          </Pressable>
        </View>
      </CustomVirtualizedView>
    </SafeAreaView>
  );
};

export default GenerateInvoice;
