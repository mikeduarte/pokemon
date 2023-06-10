import { render, screen } from '@testing-library/react';
import TestProvider from '../../../testUtils/testProvider';

import PokemonCardTitle from '../PokemonCardTitle';

describe('PokemonCardTitle', () => {
  it('renders the pokemon name and types', () => {
    render(<PokemonCardTitle name="name" types={['Bug', 'Dragon']} />, {
      wrapper: TestProvider,
    });

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('Bug, Dragon')).toBeInTheDocument();
  });
});
