import { render, screen } from '@testing-library/react';
import TestProvider from '../../../testUtils/testProvider';

import PokemonLoader from '../PokemonLoader';

describe('PokemonLoader', () => {
  it('renders', () => {
    render(<PokemonLoader />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('pokemon-loader')).toBeInTheDocument();
  });
});
