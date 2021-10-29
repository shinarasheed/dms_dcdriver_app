import React, {useEffect} from 'react';
import {
  StyleSheet,
  Pressable,
  Image,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ProductFlastlist from '../../components/ProductFlatList';
import appTheme from '../../constants/theme';
import SearchBar from '../../components/SearchBar';
import {icons} from '../../constants';
import {fetchProducts} from '../../redux/actions/productActions';
import {fetchVanProducts} from '../../redux/actions/vanActions';

const index = () => {
  const Allproducts = useSelector(state => state.products);
  const Van = useSelector(state => state.van);
  const {inventory, loading: vanLoading, error: vanError} = Van;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {products, loading, error} = Allproducts;

  useEffect(() => {
    dispatch(fetchVanProducts());
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}>
      {/* header */}

      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: 40,
          paddingLeft: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 5,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={icons.backButton} style={{marginRight: 18}} />
        </Pressable>

        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            ...appTheme.FONTS.mainFontBold,
          }}>
          All Products
        </Text>
      </View>

      {/* header  */}

      <SearchBar />
      <ProductFlastlist price list={products} />
    </SafeAreaView>
  );
};

export default index;

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
