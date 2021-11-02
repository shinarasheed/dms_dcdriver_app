import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  FETCH_SINGLE_ORDER_REQUEST,
  FETCH_SINGLE_ORDER_SUCCESS,
  FETCH_SINGLE_ORDER_FAIL,
  FETCH_ORDER_STATS_REQUEST,
  FETCH_ORDER_STATS_SUCCESS,
  FETCH_ORDER_STATS_FAIL,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  CONFIRM_ORDER_FAIL,
} from "../constants/orderContants";
import { orderUrl } from "../../utils/baseUrl";

export const fetchOrder = () => async (dispatch) => {
  const driver = JSON.parse(await AsyncStorage.getItem("driverDetails"));

  try {
    dispatch({
      type: FETCH_ORDER_REQUEST,
    });

    const {
      data: { order },
    } = await axios.get(
      `${orderUrl}/GetOrder/GetOrderByVehicleId/${driver?.vehicleId}`
    );

    dispatch({
      type: FETCH_ORDER_SUCCESS,
      payload: order,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_ORDER_FAIL,
      payload: "There was an error",
    });
  }
};

export const updateOrderStatus =
  ({ assignedToId, orderId, status }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ORDER_STATUS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        assignedToId,
        status,
      };

      const { data: order } = await axios.patch(
        `${orderUrl}/UpdateOrder/UpdateStatus/${orderId}`,
        body,
        config
      );

      const theOrder = order.order;

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: theOrder[0],
      });

      dispatch(fetchOrder());
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_ORDER_STATUS_FAIL,
        payload: "There was an error",
      });
    }
  };

export const fetchSingleOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_SINGLE_ORDER_REQUEST,
    });

    const {
      data: { order },
    } = await axios.get(`${orderUrl}/GetOrder/GetOrderByOrderId/${orderId}`);

    dispatch({
      type: FETCH_SINGLE_ORDER_SUCCESS,
      payload: order[0],
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_SINGLE_ORDER_FAIL,
      payload: "There was an error",
    });
  }
};

export const fetchOrderStats =
  (
    vehicleId,
    startDate = new Date(Date.now()).toISOString().split("T")[0],
    endDate = new Date(Date.now()).toISOString().split("T")[0]
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: FETCH_ORDER_STATS_REQUEST,
      });

      const { data: order } = await axios.get(
        `${orderUrl}/GetOrder/GetOrderSummaryByVehicleId/${vehicleId}/${startDate}/${endDate}`
      );

      dispatch({
        type: FETCH_ORDER_STATS_SUCCESS,
        payload: order.order,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_ORDER_STATS_FAIL,
        payload: "There was an error",
      });
    }
  };

export const confirmOrder =
  ({ payload, orderId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CONFIRM_ORDER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.patch(
        `${orderUrl}/UpdateOrder/UpdateOrderDetails/${orderId}`,
        payload,
        config
      );

      dispatch({
        type: CONFIRM_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CONFIRM_ORDER_FAIL,
        payload: "There was an error",
      });
    }
  };
