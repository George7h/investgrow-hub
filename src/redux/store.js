import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './stocks/stockSlice';
import stockDetailReducer from './stocks/stockDetailSlice';

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    stockDetail: stockDetailReducer,
  },
});

export default store;
