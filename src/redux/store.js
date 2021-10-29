import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import {
  ordersReducer,
  orderUpdateReducer,
  orderSingleReducer,
  orderStatsReducer,
  orderConfirmReducer,
} from './reducers/orderReducer';
import {
  vanReducer,
  updateInventoryReducer,
  confirmVanSalesReducer,
} from './reducers/vanReducers';
import {productsReducer} from './reducers/productReducer';
import {customerOneOfReducer} from './reducers/customerReducer';

const reducer = combineReducers({
  orders: ordersReducer,
  singleOrder: orderSingleReducer,
  updateOrder: orderUpdateReducer,
  orderStats: orderStatsReducer,
  confirmOrder: orderConfirmReducer,
  products: productsReducer,
  customerOneOf: customerOneOfReducer,
  van: vanReducer,
  confirmVanSale: confirmVanSalesReducer,
  updateInventory: updateInventoryReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
