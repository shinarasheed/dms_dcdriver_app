import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  Image,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// import SearchInput from '../../components/SearchInput';
import Header from '../../components/Header';
import TopTab from '../../components/CustomersTopTab';
import CustomerCard from '../../components/CustomerCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import appTheme from '../../constants/theme';
import CustomVirtualizedView from '../../components/VirtualizedList';
import {fetchOrder} from '../../redux/actions/orderActions';
import {icons} from '../../constants';

const CustomersScreen = () => {
  const categories = ['ALL', 'BULKBREAKERS', 'POCS', 'NEW'];
  const navigation = useNavigation();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const orders = useSelector(state => state.orders);
  const {loading, error, order: allOrders} = orders;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: appTheme.COLORS.mainBackground}}>
      <Header headerText="Customers" />
      <CustomVirtualizedView>
        <View style={{paddingHorizontal: 20}}>
          <TopTab
            categories={categories}
            selectedCategoryIndex={selectedCategoryIndex}
            setSelectedCategoryIndex={setSelectedCategoryIndex}
          />
          {/* <SearchInput /> */}
        </View>

        {!loading ? (
          <FlatList
            style={{marginTop: 20, marginBottom: 80}}
            data={allOrders}
            renderItem={({item}) => (
              <CustomerCard order={item} allOrders={allOrders} />
            )}
            keyExtractor={(item, id) => id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: appTheme.COLORS.borderGRey,
                }}></View>
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              color={
                Platform.OS === 'android' ? appTheme.COLORS.mainRed : undefined
              }
              animating={loading}
              size="large"
            />
          </View>
        )}
      </CustomVirtualizedView>

      <Pressable
        style={{
          backgroundColor: appTheme.COLORS.white,
          width: 180,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 40,
          borderWidth: 1,
          borderColor: appTheme.COLORS.borderGRey,
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}
        onPress={() => navigation.navigate('AddCustomer')}>
        <Image style={{marginRight: 10}} source={icons.cartIcon} />
        <Text style={{fontSize: 18}}>One of Sale</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CustomersScreen;
