import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  View,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import ProductFlastlist from "../../components/ProductFlatList";
import appTheme from "../../constants/theme";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants";
import { fetchVanProducts } from "../../redux/actions/vanActions";
// import filter from "lodash.filter";

const index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [vanProducts, setVanProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const Van = useSelector((state) => state.van);
  const { inventory, loading: vanLoading, error: vanError } = Van;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchVanProducts());
      setVanProducts(inventory);
    }, [])
  );

  const searchFunction = (text) => {
    setSearchValue(text);
    const updatedData = inventory.filter(
      (item) =>
        item.product.brand.toUpperCase().indexOf(text.toUpperCase()) > -1
    );
    setVanProducts(updatedData);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}
    >
      {/* header */}

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
            fontFamily: "Gilroy-Medium",
          }}
        >
          All Products
        </Text>
      </View>

      {/* header  */}

      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={25}
            style={{ color: appTheme.COLORS.MainGray }}
          />
          <TextInput
            placeholder="Search"
            style={{ fontSize: 18, paddingLeft: 5, flex: 1 }}
            value={searchValue}
            onChangeText={(text) => searchFunction(text)}
            autoCorrect={false}
          />
        </View>
      </View>

      <ProductFlastlist list={vanProducts} />
    </SafeAreaView>
  );
};

export default index;

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
