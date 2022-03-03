import { adService } from "ad-b2c-react-native";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "../../navigation/Routes";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESTORE_TOKEN,
  GET_DISTRIBUTOR_CUSTOMERS_REQUEST,
  GET_DISTRIBUTOR_CUSTOMERS_SUCCESS,
  GET_DISTRIBUTOR_CUSTOMERS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import { customerUrl, userUrl, vehicleUrl } from "../../utils/baseUrl";

export const register = (navigation) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const token = await adService.getIdToken();
    const decoded = await jwt_decode(token);

    console.log(decoded, "decoded from welcome screen");

    const phoneNumber = decoded.extension_PhoneNumber;

    console.log("welcome");

    // if the user is new
    if (decoded.newUser) {
      // register the driver

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        token,
      };

      //continue
      await axios.post(`${userUrl}/register`, body, config);

      navigation.navigate(Routes.CONTINUE_SCREEN);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: phoneNumber,
      });
    } else {
      const {
        data: { data },
      } = await axios.get(
        `${vehicleUrl}/GetVehicle/GetByPhoneNumber/${phoneNumber}`
      );

      if (!data.ownerCompanyId) {
        dispatch({
          type: LOGIN_FAIL,
          payload:
            "Login Error. Please wait until you are assigned a Distributor",
        });

        await adService.logoutAsync();
        await AsyncStorage.clear();
      } else {
        await AsyncStorage.setItem("driverDetails", JSON.stringify(data));
        await AsyncStorage.setItem("token", token);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: data,
            token: token,
          },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: "Signup Error. This account already exist in our system",
    });

    await adService.logoutAsync();
    await AsyncStorage.clear();
  }
};

export const login = (navigation) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const token = await adService.getIdToken();
    const decoded = await jwt_decode(token);

    console.log(decoded, "decoded from login screen");

    const phoneNumber = decoded.extension_PhoneNumber;

    if (decoded.newUser) {
      const body = {
        token,
      };

      //continue
      await axios.post(`${userUrl}/register`, body, config);

      navigation.navigate(Routes.CONTINUE_SCREEN);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: phoneNumber,
      });
    } else {
      const {
        data: { data },
      } = await axios.get(
        `${vehicleUrl}/GetVehicle/GetByPhoneNumber/${phoneNumber}`
      );

      await AsyncStorage.setItem("driverDetails", JSON.stringify(data));
      await AsyncStorage.setItem("token", token);
      // navigation.navigate(Routes.HOME_SCREEN);

      const user = data;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user,
          token,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });

    await adService.logoutAsync();
    await AsyncStorage.clear();
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const restoreToken = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  dispatch({
    type: RESTORE_TOKEN,
    payload: token,
  });
};

export const getDistributorCustomers = (code) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISTRIBUTOR_CUSTOMERS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { result },
    } = await axios.get(`${customerUrl}/customer/distributor/${code}`, config);

    dispatch({
      type: GET_DISTRIBUTOR_CUSTOMERS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_DISTRIBUTOR_CUSTOMERS_FAIL,
      payload: "There was an error",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
