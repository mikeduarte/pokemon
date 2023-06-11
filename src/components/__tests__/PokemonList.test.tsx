import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { mockIsIntersecting } from 'react-intersection-observer/test-utils';

import TestProvider from '../../testUtils/testProvider';
import PokemonList from '../PokemonList';

describe('PokemonList', () => {
  it('renders', () => {
    render(<PokemonList tabView="all" layout="grid" searchTerm="" selectedType="" />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
  });

  it('displays pokemon loader during request', async () => {
    render(<PokemonList tabView="all" layout="grid" searchTerm="" selectedType="" />, {
      wrapper: TestProvider,
    });

    expect(await screen.findByTestId('pokemon-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('pokemon-loader'), {
      timeout: 5000,
    });
    expect(screen.queryByTestId('pokemon-loader')).not.toBeInTheDocument();
  });

  it('renders grid layout with infinite scroll', async () => {
    render(<PokemonList tabView="all" layout="grid" searchTerm="" selectedType="" />, {
      wrapper: TestProvider,
    });

    const cards = await screen.findAllByTestId('grid-card', undefined, {
      timeout: 5000,
    });
    expect(cards).toHaveLength(16);

    //fire observer is in view
    mockIsIntersecting(cards[11], 1);
    expect(await screen.findAllByTestId('grid-card-placeholder')).toHaveLength(24);
    expect(await screen.findByText('Pidgeotto', undefined, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getAllByTestId('grid-card')).toHaveLength(17);
  });

  it('renders list layout with infinite scroll', async () => {
    render(<PokemonList tabView="all" layout="list" searchTerm="" selectedType="" />, {
      wrapper: TestProvider,
    });

    const cards = await screen.findAllByTestId('list-card', undefined, {
      timeout: 5000,
    });
    expect(cards).toHaveLength(16);

    //fire observer is in view
    mockIsIntersecting(cards[9], 1);
    expect(await screen.findAllByTestId('list-card-placeholder')).toHaveLength(24);
    expect(await screen.findByText('Pidgeotto', undefined, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getAllByTestId('list-card')).toHaveLength(17);
  });

  it('renders favorite view', async () => {
    render(<PokemonList tabView="favorites" layout="grid" searchTerm="" selectedType="" />, {
      wrapper: TestProvider,
    });

    const cards = await screen.findAllByTestId('grid-card');
    expect(cards).toHaveLength(4);
  });

  it('renders list filtered by type', async () => {
    render(<PokemonList tabView="all" layout="grid" searchTerm="" selectedType="Grass" />, {
      wrapper: TestProvider,
    });

    const cards = await screen.findAllByTestId('grid-card');
    expect(cards).toHaveLength(3);
  });

  it('renders list filtered by search term', async () => {
    render(<PokemonList tabView="all" layout="grid" searchTerm="Bul" selectedType="" />, {
      wrapper: TestProvider,
    });

    const cards = await screen.findAllByTestId('grid-card');
    expect(cards).toHaveLength(1);
  });
});
