import { configureStore } from '@reduxjs/toolkit';
import stocksReducer, { fetchStocks, setSelectedSector, setSelectedCountry } from '../redux/stocks/stockSlice';

describe('stocksSlice reducer', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        stocks: stocksReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const initialState = {
      stocks: [],
      status: 'idle',
      error: null,
      selectedSector: '',
      selectedCountry: '',
    };
    expect(store.getState().stocks).toEqual(initialState);
  });

  it('should handle setSelectedSector', () => {
    store.dispatch(setSelectedSector('Technology'));
    expect(store.getState().stocks.selectedSector).toEqual('Technology');
  });

  it('should handle setSelectedCountry', () => {
    store.dispatch(setSelectedCountry('US'));
    expect(store.getState().stocks.selectedCountry).toEqual('US');
  });

  it('should handle fetchStocks.pending', () => {
    store.dispatch(fetchStocks.pending);
    expect(store.getState().stocks.status).toEqual('idle');
  });

  it('should handle fetchStocks.fulfilled', () => {
    const mockStocks = [{ symbol: 'AAPL', name: 'Apple Inc.' }];
    store.dispatch(fetchStocks.fulfilled(mockStocks));
    expect(store.getState().stocks.status).toEqual('succeeded');
    expect(store.getState().stocks.stocks).toEqual(mockStocks);
  });

  it('should handle fetchStocks.rejected', () => {
    store.dispatch(fetchStocks.rejected(new Error('Fetch error')));
    expect(store.getState().stocks.status).toEqual('failed');
    expect(store.getState().stocks.error).toEqual('Fetch error');
  });
});
