import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  View,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import {createCustomerOneOf} from '../../redux/actions/customerActions';
import Header from '../../components/Header';
import appTheme from '../../constants/theme';

const AddCustomer = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleRegister = () => {
    if (!phoneNumber) {
      Alert.alert('Please enter phone number');
      return;
    }

    if (!customerName) {
      Alert.alert('Please enter name');
      return;
    }

    dispatch(createCustomerOneOf({phoneNumber, customerName}));
    navigator.navigate('OneOfSale');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: appTheme.COLORS.mainBackground,
      }}>
      <Pressable onPress={Keyboard.dismiss}>
        <Header goBack headerText="One-off Sale" />
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            marginTop: 20,
            marginBottom: 20,
            height: 200,
            padding: 15,
          }}>
          <Text style={{fontSize: 20, marginBottom: 20}}>Customer</Text>

          <TextInput
            style={[styles.textInput, {marginBottom: 10}]}
            placeholder="Phone number"
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={text => setCustomerName(text)}
            value={customerName}
          />
        </View>
      </Pressable>

      <View style={styles.footer}>
        <Button
          disabled={!phoneNumber || !customerName ? true : false}
          buttonStyle={{
            backgroundColor: appTheme.COLORS.mainRed,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          title="Continue"
          onPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0,
    borderColor: appTheme.COLORS.borderGRey,
    borderBottomWidth: 1,
  },
  footer: {
    height: 90,
    backgroundColor: appTheme.COLORS.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
});
