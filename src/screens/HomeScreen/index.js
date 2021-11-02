import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  SafeAreaView,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import DateRangePicker from "../../components/DateRangePicker";

import styles from "./styles";
import { icons, images } from "../../constants";
import appTheme from "../../constants/theme";
import Delivery from "../../components/Delivery";
import CustomVirtualizedView from "../../components/VirtualizedList";
import UserBottomSheet from "../../components/UserBottomSheet";
import { fetchOrder, fetchOrderStats } from "../../redux/actions/orderActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();

  const allOrders = useSelector((state) => state.orders);
  const [newOrder, setNewOrder] = useState([]);
  const [theDriver, setTheDriver] = useState(null);
  const orderStats = useSelector((state) => state.orderStats);
  const { stats, loading: statsLoading, error: statsError } = orderStats;
  const updateOrder = useSelector((state) => state.updateOrder);
  const { updatedOrder } = updateOrder;
  const { loading, error, order } = allOrders;

  const newOrders = order.filter((item) => item.status === "Assigned");
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const getDriverDetails = async () => {
    const driver = JSON.parse(await AsyncStorage.getItem("driverDetails"));
    setTheDriver(driver);
  };

  useEffect(() => {
    dispatch(fetchOrderStats(1));
  }, []);

  useEffect(() => {
    dispatch(fetchOrder());
    setNewOrder(order.filter((item) => item.status === "Assigned"));
    getDriverDetails();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      {/* header section */}
      <View style={styles.header}>
        <Text style={styles.headerHome}>Home</Text>
        <Pressable onPress={() => navigation.navigate("Notifications")}>
          <View style={styles.headerNotification}>
            <Image source={icons.notificationIcon} />
            <Text style={styles.headerNotificationText}>Notifications</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => toggle()}>
          <View style={styles.settingsContainer}>
            <Image source={icons.userAvaterIcon} />
            <Image source={icons.arrowDownIcon} />
          </View>
        </Pressable>
      </View>

      {/* end header section  */}
      <CustomVirtualizedView>
        <View style={styles.homeScreenContainer}>
          {/* calendar */}
          <>
            <DateRangePicker />
          </>

          {stats !== undefined && (
            <>
              <ImageBackground
                style={{
                  width: "100%",
                  height: 110,
                  marginBottom: 30,
                  marginTop: 30,
                }}
                source={images.saleHistory1}
              >
                <View style={styles.totalSalesStats}>
                  <Text style={styles.statsText}>Total Sales</Text>

                  <Text style={styles.totalSalesAmount}>
                    {"\u20A6"}
                    {stats.totalSales}
                  </Text>
                </View>
              </ImageBackground>

              <ImageBackground
                style={{
                  width: "100%",
                  height: 110,
                  marginBottom: 30,
                }}
                source={images.saleHistory3}
              >
                <View style={styles.deliveriesStats}>
                  <View>
                    <Text style={styles.statsText}>
                      {stats.deliveryCounts}{" "}
                      {stats.deliveryCounts > 1 ? "Deliveries" : "Delivery"}
                    </Text>

                    <Text style={styles.deliveriesAmount}>
                      {"\u20A6"}
                      {stats.deliveries}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.statsText}>
                      {stats.visitCounts}{" "}
                      {stats.visitCounts > 1 ? "Visits" : "Visit"}
                    </Text>
                    <Text style={styles.totalVisitAmount}>
                      {"\u20A6"}
                      {stats.visits}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </>
          )}

          {!loading && newOrders.length !== 0 ? (
            <FlatList
              style={{
                backgroundColor: appTheme.COLORS.white,
                borderRadius: 20,
                padding: 20,
              }}
              data={newOrders}
              keyExtractor={(item, id) => id.toString()}
              renderItem={({ item }) => (
                <Delivery item={item} newOrders={newOrders} />
              )}
              ListHeaderComponent={() => (
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      color: appTheme.COLORS.mainTextGray,
                    }}
                  >
                    New Deliveries
                  </Text>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                color={
                  Platform.OS === "android"
                    ? appTheme.COLORS.mainRed
                    : undefined
                }
                animating={loading}
                size="large"
              />
            </View>
          )}
        </View>
      </CustomVirtualizedView>
      <UserBottomSheet driver={theDriver} toggle={toggle} visible={visible} />
    </SafeAreaView>
  );
};

export default HomeScreen;
