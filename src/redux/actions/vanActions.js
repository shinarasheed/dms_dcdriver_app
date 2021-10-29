import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

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
} from '../constants/vanConstants';
import {vanurl, orderUrl} from '../../utils/baseUrl';

export const fetchVanProducts = () => async dispatch => {
  try {
    dispatch({
      type: FETCH_INVENTORY_REQUEST,
    });

    const {
      data: {data},
    } = await axios.get(`${vanurl}/van/1`);

    dispatch({
      type: FETCH_INVENTORY_SUCCESS,
      payload: data,
    });

    // await AsyncStorage.setItem('productsInVan', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_INVENTORY_FAIL,
      payload: 'There was an error',
    });
  }
};

export const updateInventory = payload => async dispatch => {
  try {
    dispatch({
      type: UPDATE_INVENTORY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.put(
      `${vanurl}/inventory/update-quantity`,
      payload,
      config,
    );

    dispatch({
      type: UPDATE_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_INVENTORY_FAIL,
      payload: 'There was an error',
    });
  }
};

export const confirmVanSales = payload => async dispatch => {
  try {
    dispatch({
      type: CONFIRM_VAN_SALES_REQUEST,
    });

    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoic2FsZXNmb3JjZV90b2tlbl9pZGVudGlmaWVyX2Rtc192Ml8weHNqdDNAMyEjJF45In0.PHCkrf6sPkoep7lF5X-SugN8-CVaJ5BEYa9hvSWLPMo';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await axios.post(`${orderUrl}/CreateOrder`, payload, config);

    dispatch({
      type: CONFIRM_VAN_SALES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CONFIRM_VAN_SALES_FAIL,
      payload: 'There was an error',
    });
  }
};
