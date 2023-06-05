import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';

import pokemon from '../../testUtils/__mocks__/pokemon.json';
import { Pokemon } from '../../types/Pokemon';
import ListCard from '../ListCard';

const mockPokemon = { ...pokemon } as Pokemon;

it('simple render', () => {
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

  expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
});
