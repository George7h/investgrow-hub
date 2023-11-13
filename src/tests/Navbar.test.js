import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../components/Navbar';

test('Navigation component renders correctly', () => {
  const { getByText } = render(
    <Router>
      <Navigation />
    </Router>,
  );

  expect(getByText('chevron_left')).toBeInTheDocument();
  expect(getByText('mic')).toBeInTheDocument();
  expect(getByText('settings')).toBeInTheDocument();
});

test('Navigation component matches snapshot', () => {
  const { asFragment } = render(
    <Router>
      <Navigation />
    </Router>,
  );

  expect(asFragment()).toMatchSnapshot();
});
