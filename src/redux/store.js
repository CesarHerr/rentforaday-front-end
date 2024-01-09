import { configureStore } from '@reduxjs/toolkit';
import reservesReducer from './reserves/reserveSlice';
import itemReducer from './items/itemSlice';
import authReducer from './users/authSlice';
import tokenReducer from './users/tokenSlice';

const store = configureStore({
  reducer: {
    items: itemReducer,
    auth: authReducer,
    token: tokenReducer,
    reserves: reservesReducer,
  },
});

export default store;
