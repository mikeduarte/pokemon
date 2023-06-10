import { render, screen } from '@testing-library/react';
import TestProvider from '../../../testUtils/testProvider';

import PokemonLink from '../PokemonLink';

describe('PokemonLink', () => {
  it('renders', () => {
    render(
      <PokemonLink id="id" name="name">
        <div>component</div>
      </PokemonLink>,
      {
        wrapper: TestProvider,
      }
    );

    const link = screen.getByRole('link', { name: 'component' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemon/name/id');
    expect(link).toHaveAttribute('title', 'name');
  });
});
