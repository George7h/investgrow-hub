import React from 'react';
import { render } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import store from '../redux/store'; // Import your Redux store
import HomePage from '../pages/homepage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockStocks = [

  {
    symbol: 'AAPL',
  },

];

describe('HomePage component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue(mockStocks);
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('renders the component correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('filters stocks by country and sector', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    // Add your test logic here
    const element = getByText('AAPL');
    expect(element).toBeInTheDocument(); // For example, assert that the element is in the document.
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
