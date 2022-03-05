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
} from "../constants/userConstants";
import { userUrl, vehicleUrl } from "../../utils/baseUrl";

export const register = (navigation) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const token = await adService.getIdToken();
    const decoded = await jwt_decode(token);

    // console.log(decoded, "decoded from welcome screen");

    const phoneNumber = decoded.extension_PhoneNumber;
    const driverEmail = decoded.emails[0];

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
        payload: driverEmail,
      });
    } else {
      const {
        data: { data },
      } = await axios.get(
        `${vehicleUrl}/GetVehicle/GetByPhoneNumber/${phoneNumber}`
      );

      // console.log(data, "+++++++++++++++++++++++");

      await AsyncStorage.setItem("driverDetails", JSON.stringify(data));
      await AsyncStorage.setItem("token", token);
      // navigation.navigate(Routes.HOME_SCREEN);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: data,
          token: token,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
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

    // console.log(decoded, "decoded from login screen");

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
        payload: "user registered",
      });
    } else {
      const {
        data: { data },
      } = await axios.get(
        `${vehicleUrl}/GetVehicle/GetByPhoneNumber/${phoneNumber}`
      );

      await AsyncStorage.setItem("driverDetails", JSON.stringify(data));
      await AsyncStorage.setItem("token", token);
      navigation.navigate(Routes.HOME_SCREEN);

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
  }

  await adService.logoutAsync();
  await AsyncStorage.clear();
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
