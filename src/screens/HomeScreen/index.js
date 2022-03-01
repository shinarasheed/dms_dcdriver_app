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
import { Spinner } from "../../components/Spinner";
import axios from "axios";
import Routes from "../../navigation/Routes";
import { formatPrice } from "../../utils/formatPrice";
import { companyUrl } from "../../utils/baseUrl";
import CountryCurrency from "../../components/user/CountryCurrency";
import { getDistributorCustomers } from "../../redux/actions/userActions";

const HomeScreen = () => {
  const navigation = useNavigation();

  const allOrders = useSelector((state) => state.orders);
  const [newOrder, setNewOrder] = useState([]);
  const [theDriver, setTheDriver] = useState(null);
  const [distributor, setDistributor] = useState(null);
  const orderStats = useSelector((state) => state.orderStats);
  const { stats } = orderStats;
  const { loading, order } = allOrders;

  const userState = useSelector((state) => state.user);

  const { user } = userState;

  const { country, syspro_code } = user;

  const newOrders = order?.filter((item) => item.status === "Assigned");

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  useEffect(() => {
    let componentMounted = true;

    const getDriverDetails = async () => {
      const {
        data: { result },
        //use syspro_code instead of ownerCompanyId
      } = await axios.get(`${companyUrl}/company/code/${user?.ownerCompanyId}`);

      if (componentMounted) {
        setDistributor(result);
      }
    };

    getDriverDetails();

    return () => {
      componentMounted = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getDistributorCustomers(syspro_code));
    }, [])
  );

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
      {/* header section */}
      <View style={styles.header}>
        <Text style={styles.headerHome}>Home</Text>
        <Pressable
        // onPress={() => navigation.navigate(Routes.NOTIFICATIONS_SCREEN)}
        >
          <View style={styles.headerNotification}>
            <Image source={icons.notificationIcon} />
            <Text style={styles.headerNotificationText}>Notifications</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => toggle()}>
          <View style={styles.settingsContainer}>
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              source={icons.userAvaterIcon}
            />
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
                <Text
                  style={[
                    styles.statsText,
                    {
                      fontFamily: "Gilroy-Medium",
                    },
                  ]}
                >
                  Total Sales
                </Text>

                <CountryCurrency
                  country={country}
                  price={
                    stats?.totalSales ? `${formatPrice(stats.totalSales)}` : 0
                  }
                  color={appTheme.COLORS.white}
                  fontSize={20}
                  fontWeight="bold"
                  fontFamily="Gilroy-Bold"
                />
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
                  <Text
                    style={[
                      styles.statsText,
                      {
                        fontFamily: "Gilroy-Medium",
                      },
                    ]}
                  >
                    {stats?.deliveryCounts}{" "}
                    {stats?.deliveryCounts > 1 ? "Deliveries" : "Delivery"}
                  </Text>

                  <CountryCurrency
                    country={country}
                    price={
                      stats?.deliveries ? `${formatPrice(stats.deliveries)}` : 0
                    }
                    color={appTheme.COLORS.white}
                    fontSize={18}
                    fontWeight="bold"
                    fontFamily="Gilroy-Bold"
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.statsText,
                      {
                        fontFamily: "Gilroy-Medium",
                      },
                    ]}
                  >
                    {stats?.visitCounts}{" "}
                    {stats?.visitCounts > 1 ? "Visits" : "Visit"}
                  </Text>

                  <CountryCurrency
                    country={country}
                    price={stats?.visits ? `${formatPrice(stats.visits)}` : 0}
                    color={appTheme.COLORS.white}
                    bold
                    fontSize={18}
                    fontWeight="bold"
                    fontFamily="Gilroy-Bold"
                  />
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
                      fontSize: 15 * appTheme.SIZES.scale,
                      color: appTheme.COLORS.mainTextGray,
                      fontFamily: "Gilroy-Bold",
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
                      fontSize: 14 * appTheme.SIZES.scale,
                      color: appTheme.COLORS.mainRed,
                      fontFamily: "Gilroy-Bold",
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
        user={user}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
