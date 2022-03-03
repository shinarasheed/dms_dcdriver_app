import {
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESTORE_TOKEN,
  GET_DISTRIBUTOR_CUSTOMERS_REQUEST,
  GET_DISTRIBUTOR_CUSTOMERS_SUCCESS,
  GET_DISTRIBUTOR_CUSTOMERS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  message: "",
  error: null,
  phoneNumber: null,
  customers: [],
  bulkbreakers: [],
  pocs: [],
  newcustomers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        phoneNumber: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case RESTORE_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    case GET_DISTRIBUTOR_CUSTOMERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DISTRIBUTOR_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: action.payload,
        pocs: action.payload.filter(
          (customer) => customer.CUST_Type.toLowerCase() === "poc"
        ),
        bulkbreakers: action.payload.filter(
          (customer) => customer.CUST_Type.toLowerCase() === "bulkbreaker"
        ),
        // newcustomers: action.payload.filter(
        //   (customer) => customer.CUST_Type.toLowerCase() === "one-off"
        // ),
      };

    case GET_DISTRIBUTOR_CUSTOMERS_FAIL:
      return {
        ...state,
        isLoading: false,
        customers: [],
      };

    default:
      return state;
  }
};
