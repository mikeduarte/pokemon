import { render, screen } from '@testing-library/react';
import TestProvider from '../../../testUtils/testProvider';

import pokemon from '../../../testUtils/__mocks__/pokemon.json';
import { Pokemon } from '../../../types/Pokemon';
import PokemonStats from '../PokemonStats';

const mockPokemon = { ...pokemon } as Pokemon;

describe('PokemonStats', () => {
  it('renders the pokemon stats', () => {
    render(
      <PokemonStats
        name={mockPokemon.name}
        height={mockPokemon.height}
        stats={mockPokemon.stats}
        sprites={mockPokemon.sprites}
        weight={mockPokemon.weight}
      />,
      {
        wrapper: TestProvider,
      }
    );

    expect(screen.getByText(mockPokemon.height, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.height, { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Stats' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Showdown' })).toBeInTheDocument();
    expect(screen.getByText('AP', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('49', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('HP', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('45', { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'bulbasaur showdown animation' })).toBeInTheDocument();
  });
});
