import axios from "axios";

import {
  CREATE_ONE_OF_CUSTOMER_REQUEST,
  CREATE_ONE_OF_CUSTOMER_SUCCES,
  CREATE_ONE_OF_CUSTOMER_FAIL,
  GET_CUSTOMER_ORDERS_REQUEST,
  GET_CUSTOMER_ORDERS_SUCCESS,
  GET_CUSTOMER_ORDERS_FAIL,
  CLEAR_CUSTOMER_ERROR,
} from "../constants/customerConstants";
import { customerUrl, orderUrl } from "../../utils/baseUrl";
import Routes from "../../navigation/Routes";

export const createCustomerOneOf =
  (data, navigation) => async (dispatch, getState) => {
    const {
      user: { country },
    } = getState().user;

    const customerCountry = country === "UG" ? "Uganda" : "NIgeria";
    try {
      dispatch({
        type: CREATE_ONE_OF_CUSTOMER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { customerName, phoneNumber } = data;

      const body = {
        phoneNumber,
        customerName,
        country: customerCountry,
      };

      const {
        data: { result },
      } = await axios.post(
        `${customerUrl}/oneoff-customer/register`,
        body,
        config
      );

      dispatch({
        type: CREATE_ONE_OF_CUSTOMER_SUCCES,
        payload: result,
      });

      navigation.navigate(Routes.ONEOF_SALE_SCREEN);
    } catch (error) {
      dispatch({
        type: CREATE_ONE_OF_CUSTOMER_FAIL,
        payload: error.response.data,
      });
    }
  };

export const getCustomerOrders = (code) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CUSTOMER_ORDERS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { order },
    } = await axios.get(
      `${orderUrl}/GetOrder/GetOrderByBuyerCompanyId/${code}`,
      config
    );

    dispatch({
      type: GET_CUSTOMER_ORDERS_SUCCESS,
      payload: order,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_ORDERS_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const clearCustomerError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CUSTOMER_ERROR,
  });
};
