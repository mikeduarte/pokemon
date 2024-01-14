import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import { FiltersContext, useFilters } from '../contexts/FiltersContext';
import { FavoritesContext, useFavorites } from '../contexts/FavoritesContext';
import { withErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import PokemonList from '../components/PokemonList';
import FilterBar from '../components/FilterBar';

const Home = () => {
  const filters = useFilters();
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      <FiltersContext.Provider value={filters}>
        <FilterBar />
        <Container disableGutters>
          <PokemonList />
        </Container>
        <Outlet />
      </FiltersContext.Provider>
    </FavoritesContext.Provider>
  );
};

export default withErrorBoundary(Home);
