import { configureStore } from '@reduxjs/toolkit';
import stockDetailReducer, {
  fetchStockHistoricalData,
  fetchStockProfileData,
  setselect,
} from '../redux/stocks/stockDetailSlice';

describe('stockDetailSlice reducer', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        stockDetail: stockDetailReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const initialState = {
      select: null,
      historicalData: [],
      profileData: null,
      status: 'idle',
      error: null,
    };
    expect(store.getState().stockDetail).toEqual(initialState);
  });

  it('should handle setselect', () => {
    store.dispatch(setselect('AAPL'));
    expect(store.getState().stockDetail.select).toEqual('AAPL');
  });

  it('should handle fetchStockHistoricalData.pending', () => {
    store.dispatch(fetchStockHistoricalData.pending);
    expect(store.getState().stockDetail.status).toEqual('idle');
  });

  it('should handle fetchStockHistoricalData.fulfilled', () => {
    const mockHistoricalData = [{ date: '2023-01-01', price: 150.0 }];
    store.dispatch(fetchStockHistoricalData.fulfilled(mockHistoricalData));
    expect(store.getState().stockDetail.status).toEqual('succeeded');
    expect(store.getState().stockDetail.historicalData).toEqual(mockHistoricalData);
  });

  it('should handle fetchStockHistoricalData.rejected', () => {
    store.dispatch(fetchStockHistoricalData.rejected(new Error('Fetch error')));
    expect(store.getState().stockDetail.status).toEqual('failed');
    expect(store.getState().stockDetail.error).toEqual('Fetch error');
  });

  it('should handle fetchStockProfileData.pending', () => {
    store.dispatch(fetchStockProfileData.pending);
    expect(store.getState().stockDetail.status).toEqual('idle');
  });

  it('should handle fetchStockProfileData.fulfilled', () => {
    const mockProfileData = { name: 'Apple Inc.' };
    store.dispatch(fetchStockProfileData.fulfilled(mockProfileData));
    expect(store.getState().stockDetail.status).toEqual('succeeded');
    expect(store.getState().stockDetail.profileData).toEqual(mockProfileData);
  });

  it('should handle fetchStockProfileData.rejected', () => {
    store.dispatch(fetchStockProfileData.rejected(new Error('Fetch error')));
    expect(store.getState().stockDetail.status).toEqual('failed');
    expect(store.getState().stockDetail.error).toEqual('Fetch error');
  });
});
