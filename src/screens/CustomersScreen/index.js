import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  Image,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import TopTab from "../../components/CustomersTopTab";
import CustomerCard from "../../components/CustomerCard";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomVirtualizedView from "../../components/VirtualizedList";
import { fetchOrder } from "../../redux/actions/orderActions";
import { icons } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import appTheme from "../../constants/theme";
import Routes from "../../navigation/Routes";

const CustomersScreen = () => {
  const categories = ["ALL", "BULKBREAKERS", "POCS", "NEW"];
  const navigation = useNavigation();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const orders = useSelector((state) => state.orders);
  const { loading, error, order: allOrders } = orders;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: appTheme.COLORS.mainBackground }}
    >
      <Header headerText="Customers" />
      <CustomVirtualizedView>
        <View style={{ paddingHorizontal: 20 }}>
          <TopTab
            categories={categories}
            selectedCategoryIndex={selectedCategoryIndex}
            setSelectedCategoryIndex={setSelectedCategoryIndex}
          />

          <View
            style={{
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
        </View>

        {!loading ? (
          <FlatList
            style={{ marginTop: 20, marginBottom: 80 }}
            data={allOrders}
            renderItem={({ item }) => (
              <CustomerCard order={item} allOrders={allOrders} />
            )}
            keyExtractor={(item, id) => id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: appTheme.COLORS.borderGRey,
                }}
              ></View>
            )}
          />
        ) : (
          <ActivityIndicator
            color={
              Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
            }
            animating={loading}
            size="large"
          />
        )}
      </CustomVirtualizedView>

      <Pressable
        style={{
          backgroundColor: appTheme.COLORS.white,
          width: 180,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 40,
          borderWidth: 1,
          borderColor: appTheme.COLORS.borderGRey,
          position: "absolute",
          right: 10,
          bottom: 10,
        }}
        onPress={() => navigation.navigate(Routes.ADDCUSTOMER_SCREEN)}
      >
        <Image style={{ marginRight: 10 }} source={icons.cartIcon} />
        <Text style={{ fontSize: 18 }}>One-Off Sale</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CustomersScreen;

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
