import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import appTheme from '../constants/theme';

const CustomerCard = ({order, allOrders}) => {
  const navigation = useNavigation();

  const numberOfOrders = allOrders.filter(
    od => od.buyerCompanyId === order.buyerCompanyId,
  );

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CustomerDetails', {
          order,
          numberOfOrders,
          allOrders,
        })
      }>
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingLeft: 20,
          paddingTop: 20,
          paddingBottom: 15,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: appTheme.COLORS.mainGreen,
            width: 8,
            height: 8,
            borderRadius: 50,
            marginRight: 12,
            top: 7,
          }}></View>
        <View>
          <Text
            style={{
              fontSize: 15,
              marginBottom: 5,
              ...appTheme.FONTS.mainFontBold,
            }}>
            {order.buyerDetails[0].buyerName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 15,
                marginRight: 10,
                color: appTheme.COLORS.mainTextGray,
                ...appTheme.FONTS.mainFontLight,
              }}>
              {/* {customer.orders} Orders */}
              {`${numberOfOrders.length} ${
                numberOfOrders.length !== 1 ? 'Orders' : 'Order'
              }`}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: appTheme.COLORS.mainTextGray,
                ...appTheme.FONTS.mainFontLight,
              }}>
              {/* {'\u20A6'} */}
              {/* {customer.amount} */}
              {/* 10,000000 */}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({});
