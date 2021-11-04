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
  DELETE_PRODUCT,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
} from "../constants/vanConstants";

const initialState = {
  inventory: [],
  newinventory: [],
  response: [],
  loading: false,
};

export const vanReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_INVENTORY_REQUEST:
      return {
        loading: true,
        inventory: [],
        newinventory: [],
      };

    case FETCH_INVENTORY_SUCCESS:
      return {
        inventory: payload.data,
        newinventory: payload.newData,
        loading: false,
      };

    case FETCH_INVENTORY_FAIL:
      return {
        loading: false,
        error: payload,
      };

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

    case CONFIRM_VAN_SALES_REQUEST:
      return {
        loading: true,
        response: [],
      };

    case CONFIRM_VAN_SALES_SUCCESS:
      return {
        loading: false,
        response: payload,
      };

    case CONFIRM_VAN_SALES_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case INCREMENT_QUANTITY:
      const product = state.newinventory.find(
        (item) => item?.productId === payload
      );
      product.quantity++;
      return {
        ...state,
      };

    case DECREMENT_QUANTITY:
      const theProduct = state.newinventory.find(
        (item) => item.productId === payload
      );
      if (theProduct.quantity === 1) {
        let new_items = state.newinventory.filter(
          (item) => item.productId !== payload
        );
        return {
          ...state,
          newinventory: new_items,
        };
      } else {
        theProduct.quantity--;
        return {
          ...state,
        };
      }

    case DELETE_PRODUCT:
      return {
        ...state,
        newinventory: state.newinventory.filter(
          (item) => item.productId !== payload
        ),
      };

    default:
      return state;
  }
};
