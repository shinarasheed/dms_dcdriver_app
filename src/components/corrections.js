// import React, { useState, useEffect } from "react";
// import {
//   FlatList,
//   Text,
//   Image,
//   View,
//   Pressable,
//   TextInput,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";

// import Header from "../../components/Header";
// import { SafeAreaView } from "react-native-safe-area-context";
// import CustomVirtualizedView from "../../components/VirtualizedList";
// import { fetchOrder } from "../../redux/actions/orderActions";
// import { icons } from "../../constants";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import appTheme from "../../constants/theme";
// import Routes from "../../navigation/Routes";
// import axios from "axios";

// import AllCustomers from "../../components/Customers/AllCustomers";
// import Bulkbreakers from "../../components/Customers/BulkBreakers";
// import Pocs from "../../components/Customers/Pocs";
// import Newcustomers from "../../components/Customers/NewCustomers";
// import CustomersTab from "../../components/Customers/CustomerTab";

// const CustomersScreen = () => {
//   const categories = ["all", "bulkbreakers", "pocs", "new"];

//   const [index, setIndex] = useState(0);
//   const [customers, setCustomers] = useState([]);
//   const navigation = useNavigation();

//   const orders = useSelector((state) => state.orders);
//   const { loading, error, order: allOrders } = orders;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchOrder());
//   }, [dispatch]);

//   const ids = allOrders.map((item) => item?.buyerCompanyId);

//   const fetchCustomers = async () => {
//     const promises = ids.map((id) => {
//       return axios
//         .get(`http://20.87.38.134/customer/salesforce/${id}`)
//         .then((res) => res.data);
//     });
//     Promise.all(promises).then((data) => {
//       data.forEach((res) => {
//         setCustomers([res?.result[0]]);
//       });
//     });
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const bulkbreakers = customers.filter(
//     (customer) => customer.CUST_Type === "Bulkbreaker"
//   );
//   const pocs = customers.filter((customer) => customer.CUST_Type === "POC");

//   const ShowCustomers = (index) => {
//     switch (index) {
//       case 0:
//         return <AllCustomers allOrders={allOrders} list={customers} />;

//       case 1:
//         return <Bulkbreakers allOrders={allOrders} list={bulkbreakers} />;

//       case 1:
//         return <Pocs allOrders={allOrders} list={pocs} />;

//       case 1:
//         return <Newcustomers allOrders={allOrders} list={customers} />;

//       default:
//         return <AllCustomers allOrders={allOrders} list={customers} />;
//     }
//   };

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: appTheme.COLORS.mainBackground }}
//     >
//       <Header headerText="Customers" />
//       <CustomVirtualizedView>
//         <View style={{ paddingHorizontal: 20 }}>
//           <CustomersTab
//             categories={categories}
//             index={index}
//             setIndex={setIndex}
//           />

//           <View
//             style={{
//               marginBottom: 20,
//             }}
//           >
//             <View style={styles.searchInputContainer}>
//               <Icon
//                 name="search"
//                 size={25}
//                 style={{ color: appTheme.COLORS.MainGray }}
//               />
//               <TextInput
//                 placeholder="Search"
//                 style={{ fontSize: 18, paddingLeft: 5, flex: 1 }}
//               />
//             </View>
//           </View>
//         </View>

//         {!loading ? (
//           ShowCustomers(index)
//         ) : (
//           <ActivityIndicator
//             color={
//               Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
//             }
//             animating={loading}
//             size="large"
//           />
//         )}
//       </CustomVirtualizedView>

//       <Pressable
//         style={{
//           backgroundColor: appTheme.COLORS.white,
//           width: 180,
//           height: 50,
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "row",
//           borderRadius: 40,
//           borderWidth: 1,
//           borderColor: appTheme.COLORS.borderGRey,
//           position: "absolute",
//           right: 10,
//           bottom: 10,
//         }}
//         onPress={() => navigation.navigate(Routes.ADDCUSTOMER_SCREEN)}
//       >
//         <Image style={{ marginRight: 10 }} source={icons.cartIcon} />
//         <Text style={{ fontSize: 18 }}>One-Off Sale</Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// };

// export default CustomersScreen;

// const styles = StyleSheet.create({
//   searchInputContainer: {
//     height: 50,
//     backgroundColor: appTheme.COLORS.white,
//     marginTop: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "#9799A0",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//   },
// });

// EMPTIES

// import React from "react";
// import { StyleSheet, Pressable, Text, TextInput, View } from "react-native";
// import appTheme from "../constants/theme";

// const Empties = ({ NumberOfFull, setEmpties, empties }) => {
//   return (
//     <Pressable>
//       <Text
//         style={{
//           fontSize: 17,
//           color: appTheme.COLORS.mainTextGray,
//           marginBottom: 20,
//         }}
//       >
//         Empties returned by
//       </Text>
//       <View
//         style={{
//           flexDirection: "row",
//         }}
//       >
//         <View
//           style={[styles.productIncreaseDecreaseContainer, { marginRight: 5 }]}
//         >
//           <Pressable
//             disabled={empties === 0 ? true : false}
//             onPress={() => setEmpties(empties - 1)}
//           >
//             <Text style={styles.IncreaseText}>-</Text>
//           </Pressable>
//         </View>
//         <TextInput
//           style={{
//             borderWidth: 1,
//             width: 70,
//             borderColor: appTheme.COLORS.borderGRey,
//             marginRight: 5,
//             borderRadius: 5,
//             textAlign: "center",
//             color: appTheme.COLORS.MainGray,
//             fontWeight: "bold",
//           }}
//           value={empties}
//           onChangeText={(text) => setEmpties(text)}
//           keyboardType="numeric"
//         />
//         <View style={styles.productIncreaseDecreaseContainer}>
//           <Pressable
//             disabled={empties >= NumberOfFull()}
//             onPress={() => setEmpties(empties + 1)}
//           >
//             <Text style={styles.IncreaseText}>+</Text>
//           </Pressable>
//         </View>
//       </View>
//     </Pressable>
//   );
// };

// export default Empties;

// const styles = StyleSheet.create({
//   productIncreaseDecreaseContainer: {
//     backgroundColor: appTheme.COLORS.boxGray,
//     alignItems: "center",
//     justifyContent: "center",
//     width: 30,
//     height: 30,
//     borderRadius: 5,
//   },
//   IncreaseText: {
//     color: appTheme.COLORS.mainRed,
//     fontWeight: "bold",
//     fontSize: 20,
//   },
// });
