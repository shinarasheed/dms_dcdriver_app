import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import appTheme from '../constants/theme';

const DeliveryCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <>
      <Pressable onPress={() => navigation.navigate('DeliveryDetails', item)}>
        <View
          style={{
            padding: 20,
            paddingBottom: 10,
          }}>
          <View style={{flexDirection: 'row', marginBottom: 7}}>
            <Text
              style={{
                color: appTheme.COLORS.mainTextGray,
                fontSize: 14,
                ...appTheme.FONTS.mainFontLight,
              }}>
              Order: {item?.referenceId},
            </Text>
            <Text
              style={{
                color: appTheme.COLORS.mainTextGray,
                fontSize: 14,
                marginRight: 5,
                marginLeft: 8,
                ...appTheme.FONTS.mainFontLight,
              }}>
              {moment(item?.orderStatus[0]?.dateAssigned).format(
                'MMM Do, YYYY',
              )}
            </Text>
            <Text
              style={{
                textTransform: 'lowercase',
                color: appTheme.COLORS.MainGray,
                fontSize: 14,
                ...appTheme.FONTS.mainFontLight,
              }}>
              at {''}
              {new Date(
                item?.orderStatus[0]?.timeAssigned,
              ).toLocaleTimeString()}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                ...appTheme.FONTS.mainFontBold,
              }}>
              {item?.buyerDetails[0]?.buyerName}
            </Text>
            <Text
              style={{
                backgroundColor:
                  item.status === 'Assigned'
                    ? appTheme.COLORS.Grey
                    : item.status === 'Accepted'
                    ? appTheme.COLORS.mainYellow
                    : item.status === 'Completed'
                    ? appTheme.COLORS.mainGreen
                    : appTheme.COLORS.mainRed,
                paddingHorizontal: 10,
                paddingVertical: 7,
                fontWeight: '600',
                borderRadius: 20,
                color:
                  item.status === 'Assigned'
                    ? appTheme.COLORS.black
                    : item.status === 'Accepted'
                    ? appTheme.COLORS.white
                    : item.status === 'Completed'
                    ? appTheme.COLORS.white
                    : appTheme.COLORS.white,
              }}>
              {item?.status}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: appTheme.COLORS.MainOrange,
                fontSize: 14,
                marginRight: 10,
                ...appTheme.FONTS.mainFontBold,
              }}>
              {item?.orderItems.length}{' '}
              {/* TODO: this might fail.please correct */}
              {item?.orderItems.length === 1 ? 'product' : 'products'}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                ...appTheme.FONTS.mainFontBold,
                color: appTheme.COLORS.mainTextGray,
              }}>
              {'\u20A6'}
              {item?.totalPrice}
            </Text>
          </View>
        </View>
      </Pressable>
      {/* second */}
    </>
  );
};

export default DeliveryCard;
