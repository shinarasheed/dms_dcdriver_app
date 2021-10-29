import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import appTheme from '../constants/theme';

const AuthButton = ({title, Onpress}) => {
  return (
    <TouchableOpacity style={styles.buttonStyles} onPress={Onpress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

export const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: appTheme.COLORS.mainRed,
    color: appTheme.COLORS.white,
    fontSize: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 4,
  },

  title: {
    color: appTheme.COLORS.white,
  },
});
