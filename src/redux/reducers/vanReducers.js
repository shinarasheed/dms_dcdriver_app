import {UPDATE_ORDER_STATUS_FAIL} from '../constants/orderContants';
import {
  FETCH_INVENTORY_REQUEST,
  FETCH_INVENTORY_SUCCESS,
  FETCH_INVENTORY_FAIL,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  CONFIRM_VAN_SALES_REQUEST,
  CONFIRM_VAN_SALES_SUCCESS,
  CONFIRM_VAN_SALES_FAIL,
} from '../constants/vanConstants';

export const vanReducer = (state = {inventory: []}, action) => {
  const {type, payload} = action;
  switch (type) {
    case FETCH_INVENTORY_REQUEST:
      return {
        loading: true,
        inventory: [],
      };

    case FETCH_INVENTORY_SUCCESS:
      return {
        loading: false,
        inventory: payload,
      };

    case FETCH_INVENTORY_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const updateInventoryReducer = (state = {inventory: []}, action) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_INVENTORY_REQUEST:
      return {
        loading: true,
        inventory: [],
      };

    case UPDATE_INVENTORY_SUCCESS:
      return {
        loading: false,
        inventory: payload,
      };

    case UPDATE_INVENTORY_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const confirmVanSalesReducer = (state = {response: []}, action) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_INVENTORY_REQUEST:
      return {
        loading: true,
        response: [],
      };

    case UPDATE_INVENTORY_SUCCESS:
      return {
        loading: false,
        response: payload,
      };

    case UPDATE_INVENTORY_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
