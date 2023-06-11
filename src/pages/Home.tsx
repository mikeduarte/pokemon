import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import { FiltersContext, useFilters } from '../contexts/FiltersContext';
import { withErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import PokemonList from '../components/PokemonList';
import FilterBar from '../components/FilterBar';

const Home = () => {
  const filters = useFilters();

  return (
    <FiltersContext.Provider value={filters}>
      <FilterBar />
      <Container disableGutters>
        <PokemonList />
      </Container>
      <Outlet />
    </FiltersContext.Provider>
  );
};

export default withErrorBoundary(Home);
