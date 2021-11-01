import React, { useEffect } from "react";
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
import { Tab, TabView } from "react-native-elements";

import ProductFlastlist from "../../components/ProductFlatList";
import { fetchVanProducts } from "../../redux/actions/vanActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";

const index = () => {
  const categories = ["LIQUIDS", "EMPTIES"];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [index, setIndex] = React.useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVanProducts());
  }, []);

  const Van = useSelector((state) => state.van);
  const { inventory, vanLoading, error: vanError } = Van;

  const liquidProducts = inventory.filter(
    (product) => product.productType === "full"
  );

  const emptiesProducts = inventory.filter(
    (product) => product.productType !== "full"
  );

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

      {/* header */}
      <Tab
        indicatorStyle={{
          backgroundColor: appTheme.COLORS.mainRed,
          height: 3,
          width: 80,
          position: "absolute",
          left: 60,
          marginBottom: 0,
        }}
        value={index}
        onChange={setIndex}
      >
        <Tab.Item
          title="FULL"
          buttonStyle={{
            backgroundColor: appTheme.COLORS.mainBackground,
          }}
          titleStyle={{ textAlign: "center", color: appTheme.COLORS.black }}
        />
        <Tab.Item
          title="EMPTIES"
          containerStyle={{ borderBottomColor: appTheme.COLORS.mainRed }}
          buttonStyle={{
            backgroundColor: appTheme.COLORS.mainBackground,
          }}
          style={{ borderBottomColor: appTheme.COLORS.mainRed }}
        />
      </Tab>

      {/* <View
        style={{paddingHorizontal: 20, paddingRight: 200, marginBottom: 10}}>
        <CustomersTopTab
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
        />
      </View> */}

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

      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{ width: "100%" }}>
          <ProductFlastlist list={liquidProducts} loading={vanLoading} />
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ProductFlastlist list={emptiesProducts} loading={vanLoading} />
        </TabView.Item>
      </TabView>
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
