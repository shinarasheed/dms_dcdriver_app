import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import ProductFlastlist from "../../components/ProductFlatList";
import appTheme from "../../constants/theme";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants";
import { fetchVanProducts } from "../../redux/actions/vanActions";
import { formatPrice } from "../../utils/formatPrice";
// import filter from "lodash.filter";

const index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [vanProducts, setVanProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const Van = useSelector((state) => state.van);
  const { inventory, vanEmpties, loading: vanLoading, error: vanError } = Van;

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
    <View
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
          marginVertical: 10,
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

      <TouchableOpacity
        style={{
          backgroundColor: appTheme.COLORS.infoYellow,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: "row",
          marginHorizontal: 10,
          borderColor: appTheme.COLORS.mainYellow,
          borderWidth: 1,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Gilroy-Bold",
            }}
          >
            EMPTIES
          </Text>

          <View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              Total Quantity
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
                color: appTheme.COLORS.black,
              }}
            >
              {vanEmpties?.quantity}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
                color: appTheme.COLORS.black,
              }}
            >
              Price per Case
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Bold",
                color: appTheme.COLORS.black,
                marginLeft: 10,
              }}
            >
              {"\u20A6"}
              {formatPrice(1000)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <ProductFlastlist list={vanProducts} />
    </View>
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
