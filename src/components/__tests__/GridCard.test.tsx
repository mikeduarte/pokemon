import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import GridCard from '../GridCard';

describe('GridCard', () => {
  it('renders', () => {
    render(<GridCard id="" image="" name="" types={[]} isFavorite isFiltering />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('grid-card')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-vertical-card')).toBeInTheDocument();
  });
});
