import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

import {
  ordersReducer,
  orderUpdateReducer,
  orderSingleReducer,
  orderStatsReducer,
  orderConfirmReducer,
} from "./reducers/orderReducer";
import { vanReducer } from "./reducers/vanReducers";
import { productsReducer } from "./reducers/productReducer";
import {
  customerOneOfReducer,
  customerReducer,
} from "./reducers/customerReducer";

const reducer = combineReducers({
  orders: ordersReducer,
  singleOrder: orderSingleReducer,
  updateOrder: orderUpdateReducer,
  orderStats: orderStatsReducer,
  confirmOrder: orderConfirmReducer,
  products: productsReducer,
  customerOneOf: customerOneOfReducer,
  van: vanReducer,
  customer: customerReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
