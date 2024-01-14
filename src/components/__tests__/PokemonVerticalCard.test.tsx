import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import PokemonVerticalCard from '../PokemonVerticalCard';

describe('PokemonHorizontalCard', () => {
  it('renders with children', () => {
    render(
      <PokemonVerticalCard id="" image="" name="name" types={[]}>
        <div>component</div>
      </PokemonVerticalCard>,
      {
        wrapper: TestProvider,
      }
    );

    expect(screen.getByTestId('pokemon-vertical-card')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('component')).toBeInTheDocument();
  });
});
