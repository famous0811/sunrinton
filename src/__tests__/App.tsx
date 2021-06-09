import React from 'react';
import { render } from '@testing-library/react';

import App from '../App';
import withProvider from '@util/withProvider';

describe('<App/>', () => {
  it('matches snapshot', () => {
    const utils = render(withProvider(<App />));
    expect(utils.container).toMatchSnapshot();
  });
  it('matches value', () => {
    const utils = render(withProvider(<App />));
    utils.getByText('Hello');
    utils.getByText('Hello/World');
  });
});
