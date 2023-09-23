import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  stocks: [],
  status: 'idle',
  error: null,
  selectedSector: '',
  selectedCountry: '',
};

const token = process.env.REACT_APP_API_KEY;

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async (_, { getState }) => {
  const state = getState();
  const { selectedSector, selectedCountry } = state.stocks;
  const apiUrl = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=${selectedSector}&country=${selectedCountry}&exchange=NASDAQ&dividendMoreThan=0&limit=50&apikey=${token}`;

  const response = await axios.get(apiUrl);

  const stocksWithImages = await Promise.all(
    response.data.map(async (stock) => {
      const profileResponse = await axios.get(
        `https://financialmodelingprep.com/api/v3/profile/${stock.symbol}?apikey=${token}`,
      );
      const profileData = profileResponse.data[0];

      return {
        ...stock,
        image: profileData.image,
      };
    }),
  );
  return stocksWithImages;
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setSelectedSector: (state, action) => {
      state.selectedSector = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedSector, setSelectedCountry } = stocksSlice.actions;
export default stocksSlice.reducer;
