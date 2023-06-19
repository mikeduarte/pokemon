import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import ListCard from '../ListCard';

describe('ListCard', () => {
  it('renders vertical card when is grid view', () => {
    render(<ListCard id="" image="" name="" types={[]} isFavorite isFiltering isGridView />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('list-card')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-vertical-card')).toBeInTheDocument();
  });

  it('renders horizontal card when is list view', () => {
    render(
      <ListCard id="" image="" name="" types={[]} isFavorite isFiltering isGridView={false} />,
      {
        wrapper: TestProvider,
      }
    );

    expect(screen.getByTestId('pokemon-horizontal-card')).toBeInTheDocument();
  });
});
