import { screen, render, fireEvent } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';

import TestProvider from '../../testUtils/testProvider';
import PokemonVerticalCard from '../PokemonVerticalCard';

describe('PokemonVerticalCard', () => {
  it('renders with children', () => {
    render(
      <PokemonVerticalCard id="" image="" name="name" types={[]} showHomeLink>
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
    expect(screen.getByRole('link', { name: 'View all Pokemon' })).toBeInTheDocument();
  });

  it('returns to home page on home link click', () => {
    render(
      <Routes>
        <Route path="/pokemon" element={<div>home</div>} />
        <Route
          path="/"
          element={
            <PokemonVerticalCard id="" image="" name="name" types={[]} showHomeLink>
              <div>component</div>
            </PokemonVerticalCard>
          }
        />
      </Routes>,
      {
        wrapper: TestProvider,
      }
    );

    const homeLink = screen.getByRole('link', { name: 'View all Pokemon' });
    expect(homeLink).toHaveAttribute('href', '/pokemon');
    fireEvent.click(homeLink);

    expect(screen.getByText('home')).toBeInTheDocument();
  });
});
