import React from 'react';
import {View, Text} from 'react-native';
import appTheme from '../constants/theme';

const Notification = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
      }}>
      <View
        style={{
          backgroundColor: appTheme.COLORS.mainGreen,
          width: 10,
          height: 10,
          borderRadius: 50,
          top: 5,
        }}></View>
      <View
        style={{
          marginLeft: 10,
        }}>
        <Text
          style={{
            marginBottom: 5,
            fontWeight: '700',
            fontSize: 16,
            color: appTheme.COLORS.mainTextGray,
          }}>
          {item.Notification}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginRight: 10,
              color: appTheme.COLORS.mainTextGray,
            }}>
            {item.date}
          </Text>
          <Text
            style={{
              color: appTheme.COLORS.mainTextGray,
            }}>
            ({item.time})
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notification;
