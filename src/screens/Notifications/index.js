import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, SafeAreaView, View, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import appTheme from "../../constants/theme";

import Header from "../../components/Header";
import CustomVirtualizedView from "../../components/VirtualizedList";
import NotificationsTab from "../../components/NotificationsTab";
import Notification from "../../components/Notification";
import { fetchOrder } from "../../redux/actions/orderActions";

const index = () => {
  const categories = ["all", "unread", "read"];
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrder());
    }, [])
  );

  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.orders);
  const { loading, refreshing, error, order } = allOrders;

  const Notifications = (index) => {
    switch (index) {
      case 0:
        return (
          <FlatList
            data={order}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => <Notification item={item} />}
            contentContainerStyle={{
              backgroundColor: appTheme.COLORS.white,
              paddingLeft: 20,
              marginTop: 20,
              paddingTop: 10,
            }}
          />
        );

      case 1:
        return (
          <FlatList
            data={order}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => <Notification item={item} />}
            contentContainerStyle={{
              backgroundColor: appTheme.COLORS.white,
              paddingLeft: 20,
              marginTop: 20,
              paddingTop: 10,
            }}
          />
        );

      default:
        return (
          <FlatList
            data={order}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => <Notification item={item} />}
            contentContainerStyle={{
              backgroundColor: appTheme.COLORS.white,
              paddingLeft: 20,
              marginTop: 20,
              paddingTop: 10,
            }}
          />
        );
    }
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <Header back={back} goBack headerText="Notifications" />

      <View style={{ paddingHorizontal: 25, marginBottom: 5 }}>
        <NotificationsTab
          categories={categories}
          index={index}
          setIndex={setIndex}
        />
      </View>

      {order.length > 0 ? (
        Notifications(index)
      ) : (
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          color={
            Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
          }
          animating={true}
          size="large"
        />
      )}
    </SafeAreaView>
  );
};

export default index;
