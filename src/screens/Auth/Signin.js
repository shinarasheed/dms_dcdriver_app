import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {images} from '../../constants';
import appTheme from '../../constants/theme';

const Signin = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}>
      <View style={{flex: 1}}>
        <View>
          <Image source={images.AbInBev} />
        </View>
        <View>
          <Text>Welcome to AbInBev Distributor Central</Text>
          <Text>Click the button below to continue</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({});
