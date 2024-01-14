import { render, screen } from '@testing-library/react';
import TestProvider from '../../../testUtils/testProvider';

import PokemonCardTitle from '../PokemonCardTitle';

describe('PokemonCardTitle', () => {
  it('renders the pokemon name and types', () => {
    render(
      <PokemonCardTitle
        name="name"
        types={[
          {
            type: {
              name: 'bug',
            },
          },
          {
            type: {
              name: 'dragon',
            },
          },
        ]}
      />,
      {
        wrapper: TestProvider,
      }
    );

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('bug, dragon')).toBeInTheDocument();
  });
});
