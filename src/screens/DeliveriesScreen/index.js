import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Pressable,
  Image,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Tab, TabView } from "react-native-elements";

import SearchInput from "../../components/SearchInput";
import appTheme from "../../constants/theme";
import CustomVirtualizedView from "../../components/VirtualizedList";
import { icons } from "../../constants";
import DeliveryFlatList from "../../components/DeliveryFlatList";
import { fetchOrder } from "../../redux/actions/orderActions";
import PastDeliveryFlatList from "../../components/PastDeliveryFlatlist";

export default function DeliveriesScreen() {
  const categories = ["NEW DELIVERIES", "PAST DELIVERIES"];
  const [newDeliveries, setNewDeliveries] = useState([]);
  const [pastDeliveries, setPastdeliveries] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.orders);
  const { loading, error, order } = allOrders;

  const theNewDeliveries = order.filter(
    (item) => item.status === "Assigned" || item.status === "Accepted"
  );

  const thePastDeliveries = order.filter(
    (item) => item.status === "Completed" || item.status === "Rejected"
  );

  useEffect(() => {
    dispatch(fetchOrder());
    setNewDeliveries(theNewDeliveries);
    setPastdeliveries(thePastDeliveries);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
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
          Deliveries
        </Text>
      </View>

      {/* header */}

      <CustomVirtualizedView>
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          {/* <TopTab
            categories={categories}
            selectedCategoryIndex={selectedCategoryIndex}
            setSelectedCategoryIndex={setSelectedCategoryIndex}
          /> */}

          {/* header */}
          <Tab
            indicatorStyle={{
              backgroundColor: appTheme.COLORS.mainRed,
              height: 3,
              position: "absolute",
              marginBottom: 0,
            }}
            value={index}
            onChange={setIndex}
          >
            <Tab.Item
              title="New Deliveries"
              titleStyle={{
                color: appTheme.COLORS.black,
              }}
              buttonStyle={{
                backgroundColor: appTheme.COLORS.mainBackground,
                paddingHorizontal: 0,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            />
            <Tab.Item
              title="Past Deliveries"
              containerStyle={{
                borderBottomColor: appTheme.COLORS.mainRed,
              }}
              buttonStyle={{
                backgroundColor: appTheme.COLORS.mainBackground,
              }}
              style={{ borderBottomColor: appTheme.COLORS.mainRed }}
            />
          </Tab>
          <SearchInput />
        </View>

        <TabView value={index} onChange={setIndex}>
          <TabView.Item style={{ width: "100%" }}>
            {order.length !== 0 ? (
              <DeliveryFlatList list={theNewDeliveries} />
            ) : (
              <ActivityIndicator
                color={
                  Platform.OS === "android"
                    ? appTheme.COLORS.mainRed
                    : undefined
                }
                animating={loading}
                size="large"
              />
            )}
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            {order.length !== 0 ? (
              <PastDeliveryFlatList list={thePastDeliveries} />
            ) : (
              <ActivityIndicator
                color={
                  Platform.OS === "android"
                    ? appTheme.COLORS.mainRed
                    : undefined
                }
                animating={loading}
                size="large"
              />
            )}
          </TabView.Item>
        </TabView>
      </CustomVirtualizedView>
    </SafeAreaView>
  );
}
