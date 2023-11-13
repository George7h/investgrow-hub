import React from 'react';
import renderer from 'react-test-renderer';
import Copyrightfooter from '../components/footer';

it('matches the snapshot', () => {
  const tree = renderer
    .create(
      <Copyrightfooter />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
