import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigationhome from '../components/homenav';

describe('Navigationhome', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(
      <Router>
        <Navigationhome />
      </Router>,
    );

    const linkElement = getByText(/INVESTGROW-HUB/i);
    expect(linkElement).toBeInTheDocument();

    const menuIcon = getByText(/menu/i);
    expect(menuIcon).toBeInTheDocument();

    const micIcon = getByText(/mic/i);
    expect(micIcon).toBeInTheDocument();

    const settingsIcon = getByText(/settings/i);
    expect(settingsIcon).toBeInTheDocument();
  });
});
