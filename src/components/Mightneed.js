// import React, {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   Pressable,
//   TextInput,
//   Image,
//   Text,
//   View,
//   StyleSheet,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {useRoute, useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import {fetchProducts} from '../../redux/actions/productActions';
// import SearchBar from '../../components/SearchBar';
// import appTheme from '../../constants/theme';
// import SellProductFlatList from '../../components/SellProductFlatList';
// import SellProductFooter from '../../components/SellProductFooter';
// import CustomVirtualizedView from '../../components/VirtualizedList';
// import {icons} from '../../constants';

// const SellToCustomer = () => {
//   const [searchField, setSearchField] = useState('');
//   const navigator = useNavigation();
//   const Allproducts = useSelector(state => state.products);
//   const customerOneOf = useSelector(state => state.customerOneOf);
//   const {
//     customer,
//     loading: loadingCustomer,
//     error: errorCustomer,
//   } = customerOneOf;

//   const dispatch = useDispatch();
//   const {products, loading, error} = Allproducts;

//   const [newProducts, setNewProducts] = useState([]);

//   const route = useRoute();
//   const order = route.params;

//   console.log(order);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const createProducts = () => {
//     const lastestProducts = products.map(product => ({
//       ...product,
//       quantity: 0,
//     }));
//     return lastestProducts;
//   };

//   useEffect(() => {
//     setNewProducts(createProducts());
//   }, [products]);

//   const incrementQuantity = productId => {
//     let product = newProducts.find(product => product.productId === productId);
//     product.quantity++;
//     setNewProducts([...newProducts]);
//   };

//   const decrementQuantity = productId => {
//     const product = newProducts.find(
//       product => product.productId === productId,
//     );
//     if (product.quantity === 1) {
//       const index = newProducts.findIndex(
//         product => product.productId === productId,
//       );
//       newProducts.splice(index, 1);
//       setNewProducts([...newProducts]);
//     } else {
//       product.quantity--;
//       setNewProducts([...newProducts]);
//     }
//   };

//   const deleteProduct = productId => {
//     const index = newProducts.findIndex(
//       product => product.productId === productId,
//     );
//     newProducts.splice(index, 1);
//     setNewProducts([...newProducts]);
//   };

//   const getTotalPrice = () => {
//     return newProducts.reduce(
//       (accumulator, item) => accumulator + item.quantity * item.price,
//       0,
//     );
//   };

//   const productsToSell = newProducts.filter(product => product.quantity > 0);

//   let filteredProducts = [];

//   const handleOnChangetext = text => {
//     setSearchField(text);
//     filteredProducts = newProducts.filter(prod => {
//       return prod.brand.toLowerCase().includes(searchField.toLowerCase());
//     });
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: appTheme.COLORS.mainBackground,
//       }}>
//       <View
//         style={{
//           backgroundColor: appTheme.COLORS.white,
//           height: 40,
//           paddingLeft: 20,
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingBottom: 5,
//         }}>
//         <Pressable onPress={() => navigator.goBack()}>
//           <Image source={icons.backButton} style={{marginRight: 18}} />
//         </Pressable>

//         <Text
//           style={{
//             fontSize: 17,
//             fontWeight: '700',
//             ...appTheme.FONTS.mainFontBold,
//             textTransform: 'capitalize',
//           }}>
//           {customer.CUST_Name !== undefined && `sell to ${customer.CUST_Name}`}
//         </Text>
//       </View>

//       <CustomVirtualizedView>
//         {/* <SearchBar /> */}
//         <View
//           style={{
//             paddingHorizontal: 20,
//             marginBottom: 20,
//           }}>
//           <View style={styles.searchInputContainer}>
//             <Icon
//               name="search"
//               size={25}
//               style={{color: appTheme.COLORS.MainGray}}
//             />
//             <TextInput
//               placeholder="Search"
//               style={{fontSize: 18, paddingLeft: 5, flex: 1}}
//               onChangeText={text => handleOnChangetext(text)}
//             />
//           </View>
//         </View>
//         {/* searchbar */}

//         <View
//           style={{
//             marginTop: 5,
//             marginBottom: 30,
//           }}>
//           <SellProductFlatList
//             newProducts={newProducts}
//             incrementQuantity={incrementQuantity}
//             decrementQuantity={decrementQuantity}
//             deleteProduct={deleteProduct}
//             loading={loading}
//           />
//         </View>
//       </CustomVirtualizedView>

//       {/* Footer */}
//       <SellProductFooter
//         getTotalPrice={getTotalPrice}
//         productsToSell={productsToSell}
//         incrementQuantity={incrementQuantity}
//         decrementQuantity={decrementQuantity}
//         deleteProduct={deleteProduct}
//         order={order}
//       />
//     </SafeAreaView>
//   );
// };

// export default SellToCustomer;

// const styles = StyleSheet.create({
//   searchInputContainer: {
//     height: 50,
//     backgroundColor: appTheme.COLORS.white,
//     marginTop: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#9799A0',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//   },
// });
