import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  customerOrdersReducers,
} from "./reducers/customerReducer";
import userReducer from "./reducers/userReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

const reducer = combineReducers({
  orders: ordersReducer,
  singleOrder: orderSingleReducer,
  updateOrder: orderUpdateReducer,
  orderStats: orderStatsReducer,
  confirmOrder: orderConfirmReducer,
  products: productsReducer,
  customerOneOf: customerOneOfReducer,
  van: vanReducer,
  user: persistReducer(persistConfig, userReducer),
  customerOrders: customerOrdersReducers,
});

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
