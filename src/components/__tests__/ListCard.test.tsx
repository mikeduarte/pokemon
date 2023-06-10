import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';

import pokemon from '../../testUtils/__mocks__/pokemon.json';
import { Pokemon } from '../../types/Pokemon';
import ListCard from '../ListCard';

const mockPokemon = { ...pokemon } as Pokemon;

describe('ListCard', () => {
  it('renders', () => {
    render(
      <ListCard
        id={mockPokemon.id}
        image={mockPokemon.image}
        name={mockPokemon.name}
        types={mockPokemon.types}
        isFavorite={false}
        isFiltering={false}
      />,
      {
        wrapper: TestProvider,
      }
    );

    expect(screen.getByTestId('list-card')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-horizontal-card')).toBeInTheDocument();
  });
});
