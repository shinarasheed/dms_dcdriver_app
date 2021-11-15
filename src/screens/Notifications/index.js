import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  SafeAreaView,
  View,
  Pressable,
  Image,
  Text,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import appTheme from "../../constants/theme";
import NotificationsTab from "../../components/NotificationsTab";
import Notification from "../../components/Notification";
import { fetchOrder } from "../../redux/actions/orderActions";
import { Spinner } from "../../components/Spinner";
import { icons } from "../../constants";

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
          Notifications
        </Text>
      </View>

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
