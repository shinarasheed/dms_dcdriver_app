import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import EmptiesBottomSheet from "../../components/EmptieBottomSheet";

import Header from "../../components/Header";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";

import ProductFlatList from "../../components/ProductFlatList";
import {
  fetchVanProducts,
  getVanEmpties,
  returnVanEmpties,
} from "../../redux/actions/vanActions";
import { returnProductsToWarehouse } from "../../redux/actions/vanActions";
import Routes from "../../navigation/Routes";

import { ScrollView } from "react-native-virtualized-view";

const ProductsScreen = () => {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const Van = useSelector((state) => state.van);
  const { inventory, driverEmpties, loading, productsReturned } = Van;

  const userState = useSelector((state) => state.user);

  const { user } = userState;

  function toggle() {
    setVisible(!visible);
  }

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchVanProducts());
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getVanEmpties(user?.vehicleId));
    }, [loading])
  );

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Products Returned to Warehouse",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const emptiesPayload = {
    companyCode: user?.ownerCompanyId,
    vanId: user?.vehicleId,
    quantity: driverEmpties?.quantity,
  };

  const handleReturnProducts = (payload) => {
    dispatch(returnProductsToWarehouse(payload));
    if (driverEmpties.quantity > 0) {
      dispatch(returnVanEmpties(emptiesPayload));
    } else {
      return;
    }
  };

  return (
    <View style={{ backgroundColor: appTheme.COLORS.mainBackground, flex: 1 }}>
      <Header headerText="Products" />

      {inventory?.length === 0 && (
        <TouchableOpacity
          style={{
            backgroundColor: appTheme.COLORS.infoYellow,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 20,
            borderColor: appTheme.COLORS.mainYellow,
            borderWidth: 1,
          }}
        >
          <Image source={icons.InfoIcon} />

          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              You do not have any products
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              in your device
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            marginTop: 20,
            marginBottom: 15,
            paddingVertical: 30,
            paddingLeft: 20,
            elevation: 5,
          }}
        >
          <Pressable
            onPress={() => navigation.navigate(Routes.ALLPRODUCTS_SCREEN)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View>
                <Image source={icons.allProducts} />
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginLeft: 30,
                  flex: 1,
                  borderBottomColor: appTheme.COLORS.borderGRey,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: appTheme.COLORS.MainGray,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  All Products
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate(Routes.LIQUIDEMPTYPRODUCTS_SCREEN)
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image source={icons.liquidProducts} />
              <View
                style={{
                  borderBottomWidth: 1,
                  marginLeft: 30,
                  flex: 1,
                  borderBottomColor: appTheme.COLORS.borderGRey,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: appTheme.COLORS.MainGray,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  Full
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable onPress={() => toggle()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image source={icons.empties} />
              <View
                style={{
                  borderBottomWidth: 1,
                  marginLeft: 30,
                  flex: 1,
                  borderBottomColor: appTheme.COLORS.borderGRey,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: appTheme.COLORS.MainGray,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  Empties
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        {productsReturned && showToastWithGravity()}

        <TouchableOpacity
          onPress={async () => {
            const payload = {
              companyCode: user?.ownerCompanyId,
              vehicleId: user?.vehicleId,
              stocks: inventory.map((item) => ({
                productId: parseInt(item?.product?.id),
                quantity: parseInt(item?.quantity),
              })),
            };

            Alert.alert(
              "Confirm",
              "Are you sure you want to return products?",
              [
                {
                  text: "Ok",
                  onPress: () => handleReturnProducts(payload),
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ],
              { cancelable: true }
            );
          }}
          style={{
            backgroundColor: appTheme.COLORS.white,
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 30,
            paddingLeft: 15,
            marginBottom: 15,
            elevation: 5,
          }}
        >
          <Image source={icons.salesReturn} />

          <Text
            style={{
              fontSize: 17,
              marginLeft: 20,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            Return products to warehouse
          </Text>
        </TouchableOpacity>

        {!loading ? (
          <ProductFlatList list={inventory} />
        ) : (
          <ActivityIndicator
            color={
              Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
            }
            animating={loading}
            size="large"
          />
        )}
      </ScrollView>

      <EmptiesBottomSheet
        toggle={toggle}
        visible={visible}
        driverEmpties={driverEmpties}
      />
    </View>
  );
};

export default ProductsScreen;
