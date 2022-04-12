import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

import { useRoute, useNavigation } from "@react-navigation/native";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { fetchProducts } from "../../redux/actions/productActions";

import CallCustomer from "../../components/CallCustomer";
import Routes from "../../navigation/Routes";
import SingleCustomer from "../../components/SingleCustomer";

const Customer = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { thisCustomer, oneOff } = route.params;

  const theCustomer = thisCustomer[0];

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const { products } = allProducts;

  const getProductDetails = (productId) => {
    const x = products?.filter(
      (product) => product?.productId === productId.toString()
    )[0];
    return x;
  };

  const getTotalPrice = () => {
    return thisCustomer?.orderItems.reduce(
      (accumulator, order) =>
        accumulator +
        getProductDetails(order?.productId)?.price * order?.quantity,
      0
    );
  };

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
        justifyContent: "space-between",
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
            {theCustomer?.buyerDetails[0].buyerName}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Customer Code: {theCustomer?.buyerCompanyId}</Text>
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
              Active
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
            <Text style={{ fontSize: 15, ...appTheme.FONTS.mainFontLight }}>
              {theCustomer.length}{" "}
              {`${thisCustomer.length > 1 ? "Orders" : "Order"}`}
            </Text>
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
              {theCustomer?.buyerDetails[0]?.buyerName}
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
                {theCustomer?.buyerDetails[0]?.buyerAddress === "undefined"
                  ? "Nigeria"
                  : theCustomer?.buyerDetails[0]?.buyerAddress}
              </Text>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: 15, color: appTheme.COLORS.black }}>
                  {theCustomer?.buyerDetails[0]?.buyerPhoneNumber}
                </Text>

                <CallCustomer
                  phoneNumber={theCustomer?.buyerDetails[0]?.buyerPhoneNumber}
                />
              </View>
            </View>
          </View>
        </View>

        {/* here */}

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: appTheme.COLORS.white,
          }}
          data={thisCustomer}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => (
            <SingleCustomer item={item} getTotalPrice={getTotalPrice} />
          )}
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
            navigation.navigate(Routes.SELLTO_CUSTOMER_SCREEN, {
              order: theCustomer,
              thisCustomer,
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

export default Customer;
