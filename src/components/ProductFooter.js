import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';

import appTheme from '../constants/theme';
import {updateOrderStatus} from '../redux/actions/orderActions';
import {confirmVanSales} from '../redux/actions/vanActions';
import {updateInventory} from '../redux/actions/vanActions';

const SellProductFooter = ({getTotalPrice, order, productsToSell}) => {
  // TODO: you need to pass the item as route parameter later
  const navigator = useNavigation();

  const dispatch = useDispatch();

  const items = productsToSell.map(prod => ({
    price: prod.price * prod.quantity,
    quantity: prod.quantity,
    productId: parseInt(prod.productId),
    SFlineID: 'Van-Sales',
  }));

  const payload = {
    buyerCompanyId: order.buyerCompanyId,
    sellerCompanyId: order.sellerCompanyId,
    routeName: 'Van-Sales',
    referenceId: 'Van-Sales',
    datePlaced: new Date(new Date().getTime()),
    shipToCode: order.buyerCompanyId,
    billToCode: order.buyerCompanyId,
    // transactionNo,
    buyerDetails: {
      buyerName: order.buyerDetails[0].buyerName,
      buyerPhoneNumber: order.buyerDetails[0].buyerPhoneNumber,
      buyerAddress: order.buyerDetails[0].buyerAddress,
    },

    orderItems: items,
  };

  return (
    <View style={styles.footerContainer}>
      <Button
        onPress={() => {
          dispatch(confirmVanSales(payload));
          navigator.navigate('VanInvoice', {
            productsToSell,
            order,
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
