import React, { useEffect } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { adService } from "ad-b2c-react-native";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Refresh = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();

  const checkValid = async () => {
    const data = await adService.getAccessTokenAsync();
    const { isValid } = await adService.getAccessTokenAsync();
    isValid ? navigation.navigate("HomeScreen") : null;

    console.log(data);
  };

  useEffect(() => {
    ss;
    checkValid();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const token = await adService.getIdToken();
    const { isValid } = await adService.getAccessTokenAsync();
    const decoded = jwt_decode(token);
    const email = decoded.emails[0];
    const {
      data: { data },
    } = await axios.get(
      `http://102.133.206.181/GetVehicle/GetByVehicleId/${email}`
    );

    await AsyncStorage.setItem("driverDetails", JSON.stringify(data));
    console.log(isValid);
    isValid ? navigation.navigate("HomeScreen") : null;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to Continue</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  scrollView: {
    flex: 1,
    // backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Refresh;
