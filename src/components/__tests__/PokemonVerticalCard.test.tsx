import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import PokemonVerticalCard from '../PokemonVerticalCard';

describe('PokemonHorizontalCard', () => {
  it('renders with children', () => {
    render(
      <PokemonVerticalCard id="" image="" name="name" types={[]} isFavorite>
        <div>component</div>
      </PokemonVerticalCard>,
      {
        wrapper: TestProvider,
      }
    );

    expect(screen.getByTestId('pokemon-vertical-card')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('component')).toBeInTheDocument();
    expect(screen.queryByTestId('sound-button')).not.toBeInTheDocument();
  });

  it('renders with sound button', () => {
    render(
      <PokemonVerticalCard id="" image="" name="" types={[]} isFavorite sound="/sound.mp3" />,
      {
        wrapper: TestProvider,
      }
    );

    expect(screen.getByTestId('sound-button')).toBeInTheDocument();
  });
});
