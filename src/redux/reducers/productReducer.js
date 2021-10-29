import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from '../constants/productsContants';

export const productsReducer = (state = {products: []}, action) => {
  const {type, payload} = action;
  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload,
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
