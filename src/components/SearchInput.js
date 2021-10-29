import React from 'react';
import {StyleSheet, TextInput, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import appTheme from '../constants/theme';
import icons from '../constants/icons';

const SearchInput = () => {
  return (
    <View style={styles.searchInputContainer}>
      <Icon name="search" size={20} style={{color: appTheme.COLORS.MainGray}} />
      <TextInput
        placeholder="Search customer/order no"
        style={{fontSize: 17, paddingLeft: 5, flex: 1}}
      />
      <Image source={icons.sortIcon} />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9799A0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
