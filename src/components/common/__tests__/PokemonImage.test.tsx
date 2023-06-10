import { render, screen } from '@testing-library/react';
import TestProvider from '../../../testUtils/testProvider';

import PokemonImage from '../PokemonImage';

describe('PokemonImage', () => {
  it('renders', () => {
    render(<PokemonImage image="/image.jpg" name="name" />, {
      wrapper: TestProvider,
    });

    const image = screen.getByRole('img', { name: 'name' });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/image.jpg');
    expect(image).toHaveAttribute('alt', 'name');
  });
});
