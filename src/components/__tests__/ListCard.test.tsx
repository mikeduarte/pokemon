import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import ListCard from '../ListCard';

describe('ListCard', () => {
  it('renders', () => {
    render(<ListCard id="" image="" name="" types={[]} isFavorite isFiltering />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('list-card')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-horizontal-card')).toBeInTheDocument();
  });
});
