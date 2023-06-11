import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import PokemonHorizontalCard from '../PokemonHorizontalCard';

describe('PokemonHorizontalCard', () => {
  it('renders', () => {
    render(<PokemonHorizontalCard id="" image="" name="name" types={[]} isFavorite />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('pokemon-horizontal-card')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
  });
});
