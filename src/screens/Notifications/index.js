// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   FlatList,
//   SafeAreaView,
//   View,
//   Pressable,
//   Image,
//   Text,
// } from "react-native";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";

// import appTheme from "../../constants/theme";
// import NotificationsTab from "../../components/NotificationsTab";
// import Notification from "../../components/Notification";
// import { fetchOrder } from "../../redux/actions/orderActions";
// import { Spinner } from "../../components/Spinner";
// import { icons } from "../../constants";
// import CustomVirtualizedView from "../../components/VirtualizedList";
// import { or } from "react-native-reanimated";

// const index = () => {
//   const categories = ["all", "unread", "read"];
//   const [index, setIndex] = useState(0);

//   const navigation = useNavigation();

//   useFocusEffect(
//     React.useCallback(() => {
//       dispatch(fetchOrder());
//     }, [])
//   );

//   const dispatch = useDispatch();

//   const allOrders = useSelector((state) => state.orders);
//   const { order } = allOrders;

//   const theOrder = order.filter((od) => od.routeName === "SalesForce");

//   const Notifications = (index) => {
//     switch (index) {
//       case 0:
//         return (
//           <FlatList
//             data={theOrder}
//             keyExtractor={(item, id) => id.toString()}
//             renderItem={({ item }) => <Notification item={item} />}
//             contentContainerStyle={{
//               backgroundColor: appTheme.COLORS.white,
//               paddingLeft: 20,
//               marginTop: 20,
//               paddingTop: 10,
//             }}
//           />
//         );

//       case 1:
//         return (
//           <FlatList
//             data={theOrder}
//             keyExtractor={(item, id) => id.toString()}
//             renderItem={({ item }) => <Notification item={item} />}
//             contentContainerStyle={{
//               backgroundColor: appTheme.COLORS.white,
//               paddingLeft: 20,
//               marginTop: 20,
//               paddingTop: 10,
//             }}
//           />
//         );

//       default:
//         return (
//           <FlatList
//             data={theOrder}
//             keyExtractor={(item, id) => id.toString()}
//             renderItem={({ item }) => <Notification item={item} />}
//             contentContainerStyle={{
//               backgroundColor: appTheme.COLORS.white,
//               paddingLeft: 20,
//               marginTop: 20,
//               paddingTop: 10,
//             }}
//           />
//         );
//     }
//   };

//   return (
//     <SafeAreaView
//       style={{
//         backgroundColor: appTheme.COLORS.mainBackground,
//         flex: 1,
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: appTheme.COLORS.white,
//           height: 40,
//           paddingLeft: 20,
//           flexDirection: "row",
//           alignItems: "center",
//           paddingBottom: 5,
//         }}
//       >
//         <Pressable onPress={() => navigation.goBack()}>
//           <Image source={icons.backButton} style={{ marginRight: 18 }} />
//         </Pressable>

//         <Text
//           style={{
//             fontSize: 17,
//             fontWeight: "700",
//             ...appTheme.FONTS.mainFontBold,
//           }}
//         >
//           Notifications
//         </Text>
//       </View>

//       <CustomVirtualizedView>
//         <View
//           style={{
//             paddingHorizontal: 20,
//           }}
//         >
//           <View style={{ marginBottom: 20 }}>
//             <NotificationsTab
//               categories={categories}
//               index={index}
//               setIndex={setIndex}
//             />
//           </View>

//           {order.length > 0 ? (
//             Notifications(index)
//           ) : (
//             <Spinner
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             />
//           )}
//         </View>
//       </CustomVirtualizedView>

import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const index = () => {
  const createAndSavePDF = async () => {
    const html = `<h1> Teste </h1>`;

    try {
      const { uri } = await Print.printToFileAsync({ html });

      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log("asset ===", asset);
        if (asset) {
          Alert.alert("", `${"Document saved at " + asset.uri}`, [
            { text: "OK" },
          ]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Print and Share" onPress={() => createAndSavePDF()} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
