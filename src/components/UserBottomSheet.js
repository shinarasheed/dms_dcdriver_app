import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {icons} from '../constants';
import appTheme from '../constants/theme';

export default function UserBottomSheet({toggle, visible}) {
  return (
    <View style={styles.container}>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}>
        <View style={styles.card}>
          <Pressable
            style={{position: 'absolute', top: 20, right: 20}}
            onPress={() => toggle()}>
            <Image source={icons.cancelIcon} />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image source={icons.profileIcon} />
            <View
              style={{
                marginLeft: 20,
              }}>
              <Text
                style={{
                  color: appTheme.COLORS.black,
                  ...appTheme.FONTS.mainFontBold,
                  fontSize: 20,
                  marginBottom: 8,
                }}>
                Lukman Yusuf
              </Text>
              <Text
                style={{
                  color: appTheme.COLORS.mainTextGray,
                  fontSize: 17,
                }}>
                lukmanyusuf@gmail.com
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: appTheme.COLORS.borderGRey1,
              marginTop: 20,
              marginBottom: 20,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={icons.logoutIcon} />

            <Text
              style={{
                fontSize: 20,
                marginLeft: 20,
              }}>
              Sign Out
            </Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
});
