import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Pressable,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchBar from '../../components/SearchBar';
import appTheme from '../../constants/theme';
import SellProductFlatList from '../../components/SellProductFlatList';
import SellProductFooter from '../../components/SellProductFooter';
import CustomVirtualizedView from '../../components/VirtualizedList';
import {icons} from '../../constants';
import {fetchVanProducts} from '../../redux/actions/vanActions';

const SellToCustomer = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [newInventory, setNewInventory] = useState([]);

  const route = useRoute();
  const order = route.params;

  const Van = useSelector(state => state.van);
  const {inventory, loading: vanLoading, error: vanError} = Van;

  useEffect(() => {
    dispatch(fetchVanProducts());
    let x = [];
    inventory.map(dat => {
      const z = dat?.product;
      x.push({
        ...z,
        quantity: 0,
      });
    });
    setNewInventory([...x]);
  }, []);

  const getQuantity = (productId, quantity) => {
    return (
      quantity <
      inventory.find(product => product.product.productId === productId)
        ?.quantity
    );
  };

  const [empties, setEmpties] = useState(0);

  const getEmptiesPrice = () => {
    return empties * 1000;
  };

  const getTotalPrice = () => {
    return newInventory.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0,
    );
  };

  const incrementQuantity = productId => {
    let product = newInventory.find(product => product.productId === productId);
    product.quantity++;
    setNewInventory([...newInventory]);
  };

  const decrementQuantity = productId => {
    const product = newInventory.find(
      product => product.productId === productId,
    );
    if (product.quantity === 1) {
      const index = newInventory.findIndex(
        product => product.productId === productId,
      );
      newInventory.splice(index, 1);
      setNewInventory([...newInventory]);
    } else {
      product.quantity--;
      setNewInventory([...newInventory]);
    }
  };

  const deleteProduct = productId => {
    const index = newInventory.findIndex(
      product => product.productId === productId,
    );
    newInventory.splice(index, 1);
    setNewInventory([...newInventory]);
  };

  const calNumberOfFull = () => {
    return newInventory
      .filter(product => product.productType === 'full')
      .reduce((acc, index) => parseInt(acc) + parseInt(index?.quantity), 0);
  };

  const getTotal = () => {
    return getTotalPrice() + (calNumberOfFull() - empties) * 1000;
  };

  const productsToSell = newInventory.filter(product => product.quantity > 0);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}>
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: 40,
          paddingLeft: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 5,
          marginBottom: 40,
        }}>
        <Pressable onPress={() => navigator.goBack()}>
          <Image source={icons.backButton} style={{marginRight: 18}} />
        </Pressable>

        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            ...appTheme.FONTS.mainFontBold,
            textTransform: 'capitalize',
          }}>
          {`sell to ${order?.buyerDetails[0]?.buyerName}`}
        </Text>
      </View>

      <CustomVirtualizedView>
        {/* <SearchBar /> */}
        {/* <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
          }}>
          <View style={styles.searchInputContainer}>
            <Icon
              name="search"
              size={25}
              style={{color: appTheme.COLORS.MainGray}}
            />
            <TextInput
              placeholder="Search"
              style={{fontSize: 18, paddingLeft: 5, flex: 1}}
              onChangeText={text => handleOnChangetext(text)}
            />
          </View>
        </View> */}
        {/* searchbar */}

        {/*  you need the token for customer and one of sales */}
        {/* new Date(new Date.getTime()) */}
        {/* shipToCode:buyerCompanyid */}
        {/* billtocode:not compulsosy */}
        {/* buyephone and adress is optional */}
        {/* sflineId = Van-Sales */}

        {/* One Off  */}

        {/* one of does not need buyercompany id */}
        {/* route name = One-Off */}

        <View
          style={{
            marginTop: 5,
            marginBottom: 30,
          }}>
          <SellProductFlatList
            inventory={newInventory}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            deleteProduct={deleteProduct}
            loading={vanLoading}
            getQuantity={getQuantity}
          />
        </View>
      </CustomVirtualizedView>
      {/* 
      {/* Footer */}
      <SellProductFooter
        getTotalPrice={getTotal}
        getProductPrice={getTotalPrice}
        getEmptiesPrice={getEmptiesPrice}
        productsToSell={productsToSell}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        deleteProduct={deleteProduct}
        order={order}
        getQuantity={getQuantity}
        calNumberOfFull={calNumberOfFull}
        setEmpties={setEmpties}
        empties={empties}
      />
    </SafeAreaView>
  );
};

export default SellToCustomer;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9799A0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
