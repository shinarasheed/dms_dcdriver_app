import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import appTheme from '../constants/theme';

const ProductCard = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: appTheme.COLORS.white,
      }}>
      {item.product.imageUrl !== undefined && (
        <Image
          style={{width: 30, height: 80}}
          source={{uri: item.product.imageUrl}}
        />
      )}
      <View style={{marginLeft: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              ...appTheme.FONTS.mainFontBold,
              textTransform: 'capitalize',
              marginRight: 5,
              color: appTheme.COLORS.black,
            }}>
            {item.product.brand}
          </Text>
          <Text
            style={{
              fontSize: 18,
              ...appTheme.FONTS.mainFontBold,
              textTransform: 'capitalize',
              color: appTheme.COLORS.black,
            }}>
            {item.product.sku}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor:
                  item.product.productType === 'full'
                    ? appTheme.COLORS.mainYellow
                    : item.product.productType === 'pet'
                    ? appTheme.COLORS.mainRed2
                    : appTheme.COLORS.mainRed3,
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 20,
                marginRight: 10,
              }}>
              <Text style={{color: appTheme.COLORS.white}}>
                {item.product.productType}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 17,

                  color: appTheme.COLORS.MainGray,
                }}>
                Qty:
              </Text>
              <Text style={{fontSize: 16, fontWeight: '600', marginLeft: 2}}>
                {item.quantity}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 80,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, marginRight: 2}}>Price:</Text>
            <Text
              style={{
                fontSize: 15,
                color: appTheme.COLORS.mainRed,
                ...appTheme.FONTS.mainFontBold,
              }}>
              {'\u20A6'}
              {item.product.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
