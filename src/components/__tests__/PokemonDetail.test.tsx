import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import * as ReactRouterDom from 'react-router-dom';

import TestProvider from '../../testUtils/testProvider';
import PokemonDetail from '../PokemonDetail';

vi.mock('react-router-dom', async () => {
  const mod = (await vi.importActual('react-router-dom')) as typeof ReactRouterDom;

  return {
    ...mod,
    useParams: () => ({
      id: 123,
    }),
  };
});

describe('PokemonDetail', () => {
  it('displays pokemon loader during request', async () => {
    render(<PokemonDetail />, {
      wrapper: TestProvider,
    });

    expect(await screen.findByTestId('pokemon-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('pokemon-loader'), {
      timeout: 5000,
    });
    expect(screen.queryByTestId('pokemon-loader')).not.toBeInTheDocument();
  });

  it('renders pokemon detail', async () => {
    render(<PokemonDetail />, {
      wrapper: TestProvider,
    });

    expect(
      await screen.findByTestId('pokemon-detail', undefined, { timeout: 5000 })
    ).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-vertical-card')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-stats')).toBeInTheDocument();
  });
});
