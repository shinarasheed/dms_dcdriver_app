import axios from "axios";

import {
  CREATE_ONE_OF_CUSTOMER_REQUEST,
  CREATE_ONE_OF_CUSTOMER_SUCCES,
  CREATE_ONE_OF_CUSTOMER_FAIL,
  GET_CUSTOMER_ORDERS_REQUEST,
  GET_CUSTOMER_ORDERS_SUCCESS,
  GET_CUSTOMER_ORDERS_FAIL,
} from "../constants/customerConstants";
import { customerUrl, orderUrl } from "../../utils/baseUrl";

export const createCustomerOneOf =
  ({ phoneNumber, customerName }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CREATE_ONE_OF_CUSTOMER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        phoneNumber,
        customerName,
        country: "Nigeria",
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
    } catch (error) {
      dispatch({
        type: CREATE_ONE_OF_CUSTOMER_FAIL,
        payload: error.response.data.msg,
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
