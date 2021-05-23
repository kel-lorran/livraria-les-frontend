import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import basketReducer from './basket';
import orderBasket from './order';
import userReducer from './user';

const reducer = combineReducers({
    basket: basketReducer,
    order: orderBasket,
    user: userReducer
});
  
const store = configureStore({ reducer });

export default store;