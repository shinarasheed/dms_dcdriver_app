import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  SafeAreaView,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
import Refresh from "../../components/Refresh";
import { Spinner } from "../../components/Spinner";
import axios from "axios";
import Routes from "../../navigation/Routes";

const HomeScreen = () => {
  const navigation = useNavigation();

  const allOrders = useSelector((state) => state.orders);
  const [newOrder, setNewOrder] = useState([]);
  const [theDriver, setTheDriver] = useState(null);
  const [distributor, setDistributor] = useState(null);
  const orderStats = useSelector((state) => state.orderStats);
  const { stats } = orderStats;
  const { loading, order } = allOrders;

  const newOrders = order?.filter((item) => item.status === "Assigned");
  // const splicedArray = newOrders.splice(0, 4);

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const getDriverDetails = async () => {
    const driver = JSON.parse(await AsyncStorage.getItem("driverDetails"));
    setTheDriver(driver);
    const {
      data: { result },
    } = await axios.get(
      `http://102.133.143.139/company/code/${driver.ownerCompanyId}`
    );
    setDistributor(result);
    await AsyncStorage.setItem("Distributor", JSON.stringify(result));
  };

  useEffect(() => {
    setTimeout(() => {
      getDriverDetails();
    }, 1000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrderStats());
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrder());
      setNewOrder(order?.filter((item) => item.status === "Assigned"));
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <Refresh />

      {/* header section */}
      <View style={styles.header}>
        <Text style={styles.headerHome}>Home</Text>
        <Pressable
          onPress={() => navigation.navigate(Routes.NOTIFICATIONS_SCREEN)}
        >
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
          <DateRangePicker />

          <>
            <ImageBackground
              style={{
                height: 110,
                width: "100%",
                marginBottom: 30 * appTheme.SIZES.scale,
                marginTop: 30 * appTheme.SIZES.scale,
              }}
              source={images.saleHistory1}
            >
              <View style={styles.totalSalesStats}>
                <Text style={styles.statsText}>Total Sales</Text>

                <Text style={styles.totalSalesAmount}>
                  {"\u20A6"}
                  {stats?.totalSales ? stats.totalSales : 0}
                </Text>
              </View>
            </ImageBackground>

            <ImageBackground
              style={{
                width: "100%",
                height: 110,
                marginBottom: 30 * appTheme.SIZES.scale,
              }}
              source={images.saleHistory3}
            >
              <View style={styles?.deliveriesStats}>
                <View>
                  <Text style={styles.statsText}>
                    {stats?.deliveryCounts}{" "}
                    {stats?.deliveryCounts > 1 ? "Deliveries" : "Delivery"}
                  </Text>

                  <Text style={styles.deliveriesAmount}>
                    {"\u20A6"}
                    {stats?.deliveries ? stats.deliveries : 0}
                  </Text>
                </View>
                <View>
                  <Text style={styles.statsText}>
                    {stats?.visitCounts}{" "}
                    {stats?.visitCounts > 1 ? "Visits" : "Visit"}
                  </Text>
                  <Text style={styles.totalVisitAmount}>
                    {"\u20A6"}
                    {stats?.visits ? stats.visits : 0}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </>

          {newOrders?.length > 0 ? (
            <FlatList
              style={{
                backgroundColor: appTheme.COLORS.white,
                borderRadius: 20,
                padding: 20 * appTheme.SIZES.scale,
              }}
              data={newOrders}
              keyExtractor={(item, id) => id.toString()}
              renderItem={({ item }) => <Delivery item={item} />}
              ListHeaderComponent={() => (
                <View style={{ marginBottom: 20 * appTheme.SIZES.scale }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 15 * appTheme.SIZES.scale,
                      color: appTheme.COLORS.mainTextGray,
                    }}
                  >
                    New Deliveries
                  </Text>
                </View>
              )}
              ListFooterComponent={() => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(Routes.DELIVERIES_SCREEN)}
                  style={{ marginTop: 10 }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 14 * appTheme.SIZES.scale,
                      color: appTheme.COLORS.mainRed,
                    }}
                  >
                    See More Deliveries
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }}
            >
              <Text
                style={{
                  textTransform: "capitalize",
                }}
              >
                You do not have any new deliveries{" "}
              </Text>
            </View>
          )}
        </View>
      </CustomVirtualizedView>
      <UserBottomSheet
        distributor={distributor}
        driver={theDriver}
        toggle={toggle}
        visible={visible}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
