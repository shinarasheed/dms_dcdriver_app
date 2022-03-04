import {
  CREATE_ONE_OF_CUSTOMER_REQUEST,
  CREATE_ONE_OF_CUSTOMER_SUCCES,
  CREATE_ONE_OF_CUSTOMER_FAIL,
  GET_CUSTOMER_ORDERS_SUCCESS,
  GET_CUSTOMER_ORDERS_REQUEST,
  GET_CUSTOMER_ORDERS_FAIL,
  CLEAR_CUSTOMER_ERROR,
} from "../constants/customerConstants";

export const customerOneOfReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ONE_OF_CUSTOMER_REQUEST:
      return {
        loading: true,
      };

    case CREATE_ONE_OF_CUSTOMER_SUCCES:
      return {
        loading: false,
        customer: payload,
      };

    case CREATE_ONE_OF_CUSTOMER_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_CUSTOMER_ERROR:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const customerOrdersReducers = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CUSTOMER_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case GET_CUSTOMER_ORDERS_SUCCESS:
      return {
        loading: false,
        customerOrders: payload,
      };

    case GET_CUSTOMER_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
