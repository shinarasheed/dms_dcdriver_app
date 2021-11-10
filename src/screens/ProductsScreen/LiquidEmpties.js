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
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DeliveriesTab from "../../components/DeliveriesTab";

import ProductFlastlist from "../../components/ProductFlatList";
import { fetchVanProducts } from "../../redux/actions/vanActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Spinner } from "../../components/Spinner";

const index = () => {
  const categories = ["liquids", "empties"];
  const [index, setIndex] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVanProducts());
  }, []);

  const Van = useSelector((state) => state.van);
  const { inventory, vanLoading, error: vanError } = Van;

  const fulls = inventory.filter(
    (product) => product?.product?.productType === "full"
  );

  const notfulls = inventory.filter(
    (product) => product?.product?.productType !== "full"
  );

  const ShowProducts = (index) => {
    switch (index) {
      case 0:
        return <ProductFlastlist list={fulls} />;

      case 1:
        return <ProductFlastlist list={notfulls} />;

      default:
        return <ProductFlastlist list={fulls} />;
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

      <View style={{ paddingHorizontal: 25, marginBottom: 5 }}>
        <DeliveriesTab
          categories={categories}
          index={index}
          setIndex={setIndex}
        />
      </View>

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
          />
        </View>
      </View>

      {inventory.length !== 0 ? <>{ShowProducts(index)}</> : <Spinner />}
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
