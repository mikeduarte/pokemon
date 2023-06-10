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
        evolutions={mockPokemon.evolutions}
        height={mockPokemon.height}
        maxCP={mockPokemon.maxCP}
        maxHP={mockPokemon.maxHP}
        parentId={mockPokemon.id}
        weight={mockPokemon.weight}
      />,
      {
        wrapper: TestProvider,
      }
    );

    expect(screen.getByText(mockPokemon.height.minimum, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.height.maximum, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.maxCP)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.maxHP)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.weight.minimum, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.weight.maximum, { exact: false })).toBeInTheDocument();

    // Evolution badge
    expect(screen.getByTestId('pokemon-evolution-Ivysaur')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-evolution-Venusaur')).toBeInTheDocument();

    //Favorite button
    expect(screen.getByRole('button', { name: /Ivysaur/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Venusaur/i })).toBeInTheDocument();
  });
});
