import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, SafeAreaView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import appTheme from "../../constants/theme";

import Header from "../../components/Header";
import NotificationsTab from "../../components/NotificationsTab";
import Notification from "../../components/Notification";
import { fetchOrder } from "../../redux/actions/orderActions";
import { Spinner } from "../../components/Spinner";

const index = () => {
  const categories = ["all", "unread", "read"];
  const [index, setIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrder());
    }, [])
  );

  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.orders);
  const { order } = allOrders;

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

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <Header goBack headerText="Notifications" />

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
        <Spinner
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default index;
