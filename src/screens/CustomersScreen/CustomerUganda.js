import React, { useEffect } from "react";
import { Text, View, Image, FlatList, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useRoute, useNavigation } from "@react-navigation/native";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";

import CallCustomer from "../../components/CallCustomer";
import Routes from "../../navigation/Routes";
import SingleCustomer from "../../components/SingleCustomer";
import { getCustomerOrders } from "../../redux/actions/customerActions";

const CustomerUganda = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const customerOrdersState = useSelector((state) => state.customerOrders);

  const { customer } = route.params;

  const { customerOrders } = customerOrdersState;

  useEffect(() => {
    dispatch(getCustomerOrders(customer?.SF_Code));
  }, []);

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
        // justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
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
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={icons.backButton} style={{ marginRight: 18 }} />
          </Pressable>

          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              ...appTheme.FONTS.mainFontBold,
            }}
          >
            {customer?.CUST_Name}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>{customer?.CUST_Name}</Text>
          </View>

          <View
            style={{
              backgroundColor: appTheme.COLORS.mainGreen,
              borderRadius: 20,
              width: 100,
              marginTop: 5,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
                textAlign: "center",
              }}
            >
              {customer?.status}
            </Text>
          </View>

          <View>
            {/* <Text style={{ fontSize: 15, marginBottom: 5 }}>
              Total Amount Spent
            </Text> */}
            <Text
              style={{
                fontSize: 16,
                // marginBottom: 5,
                ...appTheme.FONTS.mainFontBold,
              }}
            >
              {/* {"\u20A6"}
              {getTotal()} */}
            </Text>
            {/* <Text style={{ fontSize: 15, ...appTheme.FONTS.mainFontLight }}>
              {numberOfOrders.length}{" "}
              {`${numberOfOrders.length > 1 ? "Orders" : "Order"}`}
            </Text> */}
          </View>
        </View>

        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            paddingLeft: 20,
            paddingVertical: 20,
            marginBottom: 30,
          }}
        >
          <View>
            <Text
              style={{
                color: appTheme.COLORS.MainGray,
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Contact Details
            </Text>
            <Text
              style={{
                fontSize: 16,
                ...appTheme.FONTS.mainFontBold,
                color: appTheme.COLORS.black,
              }}
            >
              {customer?.CUST_Name}
            </Text>
          </View>

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <Image source={icons.addressIcon} />
            <View style={{ marginLeft: 10, paddingRight: 50 }}>
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 25,
                  color: appTheme.COLORS.MainGray,
                }}
              >
                {customer?.address}
              </Text>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: 15, color: appTheme.COLORS.black }}>
                  {customer?.phoneNumber}
                </Text>

                <CallCustomer phoneNumber={customer?.phoneNumber} />
              </View>
            </View>
          </View>
        </View>

        {customerOrders?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: appTheme.COLORS.white,
            }}
            data={customerOrders}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => <SingleCustomer item={item} />}
            ListHeaderComponent={() => (
              <View
                style={{
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    ...appTheme.FONTS.mainFontBold,
                    marginLeft: 20,
                  }}
                >
                  Order History
                </Text>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Gilroy-Medium",
              }}
            >
              This customer has no orders yet
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: appTheme.COLORS.borderGRey,
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: appTheme.COLORS.white,
        }}
      >
        <Button
          onPress={() =>
            navigation.navigate(Routes.SELLTO_CUSTOMER_SCREEN_UGANDA, {
              customer,
            })
          }
          buttonStyle={{
            width: "100%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            backgroundColor: appTheme.COLORS.mainRed,
          }}
          title="Sell to Customer"
        />
      </View>
    </View>
  );
};

export default CustomerUganda;
