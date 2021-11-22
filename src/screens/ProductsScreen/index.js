import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/Header";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";

import ProductFlatList from "../../components/ProductFlatList";
import CustomVirtualizedView from "../../components/VirtualizedList";
import { fetchVanProducts } from "../../redux/actions/vanActions";
import { returnProductsToWarehouse } from "../../redux/actions/vanActions";
import Routes from "../../navigation/Routes";

const ProductsScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchVanProducts());
    }, [])
  );

  const Van = useSelector((state) => state.van);
  const { inventory, loading: vanLoading, error: vanError } = Van;

  return (
    <SafeAreaView
      style={{ backgroundColor: appTheme.COLORS.mainBackground, flex: 1 }}
    >
      <Header headerText="Products" />

      <CustomVirtualizedView>
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            marginTop: 20,
            marginBottom: 20,
            paddingVertical: 30,
            paddingLeft: 20,
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
                <Text style={{ fontSize: 18, color: appTheme.COLORS.MainGray }}>
                  Full
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
                <Text style={{ fontSize: 18, color: appTheme.COLORS.MainGray }}>
                  Empties
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        <TouchableOpacity
          onPress={async () => {
            const driver = JSON.parse(
              await AsyncStorage.getItem("driverDetails")
            );
            const payload = {
              companyCode: driver.ownerCompanyId,
              vehicleId: driver.vehicleId,
              stocks: inventory.map((item) => ({
                productId: item?.product?.productId,
                quantity: item?.quantity,
              })),
            };

            console.log(payload);
            Alert.alert(
              "Confirm",
              "Are you sure?",
              [
                {
                  text: "Ok",
                  onPress: () => dispatch(returnProductsToWarehouse(payload)),
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
            marginBottom: 20,
          }}
        >
          <Image source={icons.salesReturn} />

          <Text
            style={{
              fontSize: 17,
              marginLeft: 20,
              color: appTheme.COLORS.black,
            }}
          >
            Return products to warehouse
          </Text>
        </TouchableOpacity>

        {!vanLoading ? (
          <ProductFlatList list={inventory} />
        ) : (
          <ActivityIndicator
            color={
              Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
            }
            animating={vanLoading}
            size="large"
          />
        )}
      </CustomVirtualizedView>
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({});
