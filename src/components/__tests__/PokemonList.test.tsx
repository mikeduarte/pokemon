import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import { mockIsIntersecting } from 'react-intersection-observer/test-utils';

import TestProvider from '../../testUtils/testProvider';
import { FiltersContext } from '../../contexts/FiltersContext';
import PokemonList from '../PokemonList';
import { Filters } from '../../types/Filters';

const mockOnFilterChange = vi.fn();
const defaultValue: Filters = {
  layout: 'grid',
  searchTerm: '',
  selectedType: '',
  tabView: 'all',
};

const setup = (value = defaultValue) => {
  return render(
    <FiltersContext.Provider value={{ filters: { ...value }, onFilterChange: mockOnFilterChange }}>
      <PokemonList />
    </FiltersContext.Provider>,
    {
      wrapper: TestProvider,
    }
  );
};

describe('PokemonList', () => {
  it('renders', () => {
    setup();

    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
  });

  it('displays pokemon loader during request', async () => {
    setup();

    expect(await screen.findByTestId('pokemon-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('pokemon-loader'), {
      timeout: 5000,
    });
    expect(screen.queryByTestId('pokemon-loader')).not.toBeInTheDocument();
  });

  it('renders grid layout with infinite scroll', async () => {
    setup();

    const cards = await screen.findAllByTestId('list-card', undefined, {
      timeout: 5000,
    });
    expect(cards).toHaveLength(16);
    expect(await screen.findAllByTestId('vertical-card-skeleton')).toHaveLength(24);

    //fire observer is in view
    mockIsIntersecting(cards[11], 1);
    expect(await screen.findByText('Pidgeotto', undefined, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getAllByTestId('list-card')).toHaveLength(17);
  });

  it('renders list layout with infinite scroll', async () => {
    setup({
      ...defaultValue,
      layout: 'list',
    });

    const cards = await screen.findAllByTestId('list-card', undefined, {
      timeout: 5000,
    });
    expect(cards).toHaveLength(16);
    expect(await screen.findAllByTestId('horizontal-card-skeleton')).toHaveLength(24);

    //fire observer is in view
    mockIsIntersecting(cards[11], 1);
    expect(await screen.findByText('Pidgeotto', undefined, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getAllByTestId('list-card')).toHaveLength(17);
  });

  it('renders favorite view', async () => {
    setup({
      ...defaultValue,
      tabView: 'favorites',
    });

    const cards = await screen.findAllByTestId('list-card');
    expect(cards).toHaveLength(4);
  });

  it('renders list filtered by type', async () => {
    setup({
      ...defaultValue,
      selectedType: 'Grass',
    });

    const cards = await screen.findAllByTestId('list-card');
    expect(cards).toHaveLength(3);
  });

  it('renders list filtered by search term', async () => {
    setup({
      ...defaultValue,
      searchTerm: 'Bul',
    });

    const cards = await screen.findAllByTestId('list-card');
    expect(cards).toHaveLength(1);
  });

  it('renders no results component when there are no results', async () => {
    setup({
      ...defaultValue,
      searchTerm: 'no results',
    });

    const noResults = await screen.findByTestId('no-results');
    expect(noResults).toBeInTheDocument();
  });
});
