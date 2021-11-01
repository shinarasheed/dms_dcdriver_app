import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";

import ProductFlatList from "../../components/ProductFlatList";
import CustomVirtualizedView from "../../components/VirtualizedList";
import { fetchVanProducts } from "../../redux/actions/vanActions";

const ProductsScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVanProducts());
  }, []);

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
          <Pressable onPress={() => navigation.navigate("AllProducts")}>
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

          <Pressable onPress={() => navigation.navigate("LiquidEmptyProducts")}>
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

          <Pressable onPress={() => navigation.navigate("LiquidEmptyProducts")}>
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

        <Pressable>
          <View
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
                fontSize: 18,
                marginLeft: 20,
                color: appTheme.COLORS.black,
              }}
            >
              Return products to warehouse
            </Text>
          </View>
        </Pressable>

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
