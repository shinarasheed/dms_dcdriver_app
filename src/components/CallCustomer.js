import React from 'react';
import {StyleSheet, Linking, Pressable, Image, Text, View} from 'react-native';
import {icons} from '../constants';
import appTheme from '../constants/theme';

const CallCustomer = ({phoneNumber}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 60,
      }}>
      <Pressable onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
        <Image source={icons.phoneIcon} />
      </Pressable>

      <Text
        style={{
          fontSize: 15,
          fontWeight: '500',
          marginLeft: 5,
          color: appTheme.COLORS.black,
        }}>
        Call
      </Text>
    </View>
  );
};

export default CallCustomer;

const styles = StyleSheet.create({});
