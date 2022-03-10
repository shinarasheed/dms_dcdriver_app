import React from "react";
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  View,
  Pressable,
  Keyboard,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { createCustomerOneOf } from "../../redux/actions/customerActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Routes from "../../navigation/Routes";

const AddCustomer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      customerName: "",
    },
  });

  const customerState = useSelector((state) => state.customerOneOf);

  const { error } = customerState;

  const handleRegister = (data) => {
    try {
      dispatch(createCustomerOneOf(data, navigation));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: appTheme.COLORS.mainBackground,
      }}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            height: 40,
            paddingLeft: 20,
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 5,
          }}
        >
          <Pressable
            onPress={() => navigation.navigate(Routes.CUSTOMERS_SCREEN)}
          >
            <Image source={icons.backButton} style={{ marginRight: 18 }} />
          </Pressable>

          <Text
            style={{
              fontSize: 17,
              fontFamily: "Gilroy-Medium",
            }}
          >
            One-of
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Gilroy-Medium",
            }}
          >
            f sale
          </Text>
        </View>

        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            marginTop: 20,
            marginBottom: 20,
            height: 200,
            padding: 15,
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Customer</Text>

          <View
            style={{
              marginBottom: 30,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  style={styles.textInput}
                  placeholder="Phone number"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && (
              <Text
                style={{
                  color: appTheme.COLORS.mainRed,
                }}
              >
                Phone Number is required.
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  style={styles.textInput}
                  placeholder="Customer Name"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="customerName"
            />
            {errors.customerName && (
              <Text
                style={{
                  color: appTheme.COLORS.mainRed,
                }}
              >
                Customer Name is required.
              </Text>
            )}
            {error && (
              <Text
                style={{
                  color: appTheme.COLORS.mainRed,
                }}
              >
                {error.msg}
              </Text>
            )}
          </View>
        </View>
      </Pressable>

      <View style={styles.footer}>
        <Button
          // disabled={!phoneNumber || !customerName ? true : false}
          buttonStyle={{
            backgroundColor: appTheme.COLORS.mainRed,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          title="Continue"
          onPress={handleSubmit(handleRegister)}
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
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
});
