import React from "react";
import { Text, View, FlatList, Image } from "react-native";
import moment from "moment";

import CustomVirtualizedView from "./VirtualizedList";
import TimeLine from "./TimeLine";
import appTheme from "../constants/theme";
import { icons } from "../constants";
import CallCustomer from "./CallCustomer";
import Order from "./Order";

const OrderDetailsBody = ({ theOrder, getTotalPrice, getProductDetails }) => {
  return (
    <CustomVirtualizedView>
      <View style={{ paddingLeft: 20, paddingVertical: 20 }}>
        <View style={{ marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ fontSize: 15, marginRight: 5 }}>
            {theOrder !== undefined &&
              moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                "MMM Do, YYYY"
              )}{" "}
            {/* at{" "}
            {new Date(
              theOrder?.orderStatus[0]?.timeAssigned
            ).toLocaleTimeString()}{" "} */}
            from{" "}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: appTheme.COLORS.black,
            }}
          >
            {theOrder !== undefined && theOrder?.buyerDetails[0]?.buyerName}
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
          paddingVertical: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: appTheme.COLORS.MainGray,
              fontSize: 18,
              marginBottom: 5,
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
              style={{
                marginBottom: 5,
                fontSize: 15,
                lineHeight: 25,
                color: appTheme.COLORS.MainGray,
              }}
            >
              {theOrder?.buyerDetails[0]?.buyerAddress === "undefined"
                ? "Nigeria"
                : theOrder?.buyerDetails[0]?.buyerAddress}
            </Text>

            <View style={{ marginTop: 5, flexDirection: "row" }}>
              <Text style={{ fontSize: 15, color: appTheme.COLORS.black }}>
                {theOrder !== undefined &&
                  theOrder?.buyerDetails[0]?.buyerPhoneNumber}
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
          marginBottom: 20,
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
            <Text style={{ fontSize: 15 }}>Total amount</Text>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                marginLeft: 65,
              }}
            >
              {"\u20A6"}
              {isNaN(getTotalPrice()) ? null : getTotalPrice()}
            </Text>
          </View>
        )}
      />

      {/* TimeLine */}
      <TimeLine theOrder={theOrder} />
      {/* TimeLine */}
    </CustomVirtualizedView>
  );
};

export default OrderDetailsBody;
