import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Pressable,
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import SearchBar from "../../components/SearchBar";
import appTheme from "../../constants/theme";
import SellProductFlatList from "../../components/SellProductFlatList";
import SellProductFooter from "../../components/SellProductFooter";
import CustomVirtualizedView from "../../components/VirtualizedList";
import { icons } from "../../constants";
import { fetchVanProducts } from "../../redux/actions/vanActions";

const SellToCustomer = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const order = route.params;

  const Van = useSelector((state) => state.van);
  const { inventory, newinventory, loading: vanLoading, error: vanError } = Van;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchVanProducts());
    }, [])
  );

  const getQuantity = (productId, quantity) => {
    return (
      quantity <
      inventory.find((product) => product?.product?.productId === productId)
        ?.quantity
    );
  };

  const [empties, setEmpties] = useState(0);

  const getEmptiesPrice = () => {
    return empties * 1000;
  };

  const getTotalPrice = () => {
    return newinventory?.reduce(
      (accumulator, item) => accumulator + item?.price * item?.quantity,
      0
    );
  };

  const calNumberOfFull = () => {
    return newinventory
      ?.filter((product) => product.productType === "full")
      ?.reduce((acc, index) => parseInt(acc) + parseInt(index?.quantity), 0);
  };

  const getTotal = () => {
    return getTotalPrice() + (calNumberOfFull() - empties) * 1000;
  };

  const productsToSell = newinventory?.filter(
    (product) => product?.quantity > 0
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
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
          marginBottom: 40,
        }}
      >
        <Pressable onPress={() => navigator.goBack()}>
          <Image source={icons.backButton} style={{ marginRight: 18 }} />
        </Pressable>

        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            ...appTheme.FONTS.mainFontBold,
            textTransform: "capitalize",
          }}
        >
          {`sell to ${order?.buyerDetails[0]?.buyerName}`}
        </Text>
      </View>

      <CustomVirtualizedView>
        <View
          style={{
            marginTop: 5,
            marginBottom: 30,
          }}
        >
          {!vanLoading ? (
            <SellProductFlatList
              inventory={newinventory}
              getQuantity={getQuantity}
            />
          ) : (
            <ActivityIndicator
              color={
                Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
              }
              animating={true}
              size="large"
            />
          )}
        </View>
      </CustomVirtualizedView>

      {/* Footer */}
      <SellProductFooter
        getTotalPrice={getTotal}
        getProductPrice={getTotalPrice}
        getEmptiesPrice={getEmptiesPrice}
        productsToSell={productsToSell}
        order={order}
        getQuantity={getQuantity}
        calNumberOfFull={calNumberOfFull}
        setEmpties={setEmpties}
        empties={empties}
      />
    </SafeAreaView>
  );
};

export default SellToCustomer;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9799A0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
