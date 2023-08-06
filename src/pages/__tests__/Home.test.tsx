import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import Home from '../Home';

const setup = () => {
  return render(<Home />, {
    wrapper: TestProvider,
  });
};

describe('Home', () => {
  it('renders', () => {
    setup();

    expect(screen.getByTestId('filter-bar'));
    expect(screen.getByTestId('pokemon-list'));
  });
});
