import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigationhome from '../components/homenav';

test('Navigationhome component matches snapshot', () => {
  const { asFragment } = render(
    <Router>
      <Navigationhome />
    </Router>,
  );

  expect(asFragment()).toMatchSnapshot();
});
