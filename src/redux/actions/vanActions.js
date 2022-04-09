import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FETCH_INVENTORY_FAIL,
  FETCH_INVENTORY_REQUEST,
  FETCH_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  CONFIRM_VAN_SALES_REQUEST,
  CONFIRM_VAN_SALES_SUCCESS,
  CONFIRM_VAN_SALES_FAIL,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  DELETE_PRODUCT,
  INCREMENT_QUANTITY_TYPING,
  RETURN_PRODUCTS_REQUEST,
  RETURN_PRODUCTS_SUCCESS,
  RETURN_PRODUCTS_FAIL,
  VAN_POST_EMPTIES,
  GET_VAN_EMPTIES_SUCCESS,
  RETURN_VAN_EMPTIES_REQUEST,
  RETURN_VAN_EMPTIES_SUCCESS,
  RETURN_VAN_EMPTIES_FAIL,
} from "../constants/vanConstants";
import { orderUrl, InventoryUrl } from "../../utils/baseUrl";

export const fetchVanProducts = () => async (dispatch) => {
  const driver = JSON.parse(await AsyncStorage.getItem("driverDetails"));

  try {
    dispatch({
      type: FETCH_INVENTORY_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get(`${InventoryUrl}/${driver?.vehicleId}`);

    const productsWithQuantity = await data.filter(
      (product) => product.quantity > 0
    );

    const newInventory = productsWithQuantity?.map((item) => ({
      ...item.product,
      quantity: 0,
      initialQuantity: item?.quantity,
    }));

    dispatch({
      type: FETCH_INVENTORY_SUCCESS,
      payload: {
        productsWithQuantity,
        newInventory,
        driver,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_INVENTORY_FAIL,
      payload: "There was an error",
    });
  }
};

export const updateInventory = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_INVENTORY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${InventoryUrl}/update-quantity`,
      payload,
      config
    );

    dispatch({
      type: UPDATE_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_INVENTORY_FAIL,
      payload: "There was an error",
    });
  }
};

export const confirmVanSales = (payload) => async (dispatch) => {
  // console.log(payload);
  try {
    dispatch({
      type: CONFIRM_VAN_SALES_REQUEST,
    });

    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoic2FsZXNmb3JjZV90b2tlbl9pZGVudGlmaWVyX2Rtc192Ml8weHNqdDNAMyEjJF45In0.PHCkrf6sPkoep7lF5X-SugN8-CVaJ5BEYa9hvSWLPMo";

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${orderUrl}/CreateOrder`,
      payload,
      config
    );

    dispatch({
      type: CONFIRM_VAN_SALES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CONFIRM_VAN_SALES_FAIL,
      payload: "There was an error",
    });
  }
};

export const returnProductsToWarehouse = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: RETURN_PRODUCTS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${InventoryUrl}/sales-return
      `,
      payload,
      config
    );

    dispatch({
      type: RETURN_PRODUCTS_SUCCESS,
      payload: data,
    });
    dispatch(fetchVanProducts());
  } catch (error) {
    console.log(error);
    dispatch({
      type: RETURN_PRODUCTS_FAIL,
      payload: "There was an error",
    });
  }
};

export const incrementQuantity = (productId) => async (dispatch, getState) => {
  dispatch({
    type: INCREMENT_QUANTITY,
    payload: productId,
  });
};

export const decrementQuantity = (productId) => async (dispatch, getState) => {
  dispatch({
    type: DECREMENT_QUANTITY,
    payload: productId,
  });
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: productId,
  });
};

export const incrementQuantityByTyping =
  (text, productId) => async (dispatch, getState) => {
    dispatch({
      type: INCREMENT_QUANTITY_TYPING,
      payload: {
        text,
        productId,
      },
    });
  };

export const postVanEmpties = (payload) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${InventoryUrl}/empties/take-in
        `,
      payload,
      config
    );

    dispatch({
      type: VAN_POST_EMPTIES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVanEmpties = (vehicleId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { data },
    } = await axios.get(`${InventoryUrl}/get-empties/${vehicleId}`, config);

    dispatch({
      type: GET_VAN_EMPTIES_SUCCESS,
      payload: {
        empties: data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const returnVanEmpties = (payload) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${InventoryUrl}/empties-return`,
      payload,
      config
    );

    const { message } = data;

    dispatch({
      type: RETURN_VAN_EMPTIES_SUCCESS,
      payload: message,
    });
  } catch (error) {
    console.log(error);
  }
};
