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

export const ordersReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return {
        loading: true,
        refreshing: true,
        order: [],
      };

    case FETCH_ORDER_SUCCESS:
      return {
        loading: false,
        refreshing: false,
        order: action.payload,
      };

    case FETCH_ORDER_FAIL:
      return {
        loading: false,
        refreshing: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderUpdateReducer = (state = { updatedOrder: {} }, action) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        loading: true,
        updatedOrder: {},
      };

    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        loading: false,
        updatedOrder: action.payload,
      };

    case UPDATE_ORDER_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderSingleReducer = (state = { singleOrder: {} }, action) => {
  switch (action.type) {
    case FETCH_SINGLE_ORDER_REQUEST:
      return {
        loading: true,
        singleOrder: {},
      };

    case FETCH_SINGLE_ORDER_SUCCESS:
      return {
        loading: false,
        singleOrder: action.payload,
      };

    case FETCH_SINGLE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case FETCH_ORDER_STATS_REQUEST:
      return {
        loading: true,
        stats: {},
      };

    case FETCH_ORDER_STATS_SUCCESS:
      return {
        loading: false,
        stats: action.payload,
      };

    case FETCH_ORDER_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderConfirmReducer = (state = { response: {} }, action) => {
  switch (action.type) {
    case CONFIRM_ORDER_REQUEST:
      return {
        loading: true,
        response: {},
      };

    case CONFIRM_ORDER_SUCCESS:
      return {
        loading: false,
        response: action.payload,
      };

    case CONFIRM_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
