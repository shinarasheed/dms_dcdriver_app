import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';

import appTheme from '../constants/theme';
import {confirmVanSales} from '../redux/actions/vanActions';
import {updateInventory} from '../redux/actions/vanActions';

const SellProductFooter = ({getTotalPrice, customer, productsToSell}) => {
  const navigator = useNavigation();

  const dispatch = useDispatch();

  const items = productsToSell.map(prod => ({
    price: prod.price * prod.quantity,
    quantity: prod.quantity,
    productId: parseInt(prod.productId),
    SFlineID: 'One-Off',
  }));

  const payload = {
    sellerCompanyId: 'One-Off',
    routeName: 'One-Off',
    referenceId: 'One-Off',
    datePlaced: new Date(new Date().getTime()),
    buyerDetails: {
      buyerName: customer.CUST_Name,
      buyerPhoneNumber: customer.phoneNumber,
    },

    orderItems: items,
  };

  return (
    <View style={styles.footerContainer}>
      <Button
        onPress={() => {
          dispatch(confirmVanSales(payload));
          navigator.navigate('SalesInvoice', {
            productsToSell,
            customer,
          });
          dispatch(updateInventory(payload));
        }}
        buttonStyle={{
          backgroundColor: appTheme.COLORS.mainRed,
          width: '100%',
          height: 50,
          justifyContent: 'center',
          borderRadius: 5,
          marginTop: 10,
        }}
        title={` Confirm \u20A6${getTotalPrice()}`}
      />
    </View>
  );
};

export default SellProductFooter;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: appTheme.COLORS.white,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
    elevation: 1,
  },
});
