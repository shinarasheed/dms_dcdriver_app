import axios from "axios";

import {
  CREATE_ONE_OF_CUSTOMER_REQUEST,
  CREATE_ONE_OF_CUSTOMER_SUCCES,
  CREATE_ONE_OF_CUSTOMER_FAIL,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FECTH_CUSTOMER_FAIL,
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

export const fetchCustomer = () => async (dispatch, getState) => {
  const { order: allOrders } = getState().orders;
  console.log(allOrders, "-----");

  const ids = allOrders.map((item) => item?.buyerCompanyId);

  try {
    const promises = ids.map((id) => {
      return axios
        .get(`http://20.87.38.134/customer/salesforce/${id}`)
        .then((res) => res.data);
    });
    Promise.all(promises).then((data) => {
      data.forEach((res) => {
        console.log(data);
      });
    });
    dispatch({
      type: FETCH_CUSTOMER_REQUEST,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FECTH_CUSTOMER_FAIL,
      payload: "There was an error",
    });
  }
};
