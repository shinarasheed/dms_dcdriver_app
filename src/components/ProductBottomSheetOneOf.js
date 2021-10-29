import React, {useState} from 'react';
import {FlatList, StyleSheet, Image, Pressable, Text, View} from 'react-native';
import icons from '../constants/icons';

import appTheme from '../constants/theme';
import ProductBottomSheetCard from './ProductBottomSheetCardOneOf';
import CustomVirtualist from './VirtualizedList';
import ProductFooter from './ProductFooterOneOf';
import EmptiesCustomer from './EmptiesCustomerOneOf';

const ProductBottomSheetOneOf = ({
  productsToSell,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  getTotalPrice,
  toggle,
  item,
  getQuantity,
  calNumberOfFull,
  setEmpties,
  empties,
  getEmptiesPrice,
  customer,
}) => {
  return (
    <CustomVirtualist>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: appTheme.COLORS.borderGRey,
          paddingBottom: 30,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18}}>Sell To {customer.CUST_Name}</Text>
          <Pressable onPress={() => toggle()}>
            <Image source={icons.cancelIcon} />
          </Pressable>
        </View>

        <View>
          {/* empties */}
          {calNumberOfFull() ? (
            <EmptiesCustomer
              empties={empties}
              setEmpties={setEmpties}
              NumberOfFull={calNumberOfFull}
              toggle={toggle}
            />
          ) : null}
        </View>
      </View>

      <FlatList
        data={productsToSell}
        keyExtractor={(item, id) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ProductBottomSheetCard
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            deleteProduct={deleteProduct}
            productsToSell={productsToSell}
            item={item}
            getQuantity={getQuantity}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: appTheme.COLORS.Grey,
            }}></View>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: appTheme.COLORS.borderGRey,
              paddingTop: 20,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                marginBottom: 10,
                color: appTheme.COLORS.black,
              }}>
              EMPTIES
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: appTheme.COLORS.borderGRey1,
                  }}>
                  Qty:
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: appTheme.COLORS.black,
                  }}>
                  {' '}
                  {empties}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  ...appTheme.FONTS.mainFontBold,
                  color: appTheme.COLORS.mainRed,
                  marginRight: 15,
                }}>
                {'\u20A6'}
                {getEmptiesPrice()}
              </Text>
            </View>
          </View>
        )}
      />

      <ProductFooter
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        deleteProduct={deleteProduct}
        getTotalPrice={getTotalPrice}
        order={item}
        productsToSell={productsToSell}
        customer={customer}
      />
    </CustomVirtualist>
  );
};

export default ProductBottomSheetOneOf;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
