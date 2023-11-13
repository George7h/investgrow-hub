import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  select: null,
  historicalData: [],
  profileData: null,
  status: 'idle',
  error: null,
};

const token = process.env.REACT_APP_API_KEY;

export const fetchStockHistoricalData = createAsyncThunk(
  'stockDetail/fetchStockHistoricalData',
  async (symbol) => {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${token}`,
    );
    return response.data.historical;
  },
);

export const fetchStockProfileData = createAsyncThunk(
  'stockDetail/fetchStockProfileData',
  async (symbol) => {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${token}`,
    );
    return response.data[0];
  },
);

const stockDetailSlice = createSlice({
  name: 'stockDetail',
  initialState,
  reducers: {
    setselect: (state, action) => {
      state.select = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockHistoricalData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockHistoricalData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.historicalData = action.payload;
      })
      .addCase(fetchStockHistoricalData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchStockProfileData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockProfileData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileData = action.payload;
      })
      .addCase(fetchStockProfileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setselect } = stockDetailSlice.actions;
export default stockDetailSlice.reducer;
