import {
  CREATE_ONE_OF_CUSTOMER_REQUEST,
  CREATE_ONE_OF_CUSTOMER_SUCCES,
  CREATE_ONE_OF_CUSTOMER_FAIL,
} from '../constants/customerConstants';

export const customerOneOfReducer = (state = {customer: {}}, action) => {
  const {type, payload} = action;
  switch (type) {
    case CREATE_ONE_OF_CUSTOMER_REQUEST:
      return {
        loading: true,
        customer: {},
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

    default:
      return state;
  }
};
