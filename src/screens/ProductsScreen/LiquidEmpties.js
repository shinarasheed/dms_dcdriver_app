import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { fetchVanProducts } from "../../redux/actions/vanActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Products from "../../components/van/Products";

const index = () => {
  const categories = ["full"];
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [fullproducts, setfullProducts] = useState([]);
  const [emptyproducts, setemptyProducts] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const Van = useSelector((state) => state.van);
  const { fullProducts, emptyProducts } = Van;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchVanProducts());
      setfullProducts(fullProducts);
      setemptyProducts(emptyProducts);
    }, [])
  );

  const searchFunction = (text) => {
    setSearchValue(text);
    const updatedData = fullProducts.filter(
      (item) =>
        item.product.brand.toUpperCase().indexOf(text.toUpperCase()) > -1
    );

    const updatedData2 = emptyProducts.filter(
      (item) =>
        item.product.brand.toUpperCase().indexOf(text.toUpperCase()) > -1
    );
    setfullProducts(updatedData);
    setemptyProducts(updatedData2);
  };

  const ShowProducts = (index) => {
    switch (index) {
      case 0:
        return <Products list={fullproducts} />;

      default:
        return <Products list={fullproducts} />;
    }
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
            fontWeight: "700",
            ...appTheme.FONTS.mainFontBold,
          }}
        >
          Products
        </Text>
      </View>

      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={20}
          style={{ color: appTheme.COLORS.mainYellow }}
        />

        <TextInput
          placeholder="Search"
          style={{ fontSize: 18, paddingLeft: 5, flex: 1 }}
          value={searchValue}
          onChangeText={(text) => searchFunction(text)}
          autoCorrect={false}
        />
      </View>

      {ShowProducts(index)}
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
    borderWidth: 0,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 20,
  },
});
