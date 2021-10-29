import * as React from 'react';
import {Text, Image, View, Pressable} from 'react-native';
import {icons} from '../constants';

import appTheme from '../constants/theme';

const Header = ({headerText, back, goBack}) => {
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        height: 40,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
      }}>
      {goBack && (
        <Pressable onPress={back}>
          <Image source={icons.backButton} style={{marginRight: 18}} />
        </Pressable>
      )}
      <Text
        style={{
          fontSize: 17,
          fontWeight: '700',
          ...appTheme.FONTS.mainFontBold,
        }}>
        {headerText}
      </Text>
    </View>
  );
};

export default Header;
