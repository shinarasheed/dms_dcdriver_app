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
  INCREMENT_QUANTITY_TYPING,
  RETURN_PRODUCTS_REQUEST,
  RETURN_PRODUCTS_SUCCESS,
  RETURN_PRODUCTS_FAIL,
} from "../constants/vanConstants";

const initialState = {
  inventory: [],
  newinventory: [],
  response: [],
  refreshing: true,
  loading: false,
};

export const vanReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_INVENTORY_SUCCESS:
      return {
        inventory: payload.productsWithQuantity,
        newinventory: payload.newInventory,
        loading: false,
        refreshing: false,
        driver: payload.driver,
      };

    case FETCH_INVENTORY_FAIL:
      return {
        loading: false,
        error: payload,
        refreshing: false,
      };

    case RETURN_PRODUCTS_REQUEST:
      return {
        loading: true,
      };

    case RETURN_PRODUCTS_SUCCESS:
      return {
        loading: false,
      };

    case RETURN_PRODUCTS_FAIL:
      return {
        loading: false,
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

    case INCREMENT_QUANTITY_TYPING:
      const myproduct = state.newinventory.find(
        (item) => item?.productId === payload.productId
      );
      myproduct.quantity = payload.text;
      return {
        ...state,
      };

    case DECREMENT_QUANTITY:
      const theProduct = state.newinventory.find(
        (item) => item.productId === payload
      );
      if (theProduct.quantity === 0) {
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
